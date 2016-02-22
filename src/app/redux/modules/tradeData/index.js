import { createAction } from 'redux-actions';
import convertToTreemap from './convertToTreemap';

// Constants
export const TRADE_DATA_REQUEST = 'TRADE_DATA_REQUEST';
export const TRADE_DATA_FAILURE = 'TRADE_DATA_FAILURE';
export const TRADE_DATA_SUCCESS = 'TRADE_DATA_SUCCESS';

// Actions
export const tradeDataFailure = createAction(TRADE_DATA_FAILURE);
export const tradeDataRequest = createAction(TRADE_DATA_REQUEST);
export const tradeDataSuccess = createAction(TRADE_DATA_SUCCESS, (tradeData) => {
  const dataset = tradeData.dataset;
  return {
    data: {
      raw: dataset,
      quantityTreemap: convertToTreemap(tradeData.dataset, 'rtTitle', 'TradeQuantity'),
      valueTreemap: convertToTreemap(tradeData.dataset, 'rtTitle', 'TradeValue')
    },
    lastUpdated: Date.now()
  };
});

export function fetchTradeData(comtrade, parameters) {
  return (dispatch) => {
    dispatch(tradeDataRequest());

    function handleGetSuccess(tradeData) {
      dispatch(tradeDataSuccess(tradeData));
    }

    function handleGetFailure(err) {
      dispatch(tradeDataFailure(err));
    }

    return comtrade
      .get(parameters)
      .then(handleGetSuccess, handleGetFailure);
  };
}

// Reducer
const defaultState = { isFetching: false, data: {} };

function storeTradeData(state, tradeData) {
  return Object.assign({}, state, { isFetching: false }, tradeData);
}

export default function tradeDataReducer(state = defaultState, action) {
  switch (action.type) {
    case TRADE_DATA_SUCCESS:
      return storeTradeData(state, action.payload);
    case TRADE_DATA_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    default:
      return state;
  }
}
