import React,{ Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { changeimage,removeimage } from "../../actions/authAction";
import axios from 'axios';

const styles = {
    bigAvatar: {
      margin: 10,
      width: 200,
      height: 200,
    },
  };

class Profile extends Component{

    constructor(props){
        super(props);
        this.onChangeFile=this.onChangeFile.bind(this);
    }

    state = {
        anchorEl: null,
        errors:''
      };

      handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };

      onChangeFile(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ anchorEl: null });
        var file = e.target.files[0];
    
        console.log(file);

        const formData = new FormData()
        formData.append('file', file);
        formData.append('user',this.props.auth.user.id);

        this.props.changeimage(formData);
    }


      removeimage = () => {
        this.setState({ anchorEl: null });
        const user={
            id:this.props.auth.user.id
        }
        this.props.removeimage(user);
      };


      componentWillReceiveProps(nextProps){
  
        if(nextProps.errors){
          this.setState({errors:nextProps.errors});
        }
      }

    render(){
        const {isAuthenticated,user} = this.props.auth;
        const {errors}=this.state;

        const { classes } = this.props;
        const { anchorEl } = this.state;
        return(

            <div className="container">
            <h1 className="landing-inner text-center">Profile</h1>
                <Grid container justify="center" alignItems="center">
      <Avatar alt="Remy Sharp" src={user.avatar?require("../../assets/uploads/"+user.avatar):require("../../assets/img/home_background.jpeg")} 
      className={classes.bigAvatar} 

      aria-owns={anchorEl ? 'simple-menu' : undefined}
      aria-haspopup="true"
      onClick={this.handleClick}
      
      />
       <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={()=>{this.upload.click()}}>Change Image</MenuItem>
          <MenuItem onClick={this.removeimage}>Remove Image</MenuItem>
        </Menu>

    </Grid>

    <h1 className="landing-inner text-center alert-primary">{user.name}</h1>
    <input id="myInput"
   type="file"
   ref={(ref) => this.upload = ref}
   style={{display: 'none'}}
   accept="image/x-png,image/jpeg"
   onChange={this.onChangeFile.bind(this)}
/>

   
      </div>
   

        );
    }
}

Profile.propTypes = {
    changeimage:PropTypes.func.isRequired,
    removeimage:PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  const mapStateToProps = (state) => ({
    auth:state.auth,
    errors:state.errors
  });
  

export default connect(mapStateToProps,{changeimage,removeimage})(withStyles(styles)(Profile));