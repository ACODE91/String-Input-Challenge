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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { typeString } from '../../typeActions.js';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedString: '',
      strings: [],
    };
  }

  componentWillMount() {
    axios({
      method: 'get',
      url: '/saved',
    })
      .then(response => {
        this.setState({ strings: response.data });
        console.log(this.state, 'from get response');
      })
      .catch(error => {
        console.log(error, 'from get error');
      });
  }

  handleStringInput = text => {
    const typedString = text.target.value;
    this.state.savedString = typedString;
    this.setState();
  };

  handleStringSubmit = event => {
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
      })
        .then(response => {
          console.log(response, 'from success');
          axios({
            method: 'get',
            url: '/saved',
          })
            .then(response => {
              this.setState({ strings: response.data, savedString: '' });
              alert('String saved!');
              console.log(this.state, 'from get response');
            })
            .catch(error => {
              console.log(error, 'from get error');
            });
        })
        .catch(error => {
          console.log(error, 'from error');
        });
    }
  };

  render() {
    console.log(this.props, "app's props", this.state, 'changed state');
    return (
      <Router>
        <div>
          <Route
            path="/"
            exact
            render={() => (
              <div>
                <Input
                  typeFn={this.props.onStringChange}
                  clickFn={this.handleStringSubmit}
                />
                <Link to="/display">Display Saved Strings</Link>
              </div>
            )}
          />
          <Route
            path="/display"
            exact
            render={() => {
              console.log(this.state.strings);
              return (
                <div>
                  <Display list={this.state.strings} />
                </div>
              );
            }}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log(state._root.entries[3][1].savedString, 'this is state');
  return { savedString: state._root.entries[3][1].savedString }
};

const mapActionsToProps = (dispatch, props) => {
  console.log(props, 'this is map actions to props');
  return bindActionCreators(
    {
      onStringChange: typeString,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(App);
