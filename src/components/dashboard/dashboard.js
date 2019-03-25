import React,{ Component } from "react";
import { alltasks } from "../../actions/taskAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Grid from '@material-ui/core/Grid';


const styles = {
    greenAvatar: {
      margin: 10,
      color: '#fff',
      backgroundColor: green[500],
      height:300,
      width:300
    },
    icon: {
        fontSize: 200,
      },
  };

class Dashboard extends Component{

    constructor(){
        super();
        this.state={
            task:{},
            errors:''
        }
    }

    



    componentDidMount(){
        this.props.alltasks();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.task.having){
            this.setState({task:this.props.tasks});
        }
    }

    render(){

        const {having,tasks} = this.props.task;
        const { classes } = this.props;
        const no = (
            <div className="container">
        <Grid container justify="center" alignItems="center">
        <Avatar className={classes.greenAvatar}>
        <AssignmentIcon className={classes.icon} />
      </Avatar>
    </Grid>
    <p className="text-center alert-secondary inherit">No Task Available.</p>
            </div>
        );


        const yes=(
            <div></div>
        );



        return(
            <div className="container">
                {having?yes:no}
            </div>

        );
    }
}


Dashboard.propTypes = {
    alltasks:PropTypes.func.isRequired,
    auth  : PropTypes.object.isRequired,
    task  : PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth:state.auth,
    task:state.task,
    errors:state.errors
});

export default connect(mapStateToProps,{alltasks})(withStyles(styles)(Dashboard));