export const APP_ROUTER = {
    USER: {
        PROFILE: '/profile',
        PAYMENT: '/payment',
        FORGOT_CHANGE_PASSWORD: '/au/active/forgotpassword/:code'
    },
    LOGIN: {
        HOME: '/',
        FORGOT_PASSWORD: '/forgot-password',
    },
    REGISTRATION: '/registration',
    TEACHER: {
        HOME: '/teacher',
    },
    MANAGE_QUESTION: '/manage-question',
    MANAGE_TEST: '/manage-test',
    TEST_DETAIL: '/manage-test/mode=',
    CLASS: {
        ALL_BY_TEACHER: '/class',
        DETAIL_CLASS: '/class/:id',
    },
    TRASH_CAN: '/recycle-bin',
    LOGOUT: '/logout',
}