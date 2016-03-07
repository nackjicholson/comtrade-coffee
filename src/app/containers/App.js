import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import SelectControl from '../components/SelectControl';
import TradeViz from '../components/TradeViz';
import comtrade from '../services/comtrade';
import { fetchTradeData } from '../redux/modules/tradeData/';
import { selectPartnerArea } from '../redux/modules/partnerAreas';
import { selectTradeRegime } from '../redux/modules/tradeRegimes';

export class App extends React.Component {
  componentDidMount() {
    const partnerArea = this.props.partnerAreas.selectedId;
    const tradeRegime = this.props.tradeRegimes.selectedId;

    this.props.requestTradeData({ partnerArea, tradeRegime });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.partnerAreas.selectedId !== this.props.partnerAreas.selectedId ||
      nextProps.tradeRegimes.selectedId !== this.props.tradeRegimes.selectedId
    ) {
      const partnerArea = nextProps.partnerAreas.selectedId;
      const tradeRegime = nextProps.tradeRegimes.selectedId;

      this.props.requestTradeData({ partnerArea, tradeRegime });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <form>
          <SelectControl
            id="partner-area"
            labelText="Choose a country"
            defaultValue={this.props.partnerAreas.selectedId}
            onSelection={this.props.selectPartnerArea}
          >
            {this.props.partnerAreas.results.map((partnerArea, index) =>
              <option key={index} value={partnerArea.id}>{partnerArea.text}</option>
            )}
          </SelectControl>
          <SelectControl
            id="trade-regime"
            labelText="Choose a trade flow"
            defaultValue={this.props.tradeRegimes.selectedId}
            onSelection={this.props.selectTradeRegime}
          >
            {this.props.tradeRegimes.results.map((tradeRegime, index) =>
              <option key={index} value={tradeRegime.id}>{tradeRegime.text}</option>
            )}
          </SelectControl>
        </form>
        <TradeViz tradeData={this.props.tradeData} />
      </div>
    );
  }
}

App.propTypes = {
  partnerAreas: React.PropTypes.object,
  requestTradeData: React.PropTypes.func,
  selectPartnerArea: React.PropTypes.func,
  selectTradeRegime: React.PropTypes.func,
  tradeRegimes: React.PropTypes.object,
  tradeData: React.PropTypes.object
};

const mapDispatchToProps = (dispatch) =>
  ({
    requestTradeData(parameters) {
      dispatch(fetchTradeData(comtrade, parameters));
    },

    selectPartnerArea(selectedId) {
      dispatch(selectPartnerArea(selectedId));
    },

    selectTradeRegime(selectedId) {
      dispatch(selectTradeRegime(selectedId));
    }
  });

export default connect(state => state, mapDispatchToProps)(App);
