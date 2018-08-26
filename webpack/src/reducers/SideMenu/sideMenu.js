import * as ActionTypes from '../../actions/index';
import { Map, List } from 'immutable';

const initialState = Map({
  viewSideMenu: false
})

function sideMenu(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.TOGGLE_SIDE_MENU:
      return state.update("viewSideMenu", (viewSideMenu) => !viewSideMenu)
    default:
      return state
  }
}

export default sideMenu
