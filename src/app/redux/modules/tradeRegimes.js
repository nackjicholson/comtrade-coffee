import { createAction } from 'redux-actions';
import tradeRegimesJSON from '../../services/tradeRegimes.json';

// Constants
const SELECT_TRADE_REGIME = 'SELECT_TRADE_REGIME';

// Actions
export const selectTradeRegime = createAction(SELECT_TRADE_REGIME);

// Reducer
const defaultState = {
  results: tradeRegimesJSON.results,
  selectedId: '1'
};

function updateTradeRegimeSelection(state, selectedId) {
  return Object.assign({}, state, { selectedId });
}

export default function tradeRegimesReducer(state = defaultState, action) {
  switch (action.type) {
    case SELECT_TRADE_REGIME:
      return updateTradeRegimeSelection(state, action.payload);
    default:
      return state;
  }
}
