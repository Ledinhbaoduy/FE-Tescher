import { baseURL } from "./config.constants";
import { STRING_REPLACE } from "./common.constants";

export const API_LOGIN = {
    LOGIN: `${baseURL}/dangnhap`,
}
export const API_QUESTION = {
    QUESTION: `${baseURL}/cauhoi`,
    // api tự luân: 
    SEARCH_ESSAY: `${baseURL}/cauhoi/tu-luan/search`,
    ADD_ESSAY_QUESTION: `${baseURL}/cauhoi/tu-luan/add`,
    UPDATE_ESSAY_QUESTION: `${baseURL}/cauhoi/tu-luan/update`,
    DELETE_ESSAY_QUESTION: `${baseURL}/cauhoi/tu-luan/delete`,
    SEARCH_QUESTION_ESSAY: `${baseURL}/cauhoi/tu-luan/search/bytitle`,
    DETAIL_QUESTION_ESSAY: `${baseURL}/cauhoi/tu-luan/${STRING_REPLACE.REPLACE_0}`,
    // api trắc nghiệm:
    SEARCH_MULTIPLE_CHOICE: `${baseURL}/cauhoi/trac-nghiem/search`,
    ADD_MULTIPLE_CHOICE_QUESTION: `${baseURL}/cauhoi/trac-nghiem/add`,
    UPDATE_MULTIPLE_CHOICE_QUESTION: `${baseURL}/cauhoi/trac-nghiem/update`,
    DELETE_MULTIPLE_CHOICE_QUESTION: `${baseURL}/cauhoi/trac-nghiem/delete`,
    SEARCH_QUESTION_MULTIPLE_CHOICE: `${baseURL}/cauhoi/trac-nghiem/search/bytitle`,
    DETAIL_QUESTION_MULTIPLE_CHOICE: `${baseURL}/cauhoi/trac-nghiem/${STRING_REPLACE.REPLACE_0}`,
}
export const API_TOPIC = {
    TOPIC: `${baseURL}/danhmuc/list`
}
export const API_CLASS = {
    DROPDOWN_CLASS: `${baseURL}/lophoc/${STRING_REPLACE.REPLACE_0}`,
    ADD_EXAM_TO_CLASS: `${baseURL}/lophoc/bai-tap/add`,
    ADD_TEST_TO_CLASS: `${baseURL}/lophoc/bai-thi/add`,
    REMOVE_EXAM_BY_INDEX: `${baseURL}/lophoc/bai-tap/remove`,
    REMOVE_TEST_BY_INDEx: `${baseURL}/lophoc/bai-thi/remove`,
    REMOVE_STUDENT: `${baseURL}/lophoc/removestudent`,
    INVITE_STUDENT: `${baseURL}/loimoi/`,
    INFO: `${baseURL}/lophoc/info`,
    ADD: `${baseURL}/lophoc/add`,
    UPDATE: `${baseURL}/lophoc/update`,
}
export const API_EXAM = {
    EXAM: `${baseURL}/baitap/`,
    DELETE: `${baseURL}/baitap/movetotrashbin`,
    ADD: `${baseURL}/baitap/add`,
    UPDATE: `${baseURL}/baitap/update`,
}

export const API_TEST = {
    TEST: `${baseURL}/baithi/search`,
    TEST_IN_CLASS: `${baseURL}/baithi/lophoc/`,
    GET_QUESTION_MC_BY_TOPIC: `${baseURL}/cauhoi/trac-nghiem/bytopic`,
    GET_QUESTION_ESSAY_BY_TOPIC: `${baseURL}/cauhoi/tu-luan/bytopic`,
    ADD_TEST: `${baseURL}/baithi/add`,
    DELETE_TEST: `${baseURL}/baithi/delete`,
    UPDATE_TEST: `${baseURL}/baithi/update`,
    DETAIL_TEST: `${baseURL}/baithi/${STRING_REPLACE.REPLACE_0}`,
}

export const API_PROFILE = {
    PROFILE: `${baseURL}/nguoidung/info/${STRING_REPLACE.REPLACE_0}`,
    CHANGE_PASSWORD: `${baseURL}/nguoidung/info/changepassword`,
    CHANGE_INFO_REQUEST: `${baseURL}/nguoidung/info/changeinforequest`
}
export const API_FILE = {
    MAIN: `${baseURL}/file/upload`
}

export const API_USER = {
    FORGOT_PASSWORD: `${baseURL}/quen-mat-khau/`,
    CHECK_CODE: `${baseURL}/quen-mat-khau/resetpassword/`,
    FORGOT_CHANGE_PASSWORD: `${baseURL}/quen-mat-khau/changepassword`,
    DELETE_CODE: `${baseURL}/quen-mat-khau/deletecode`,
}

export const API_RECYCLE_BIN = {
    //bài thi
    GET_TEST: `${baseURL}/recyclebin/bai-thi/search`,
    RESTORE_TEST: `${baseURL}/recyclebin/bai-thi/restore`,
    DELETE_TEST: `${baseURL}/recyclebin/bai-thi/delete`,
    //bài tập
    GET_EXCER: `${baseURL}/recyclebin/bai-tap/search`,
    RESTORE_EXCER: `${baseURL}/recyclebin/bai-tap/restore`,
    DELETE_EXCER: `${baseURL}/recyclebin/bai-tap/delete`
}
export const API_MARK = {
    GET_EXAM_MARKS: `${baseURL}/diem/${STRING_REPLACE.REPLACE_0}/baitap/${STRING_REPLACE.REPLACE_1}`,
    GET_TEST_MARKS: `${baseURL}/diem/${STRING_REPLACE.REPLACE_0}/baithi/${STRING_REPLACE.REPLACE_1}`,
    GET_EXAM_STUDENT: `${baseURL}/diem/baitap/${STRING_REPLACE.REPLACE_0}/${STRING_REPLACE.REPLACE_1}`,
    GET_TEST_STUDENT: `${baseURL}/diem/baithi/${STRING_REPLACE.REPLACE_0}/${STRING_REPLACE.REPLACE_1}`,
    ADD_MARK:`${baseURL}/diem/mark`,
}
