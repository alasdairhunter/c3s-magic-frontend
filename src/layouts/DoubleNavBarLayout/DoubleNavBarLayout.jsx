import React, { Component } from 'react';
import { Row } from 'reactstrap';
export default class NavBarLayout extends Component {
  render () {
    const { route } = this.props;
    const { header, secondNavbar, viewComponent } = route;
    return (
      <div className='innerContainer'>
        { header
          ? <Row className='Header' tag='header'>
            {React.cloneElement(header, this.props) || 'HeaderLayout Oops'}
          </Row>
          : null }
        { secondNavbar
          ? <Row className='secondNavbar' tag='secondNavbar'>
            {React.cloneElement(secondNavbar, this.props) || 'secondNavbar Oops'}
          </Row>
          : null }
        { viewComponent
          ? <Row className='map' tag='main'>
            { viewComponent }
          </Row>
          : null }
        <Row className='MainSection'>
          {this.props.children}
        </Row>
      </div>
    );
  }
}
