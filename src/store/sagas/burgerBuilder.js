import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions';

export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get('https://react-my-burger-a36b6.firebaseio.com/ingridients.json');
        yield put(actions.setIngridient(response.data));
    }
    catch (error) {
        yield put(actions.fetchIngridientsFailed());
    }
}