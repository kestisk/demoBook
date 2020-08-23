import * as actionTypes from "../action/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  index: 1,
  count: 0,
  filters: { type: "all", values: [] },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INDEX:
      return updateObject(state, { index: action.val });
    case actionTypes.DATA:
      return updateObject(state, { data: action.val });
    case actionTypes.COUNT:
      return updateObject(state, { count: action.val });
    case actionTypes.FILTERS:
      return updateObject(state, { filters: action.val });
    default:
      return state;
  }
};
export default reducer;
