import React,{ Component } from "react";
import { addtask } from "../../actions/taskAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../../common/Textfield";

class Addtask extends Component{

    constructor(){
        super();
        this.state={
            description:'',
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

        const task ={
            description:this.state.description
        }

        this.props.addtask(task,this.props.history);
        
    }

    



    render(){
        const {errors}=this.state;
        return(
            <div className="container landing-inner">
            <div className="row">
                <div className="col-md-8 m-auto text-light">
                  <h1 className="display-4 text-center alert-info">Task Manager</h1>
                  <p className="lead text-center alert-primary">Task insert section. </p>
                  <form onSubmit={this.onsubmit}>

            
            <label htmlFor="description" className="alert-warning">Description :</label>
                  <TextFieldGroup 
                      type="text" 
                      placeholder="Enter Description" 
                      label="description"
                      name="description" required
                      value={this.state.description} 
                      onChange={this.onchange.bind(this)}
                      error={errors.error}
                        />        
                <input type="submit" className="btn btn-primary btn-block mt-4" value="Add Task"/>
                  </form>
                </div>
              </div>
            
            </div>

        );
    }
}

Addtask.propTypes = {
    addtask:PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired
}

const MapStateToProp = (state) => ({
    task:state.task,
    errors: state.errors
});

export default connect(MapStateToProp,{addtask})(withRouter(Addtask));