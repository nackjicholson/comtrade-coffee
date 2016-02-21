import { createAction } from 'redux-actions';

// Constants
export const TRADE_DATA_REQUEST = 'TRADE_DATA_REQUEST';
export const TRADE_DATA_FAILURE = 'TRADE_DATA_FAILURE';
export const TRADE_DATA_SUCCESS = 'TRADE_DATA_SUCCESS';

// Actions
const tradeDataFailure = createAction(TRADE_DATA_FAILURE);
const tradeDataRequest = createAction(TRADE_DATA_REQUEST);
const tradeDataSuccess = createAction(TRADE_DATA_SUCCESS, (tradeData) =>
  ({ dataset: tradeData.dataset, lastUpdated: Date.now() })
);

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
