import React, { Component } from 'react'
import { Row, Col, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import style from './style.less'

class NavBar extends Component {
  render() {
    const { links } = this.props
    return (
      <Row className="clearfix">
        <Col sm={16}>
          <Nav stacked>
            {links.map((link, i) =>
              <LinkContainer key={i} to={link.path}>
                <NavItem>{link.caption}</NavItem>
              </LinkContainer>
            )}
          </Nav>
        </Col>
      </Row>
    );
  }
}

export default NavBar
