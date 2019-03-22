import React,{ Component } from "react";
import TextFieldGroup from "../../common/Textfield";
import { loginuser } from "../../actions/authAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Login extends Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            errors:''
        }
        this.onchange = this.onchange.bind(this);
        this.onsubmit = this.onsubmit.bind(this);
    }

    onchange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onsubmit(e){
        e.preventDefault();

        const newuser ={
            email:this.state.email,
            password:this.state.password
        }

        this.props.loginuser(newuser);
        
    }


    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push('/dashboard');
        }
      }
  
      componentWillReceiveProps(nextProps){
  
        if(nextProps.auth.isAuthenticated){
          this.props.history.push('/dashboard');
        }
  
        if(nextProps.errors){
          this.setState({errors:nextProps.errors});
        }
      }

    render(){

        const {errors}=this.state;
        return(
            <div className="auth">
            <div className="dark-overlay">
            <div className="container landing-inner">
            <div className="row">
                <div className="col-md-8 m-auto text-light">
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">Sign in to your TaskManager account</p>
                  <form onSubmit={this.onsubmit}>

            
            <label for="email">Email :</label>
                  <TextFieldGroup 
                      type="email" 
                      placeholder="Email Address" 
                      label="email"
                      name="email" required
                      value={this.state.email} 
                      onChange={this.onchange.bind(this)}
                      error={errors.email}
                        />
            <label for="password">Password :</label>
                  <TextFieldGroup 
                      type="password" 
                      placeholder="Password" 
                      label="password"
                      name="password" required
                      value={this.state.password} 
                      onChange={this.onchange.bind(this)}
                      error={errors.password}
                      />
            
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            
            </div>
            </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginuser:PropTypes.func.isRequired,
    auth  : PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth:state.auth,
    errors:state.errors
});

export default connect(mapStateToProps,{loginuser})(withRouter(Login));