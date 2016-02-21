export const PARTNER_AREAS_SUCCESS = 'PARTNER_AREAS_SUCCESS';

const defaultState = { isFetching: false, dataset: [] };

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
