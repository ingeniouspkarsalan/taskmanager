import React,{ Component } from "react";
import TextFieldGroup from "../../common/Textfield";
import { registeruser } from "../../actions/authAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Register extends Component{

    constructor(){
        super();
        this.state={
            name:'',
            age:'',
            email:'',
            password:'',
            repeat_password:'',
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
            name:this.state.name,
            age:this.state.age,
            email:this.state.email,
            password:this.state.password,
            repeat_password:this.state.repeat_password
        }

        this.props.registeruser(newuser,this.props.history);
        
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push('/dashboard');
        }
      }

    componentWillReceiveProps(nextprops){
        if(nextprops.errors){
            this.setState({errors:nextprops.errors});
        }
    }

    render(){

        const {errors} = this.state;

        return(
            <div className="auth">
            <div className="dark-overlay">
            <div className="container landing-inner">
            <div className="row">
                <div className="col-md-8 m-auto text-light">
                  <h1 className="display-4 text-center">Registeration Form</h1>
                  <p className="lead text-center">Create your TaskManager account</p>
                  <form onSubmit={this.onsubmit}>

            <label for="name">Name :</label>
                  <TextFieldGroup 
                      type="text" 
                      placeholder="Name" 
                      name="name" required
                      label="name"
                      value={this.state.name} 
                      onChange={this.onchange.bind(this)}
                        error={errors.name}
                        />

            <label for="age">Age :</label>
                <TextFieldGroup 
                      type="number" 
                      placeholder="Age" 
                      name="age" required
                      label="age"
                      value={this.state.age} 
                      onChange={this.onchange.bind(this)}
                      error={errors.age}
                        />
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
                      error={errors.pass}
                      />
            <label for="repeat_password">Repeat Password :</label>
                  <TextFieldGroup 
                      type="password" 
                      placeholder="Repeat Password" 
                      label="repeat_password"
                      name="repeat_password" required
                      value={this.state.repeat_password} 
                      onChange={this.onchange.bind(this)}
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
Register.propTypes = {
    registeruser : PropTypes.func.isRequired,
    auth  : PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = (state) =>({
    auth:state.auth,
    errors:state.errors
});

export default connect(mapStateToProps,{registeruser})(withRouter(Register));