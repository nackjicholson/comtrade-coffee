export const TRADE_REGIMES_SUCCESS = 'TRADE_REGIMES_SUCCESS';

const defaultState = { isFetching: false, dataset: [] };

function storeTradeRegimes(state, tradeRegimes) {
  return Object.assign({}, state, { isFetching: false }, tradeRegimes);
}

export default function tradeRegimesReducer(state = defaultState, action) {
  switch (action.type) {
    case TRADE_REGIMES_SUCCESS:
      return storeTradeRegimes(state, action.payload);
    default:
      return state;
  }
}
