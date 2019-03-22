import React,{Component} from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import { logoutuser } from "../../actions/authAction";


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
 } from 'reactstrap';

class Navbars extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onlogout(e){
    e.preventDefault();
    this.props.logoutuser();
  }

  render() {

    const {isAuthenticated} = this.props.auth;

    const authlink = (
      <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink tag={Link} onClick={this.onlogout.bind(this)} to="/logout">Logout</NavLink>
      </NavItem>
    </Nav>

    );
    const guestlink = (
      <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink tag={Link} to="/login">Login</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to="/register">Sign Up</NavLink>
      </NavItem>
    </Nav>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand tag={Link} to="/">TaskManager</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {isAuthenticated?authlink:guestlink}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

Navbars.propTypes={
  logoutuser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth:state.auth
});

export default connect(mapStateToProps,{logoutuser})(Navbars);