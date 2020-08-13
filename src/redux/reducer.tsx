import { combineReducers } from 'redux';
import { ACTION_TYPES, DROPDOWN_CLASS } from './actionTypes/actionTypes';
import { SnackbarModel } from '../models/common.model';
import { VARIANT_TYPE } from '../constants/common.constants';
export const initState = {
    logged: false,
    isLoading: false,
    snackbar: new SnackbarModel(),
};

const data = (state = initState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.GET_LIST_TOPIC:
            return { ...state, listTopic: action.data };
        case DROPDOWN_CLASS.GET_LIST_CLASS:
            return { ...state, listClass: action.data };
        case ACTION_TYPES.LOGIN:
            return { ...state, logged: action.data };
        case 'LOADING':
            return { ...state, isLoading: action.data }
        case ACTION_TYPES.PROFILE:
            return { ...state, userInfo: action.data };
        case ACTION_TYPES.SHOW_SNACKBAR:
            return { ...state, snackbar: action.data };
        default:
            return { ...state };
    }
};

const reducerApp = combineReducers({
    data,
});
export default reducerApp;