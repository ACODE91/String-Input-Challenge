/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';

import Input from 'components/Input';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedString: '',
    };

    this.handleStringSubmit.bind(this);
    this.handleStringInput.bind(this);
  }

  handleStringInput(text) {
    const typedString = text.target.value;
    this.state.savedString = typedString;
    this.setState();
    console.log('our state is', this.state);
  }

  handleStringSubmit(event) {
    console.log('clicked ', this.state);
    axios({
      method: 'post',
      url: '/saved',
      data: {
        input: this.state,
      },
    }).then((response) => {
      console.log(response);
    });
  }

  render() {
    return (
      <AppWrapper>
        <Helmet titleTemplate="Dovenmuele Challenge">
          <meta name="description" content="A React.js Dovenmuele Challenge" />
        </Helmet>
        <Input
          clickFn={this.handleStringSubmit.bind(this)}
          typeFn={this.handleStringInput.bind(this)}
        />
      </AppWrapper>
    );
  }
}
