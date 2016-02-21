import React from 'react';
import { connect } from 'react-redux';
import { fetchTradeData } from '../redux/modules/tradeData';
import comtrade from '../services/comtrade';

class App extends React.Component {
  componentDidMount() {
    const partnerArea = this.props.partnerAreas.selectedId;
    const tradeRegime = this.props.tradeRegimes.selectedId;
    this.props.requestTradeData({ partnerArea, tradeRegime });
  }

  render() {
    console.log(this.props);
    return (
      <pre>{JSON.stringify(this.props.tradeData, null, 2)}</pre>
    );
  }
}

App.propTypes = {
  requestTradeData: React.PropTypes.func,
  partnerAreas: React.PropTypes.object,
  tradeRegimes: React.PropTypes.object,
  tradeData: React.PropTypes.object
};

const mapDispatchToProps = (dispatch) =>
  ({
    requestTradeData(parameters) {
      dispatch(fetchTradeData(comtrade, parameters));
    }
  });

export default connect(state => state, mapDispatchToProps)(App);
