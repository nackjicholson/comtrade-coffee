export const TRADE_DATA_SUCCESS = 'TRADE_DATA_SUCCESS';

const defaultState = { isFetching: false, dataset: [] };

function storeTradeData(state, tradeData) {
  return Object.assign({}, state, { isFetching: false }, tradeData);
}

export default function tradeDataReducer(state = defaultState, action) {
  switch (action.type) {
    case TRADE_DATA_SUCCESS:
      return storeTradeData(state, action.payload);
    default:
      return state;
  }
}
