import React,{ Component } from "react";
import TextFieldGroup from "../../common/Textfield";

class Login extends Component{
    constructor(){
        super();
        this.state={
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

    render(){
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
                        />
            <label for="password">Password :</label>
                  <TextFieldGroup 
                      type="password" 
                      placeholder="Password" 
                      label="password"
                      name="password" required
                      value={this.state.password} 
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

export default Login;