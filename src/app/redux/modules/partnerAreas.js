import { createAction } from 'redux-actions';

// Constants
export const PARTNER_AREAS_REQUEST = 'PARTNER_AREAS_REQUEST';
export const PARTNER_AREAS_FAILURE = 'PARTNER_AREAS_FAILURE';
export const PARTNER_AREAS_SUCCESS = 'PARTNER_AREAS_SUCCESS';

// Actions
export const partnerAreasFailure = createAction(PARTNER_AREAS_FAILURE);
export const partnerAreasRequest = createAction(PARTNER_AREAS_REQUEST);
export const partnerAreasSuccess = createAction(PARTNER_AREAS_SUCCESS, (partnerAreas) =>
  ({ results: partnerAreas.results, lastUpdated: Date.now() })
);

export function fetchPartnerAreas(comtrade, parameters) {
  return (dispatch) => {
    dispatch(partnerAreasRequest());

    function handlePartnerAreasSuccess(partnerAreas) {
      dispatch(partnerAreasSuccess(partnerAreas));
    }

    function handlePartnerAreasFailure(err) {
      dispatch(partnerAreasFailure(err));
    }

    return comtrade
      .partnerAreas(parameters)
      .then(handlePartnerAreasSuccess, handlePartnerAreasFailure);
  };
}

// Reducer
const defaultState = { isFetching: false, results: [], selectedId: '757' };

function storePartnerAreas(state, partnerAreas) {
  return Object.assign({}, state, { isFetching: false }, partnerAreas);
}

export default function partnerAreasReducer(state = defaultState, action) {
  switch (action.type) {
    case PARTNER_AREAS_SUCCESS:
      return storePartnerAreas(state, action.payload);
    default:
      return state;
  }
}
