import React,{ Component } from "react";
import TextFieldGroup from "../../common/Textfield";

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
                        />

            <label for="age">Age :</label>
                <TextFieldGroup 
                      type="number" 
                      placeholder="Age" 
                      name="age" required
                      label="age"
                      value={this.state.age} 
                      onChange={this.onchange.bind(this)}
                        />
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

export default Register;