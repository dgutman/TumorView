import {call, fork, put, take} from 'redux-saga/effects';
import * as ActionTypes from '../../../actions/index';
import SecurusScriptum from '../../../api/SecurusScriptum';
import { fromJS, List } from 'immutable';

let api = new SecurusScriptum();

export default function* watchGenerateKeys() {
  while(true) {
    const generateKeyAction = yield take(ActionTypes.GENERATE_KEYS);
    if (generateKeyAction.name && generateKeyAction.email && generateKeyAction.password) {
      const options = {
        userIds: [{name: generateKeyAction.name, email: generateKeyAction.email}],
        numBits: 4096,
        password: generateKeyAction.password
      }
      console.log("Beginning to generate keys")
      window.openpgp.generate(options).then(function(key) {
        const privateKey = key.privateKeyArmored;
        const publicKey = key.publicKeyArmored;
        console.log("Public Key", publicKey);
        console.log("Private Key", privateKey);
      })
    }
  }

}
