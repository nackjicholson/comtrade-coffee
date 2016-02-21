import partnerAreasJSON from '../../services/partnerAreas.json';

// Reducer
const defaultState = {
  results: partnerAreasJSON.results,
  selectedId: '757'
};

export default function partnerAreasReducer(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
