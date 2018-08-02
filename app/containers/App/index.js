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
  padding: 200px;
  flex-direction: column;

  ${({ active }) =>
    active &&
    `
  border: 5px solid blue;
`};
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedString: '',
      strings: [],
      active: false,
      submitted: [],
    };
  }

  componentWillMount() {
    this.props.loadStrings();
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.savedString !== this.state.savedString) {
      this.setState({ savedString: nextProps.savedString });
    }
  }

  handleActive = () => {
    if (!this.state.active) {
      this.setState({ active: true });
    } else {
      this.setState({ active: false });
    }
  };

  render() {
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
            render={() => (
              <div>
                <AppWrapper
                  active={this.state.active}
                  onClick={this.handleActive}
                >
                  <Display list={this.props.strings} />
                </AppWrapper>
              </div>
            )}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state, props) => ({
  savedString: state._root.entries[3][1].savedString,
  strings: state._root.entries[4][1].strings,
});

const mapActionsToProps = (dispatch, props) =>
  bindActionCreators(
    {
      onStringChange: typeString,
      loadStrings: () => ({ type: 'FETCH_STRINGS' }),
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(App);
