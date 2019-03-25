import React, { Component} from 'react';
import {Jumbotron, Button} from 'reactstrap';


class JumbotronPage extends Component {
  render() {
    return (
      <Jumbotron className='Jumbotron'>
        <p id="Title"> My Tech World </p>
        <p id="Subtitle">10 weeks to change my life</p>
        <p id="Description">8 Fullstack projects to learn how to code</p>
        <Button color='secondary' active>Discover my projects</Button>
      </Jumbotron>
    );
  }
}

export default JumbotronPage;
