import React from 'react';
import { connect } from 'react-redux';
import { appInit } from '../redux/modules/root';
import comtrade from '../services/comtrade';

class App extends React.Component {
  componentDidMount() {
    const partnerArea = this.props.partnerAreas.selectedId;
    const tradeRegime = this.props.tradeRegimes.selectedId;
    this.props.appInit({ partnerArea, tradeRegime });
  }

  render() {
    console.log(this.props);
    return (
      <pre>{JSON.stringify(this.props.tradeData, null, 2)}</pre>
    );
  }
}

App.propTypes = {
  appInit: React.PropTypes.func,
  partnerAreas: React.PropTypes.object,
  tradeRegimes: React.PropTypes.object,
  tradeData: React.PropTypes.object
};

const mapDispatchToProps = (dispatch) =>
  ({
    appInit(parameters) {
      dispatch(appInit(comtrade, parameters));
    }
  });

export default connect(state => state, mapDispatchToProps)(App);
