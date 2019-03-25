import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
 } from 'reactstrap';


  export default class Example extends React.Component {
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

    render() {
      return (
        <div>
            <Navbar style={{position:'fixed', width:'100%', zIndex:'100'}} color="light" light expand="md">
            <NavbarBrand style={{color:'#EC7168', fontWeight: 'bold'}} href="/">My Tech World</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink onClick={this.props.showAll} style={{cursor:'pointer'}}>The Projects</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={this.props.showTop} style={{cursor:'pointer'}}>TOP 3</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }
