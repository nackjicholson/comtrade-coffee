import { createAction } from 'redux-actions';

// Constants
export const TRADE_REGIMES_REQUEST = 'TRADE_REGIMES_REQUEST';
export const TRADE_REGIMES_FAILURE = 'TRADE_REGIMES_FAILURE';
export const TRADE_REGIMES_SUCCESS = 'TRADE_REGIMES_SUCCESS';

// Actions
const tradeRegimesFailure = createAction(TRADE_REGIMES_FAILURE);
const tradeRegimesRequest = createAction(TRADE_REGIMES_REQUEST);
const tradeRegimesSuccess = createAction(TRADE_REGIMES_SUCCESS, (tradeRegimes) =>
  ({ regimesset: tradeRegimes.dataset, lastUpdated: Date.now() })
);

export function fetchTradeRegimes(comtrade) {
  return (dispatch) => {
    dispatch(tradeRegimesRequest());

    function handleRegimesSuccess(tradeRegimes) {
      dispatch(tradeRegimesSuccess(tradeRegimes));
    }

    function handleRegimesFailure(err) {
      dispatch(tradeRegimesFailure(err));
    }

    return comtrade
      .tradeRegimes()
      .then(handleRegimesSuccess, handleRegimesFailure);
  };
}

// Reducer
const defaultState = { isFetching: false, regimesset: [] };

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
