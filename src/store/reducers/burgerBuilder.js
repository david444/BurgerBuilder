import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../../shared/utility';

const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initState = {
    ingridients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const addIngridient = (state, action) => {
    const newProps = { [action.ingridientName]: state.ingridients[action.ingridientName] + 1 }
    const updateIngridients = updateObject(state.ingridients, newProps);
    const updatedState = {
        ingridients: updateIngridients,
        totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingridientName],
        building: true
    }
    return updateObject(state, updatedState);
}

const removeIngridient = (state, action) => {
    const updatedProps = { [action.ingridientName]: state.ingridients[action.ingridientName] - 1 }
    const updatedIngridients = updateObject(state.ingridients, updatedProps);
    const updatedSt = {
        ingridients: updatedIngridients,
        totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingridientName],
        building: true
    }
    return updateObject(updatedSt, updatedSt);
}

const setIngridients = (state, action) => {
    return updateObject(state,
        {
            ingridients: action.ingridients,
            error: false,
            totalPrice: 4.0,
            building: false
        })
}

const fetchIngridientsFailed = (state, action) => {
    return updateObject(state, { error: true })
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGRIDIENT: return addIngridient(state, action);
        case actionTypes.REMOVE_INGRIDIENT: return removeIngridient(state, action);
        case actionTypes.SET_INGRIDIENTS: return setIngridients(state, action);
        case actionTypes.FETCH_INGRIDIENTS_FAILED: return fetchIngridientsFailed(state, action);
        default:
            return state;
    }
}

export default reducer;