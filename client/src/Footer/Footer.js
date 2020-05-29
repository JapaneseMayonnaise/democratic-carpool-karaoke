import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Footer = () => {
    return (
      <Row>
         <Col className='h6 login-photo-credit fixed-bottom text-center'>
            Copyright 2020
            <a href="https://github.com/DrCardamom/democratic-carpool-karaoke">
               &nbsp; Elliot Shimba
            </a>
         </Col>
      </Row>
    )       
}

export default Footer;