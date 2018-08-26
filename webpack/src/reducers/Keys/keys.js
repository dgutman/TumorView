import * as ActionTypes from '../../actions/index';
import { Map, List } from 'immutable';

const initialState = Map({
    publicKey: false,
    privateKey: null,
    otherPublicKeys: Map({

    })
})

function keys(state = initialState, action) {
    switch(action.type) {
        default:
            return state
    }
}

export default keys
