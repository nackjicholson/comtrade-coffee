import React from 'react';
import { connect } from 'react-redux';
import Greet from '../components/Greet';

class App extends React.Component {
  render() {
    const { greeting } = this.props;

    return <Greet greeting={greeting.greeting} message={greeting.message} />;
  }
}

App.propTypes = {
  greeting: React.PropTypes.object
};

export default connect(state => state)(App);
