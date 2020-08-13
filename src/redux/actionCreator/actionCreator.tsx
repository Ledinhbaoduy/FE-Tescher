import { ACTION_TYPES, DROPDOWN_CLASS } from "../actionTypes/actionTypes";
import { Dropdown } from "../../models/common.model";

export const getListTopic = (data: Dropdown[]) => {
    return {
        type: ACTION_TYPES.GET_LIST_TOPIC,
        data,
    };
}
export const getListClass = (data: Dropdown[]) => {
    return {
        type: DROPDOWN_CLASS.GET_LIST_CLASS,
        data,
    }
}

export const onLogin = (data: boolean) =>{
    return {
        type: ACTION_TYPES.LOGIN,
        data,
    }
}

export const onLoading = (data: boolean) => {
    return {
        type:'LOADING',
        data,
    }
}
export const getInfoUser = (data : any) =>{
    return {
        type: ACTION_TYPES.PROFILE,
        data,
    }
}

export const showSnackbar = (data: any) => {
    return {
        type: ACTION_TYPES.SHOW_SNACKBAR,
        data,
    }
}