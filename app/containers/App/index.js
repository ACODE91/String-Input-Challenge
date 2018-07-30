/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch } from 'react-router-dom';
import axios from 'axios';
import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Input from 'components/Input';
import Display from '../../components/Display/Display.js';

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
      strings: [],
    };

    this.handleStringSubmit.bind(this);
    this.handleStringInput.bind(this);
  }

  componentWillMount() {
    axios({
      method: 'get',
      url: '/saved',
    }).then(response => {
      this.setState({ strings: response.data });
      console.log(this.state);
    });
  }

  handleStringInput(text) {
    const typedString = text.target.value;
    this.state.savedString = typedString;
    this.setState();
    console.log('our state is', this.state);
  }

  handleStringSubmit(event) {
    console.log('clicked ', this.state);
    if (!this.state.savedString) {
      alert('Enter a string!');
    } else {
      axios({
        method: 'post',
        url: '/saved',
        data: {
          input: this.state,
        },
      }).then(response => {
        console.log(response);
      });
    }
  }

  render() {
    function refreshPage() {
      window.location.reload();
    }
    return (
      <Router>
        <div>
          <Route
            path="/"
            exact
            render={() => (
              <div>
                <Input
                  typeFn={this.handleStringInput.bind(this)}
                  clickFn={this.handleStringSubmit.bind(this)}
                />
                <Link to="/display" onClick={refreshPage}>
                  Display Saved Strings
                </Link>
              </div>
            )}
          />
          <Route
            path="/display"
            exact
            render={() => (
              <div>
                <Display list={this.state.strings} />
              </div>
            )}
          />
        </div>
      </Router>
    );
  }
}
