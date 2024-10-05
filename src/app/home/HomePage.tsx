'use client';

import React from 'react';
import { Container, Col } from 'react-bootstrap';
import { PageIDs } from '../../utilities/ids';
import pageStyle from '../../utilities/pageStyle';

const HomePage = () => (
  <Container id={PageIDs.homePage} className="justify-content-center" style={pageStyle}>
    <Col>
      <Col className="justify-content-center text-center">
        <h2>Your Profile</h2>
      </Col>
    </Col>
  </Container>
);

export default HomePage;
