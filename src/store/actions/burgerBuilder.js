import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders'

export const addIngridient = (name) => {
    return {
        type: actionTypes.ADD_INGRIDIENT,
        ingridientName: name
    }
}

export const removeIngridient = (name) => {
    return {
        type: actionTypes.REMOVE_INGRIDIENT,
        ingridientName: name
    }
}

export const setIngridient = (ingridients) => {
    return {
        type: actionTypes.SET_INGRIDIENTS,
        ingridients: ingridients
    }
}

export const fetchIngridientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGRIDIENTS_FAILED
    }
}

export const initIngridients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-a36b6.firebaseio.com/ingridients.json')
            .then(response => {
                dispatch(setIngridient(response.data));
            })
            .catch(error => {
                dispatch(fetchIngridientsFailed());
            })
    }
}