import React, {useState, useEffect} from 'react';
import {Navbar, Nav, Badge, NavItem, NavDropdown, Item} from 'react-bootstrap';
import {NavLink, Link } from 'react-router-dom';
import './styles/Navbar.css';
import firebase from 'firebase';
import {admin} from './const/admin';
import {connect} from 'react-redux';
import {addUser} from './state/user';
import Home from './views/Home'

const styles = {
  welcom: {
    display: 'flex',
    alignItems: 'center',
    color: 'yellow',
  }
}

class NavbarMenu extends React.Component {

  state = {
    user: null,
    admin: false,
  }

  handleSignOut = () => {
    console.log('Sign Out');
    this.setState({ admin: false });
    this.props._addUser('nothing');
    firebase.auth().signOut();
  }

  componentDidMount() {
    // console.log('user', this.state.user);

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if(user && user.email === process.env.REACT_APP_ADDRESS_EMAIL) {
        this.setState({ admin: true });
      }
      this.setState({ user: user });
    });
    this.setState({ unsubscribe });   
  }

  componentWillUnmount() {
      this.state.unsubscribe();
  }  

  render() {
    // console.log(admin);
    return (
      <>
      {/* {console.log('user: ', this.state.user)} */}
      {/* {console.log('admin: ', this.state.admin)} */}
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">

        <Navbar.Brand></Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          {/* Home Ok - icon awesome */}
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/" className='home'>
              <i className="fas fa-home-lg-alt" style={{fontSize: '22px'}}></i>
            </Nav.Link>
            <Nav style={styles.welcom}>
              <h6>
                {this.state.user && 
                  <span>Welcom <Badge variant="secondary">{this.state.user.email}</Badge></span>}
              </h6>            
            </Nav>
          </Nav>
          
          <Nav>
              {/* test Dropdown */}
              {/* <NavDropdown title="Test" id="collasible-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/chat"> Chat </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/features"> Features </NavDropdown.Item>
              </NavDropdown> */}

              {/* test */}
              {/* <Nav.Link as={NavLink} to="/snackbars"> Snackbars </Nav.Link>
              <Nav.Link as={NavLink} to="/scroll-top"> ScrollTop </Nav.Link>  */}

              {/* test for logged */}
              {/* <Nav.Link as={NavLink} to="/MoreDeets"> MoreDeets </Nav.Link>  */}

              {/* user client */}
              <Nav.Link as={NavLink} to="/img-show"> ImgShow </Nav.Link>

              {/* user logged */}
              {
              this.state.user &&
                <>
                  <Nav.Link as={NavLink} to="/chat"> Chat </Nav.Link>
                </>
              } 

              {/* admin */}
              {
              // this.state.user && this.state.admin &&
              //   <>
              //     <Nav.Link as={NavLink} to="/form"> Form</Nav.Link>
              //     {/* <Nav.Link as={NavLink} to="/features-admin"> Features Admin</Nav.Link> */}
              //     <Nav.Link as={NavLink} to="/img_storage"> Img-storage</Nav.Link>
              //     <Nav.Link as={NavLink} to="/img_database"> Img-database</Nav.Link>
              //   </>
              }
              {
              this.state.user && this.state.admin &&
              <NavDropdown title="Admin" id="collasible-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/form"> Form </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/komentarze-admin"> Komentarze </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/img_storage"> Img-storage </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/img_database"> Img-database </NavDropdown.Item>
              </NavDropdown>
              }

              {/* Log */}
              {
              this.state.user 
              ? <Nav.Link onClick={this.handleSignOut}> Sign Out </Nav.Link>
              // ? <Nav.Link as={NavLink} to="/sing-out" onClick={this.handleSignOut}> Sign Out </Nav.Link>
              : <Nav.Link as={NavLink} to="/sign-in"> Sign In </Nav.Link>
              }
          </Nav>

        </Navbar.Collapse>
      </Navbar>

      </>
    );    
  }

}
const mapDispatchToProps = ({
  _addUser: addUser,
})
export default connect(null, mapDispatchToProps)(NavbarMenu);
