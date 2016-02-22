import { createAction } from 'redux-actions';
import partnerAreasJSON from '../../services/partnerAreas.json';

// Constants
const SELECT_PARTNER_AREA = 'SELECT_PARTNER_AREA';

// Actions
export const selectPartnerArea = createAction(SELECT_PARTNER_AREA);

// Reducer
const defaultState = {
  results: partnerAreasJSON.results,
  selectedId: '826' // default to "United Kingdom"
};

function updatePartnerAreaSelection(state, selectedId) {
  return Object.assign({}, state, { selectedId });
}

export default function partnerAreasReducer(state = defaultState, action) {
  switch (action.type) {
    case SELECT_PARTNER_AREA:
      return updatePartnerAreaSelection(state, action.payload);
    default:
      return state;
  }
}
