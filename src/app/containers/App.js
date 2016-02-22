import React from 'react';
import { connect } from 'react-redux';
import TradeViz from '../components/TradeViz';
import comtrade from '../services/comtrade';
import { fetchTradeData } from '../redux/modules/tradeData/';
import { selectPartnerArea } from '../redux/modules/partnerAreas';
import { selectTradeRegime } from '../redux/modules/tradeRegimes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this._handlePartnerAreaChange = this._handlePartnerAreaChange.bind(this);
    this._handleTradeRegimeChange = this._handleTradeRegimeChange.bind(this);
  }

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

  _handlePartnerAreaChange(event) {
    this.props.selectPartnerArea(event.target.value);
  }

  _handleTradeRegimeChange(event) {
    this.props.selectTradeRegime(event.target.value);
  }

  render() {
    return (
      <div>
        <h1>Reported UN Coffee Trading</h1>
        <p>Classification Code: 090111 Coffee, not roasted, not decaffeinated</p>
        <div>
          <select
            id="partner-area"
            name="partner-area"
            onChange={this._handlePartnerAreaChange}
            defaultValue={this.props.partnerAreas.selectedId}
          >
            {this.props.partnerAreas.results.map((partnerArea, index) =>
              <option key={index} value={partnerArea.id}>{partnerArea.text}</option>
            )}
          </select>
          <select
            id="trade-regime"
            name="trade-regime"
            onChange={this._handleTradeRegimeChange}
            defaultValue={this.props.tradeRegimes.selectedId}
          >
            {this.props.tradeRegimes.results.map((tradeRegime, index) =>
              <option key={index} value={tradeRegime.id}>{tradeRegime.text}</option>
            )}
          </select>
        </div>
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
