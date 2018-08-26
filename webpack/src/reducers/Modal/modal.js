import * as ActionTypes from '../../actions/index';
import { Map, List } from 'immutable';

const initialState = Map({
  viewable: false,
  type: null
})

function modal(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.TOGGLE_MODAL:
      return state.update("viewable", (viewable) => !viewable)
        .update("type", () => action.modalType)
    default:
      return state
  }
}

export default modal
