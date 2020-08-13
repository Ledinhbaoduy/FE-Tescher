import React from 'react';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import { MenuItem } from '../models/common.model';
import { APP_ROUTER } from './router.constants';
import ClassIcon from '@material-ui/icons/Class';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import DeleteIcon from '@material-ui/icons/Delete';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { red } from '@material-ui/core/colors';
export const MENU_DATA: MenuItem[] = [
    {
        icon: <MenuBookRoundedIcon style={{ color: "#2980B9" }} />,
        name: 'Bài Kiểm Tra/ Bài Thi',
        routing: APP_ROUTER.MANAGE_TEST,
    },
    {
        icon: <QuestionAnswerIcon style={{ color: "#6dd5fa" }} />,
        name: 'Thư viện Câu Hỏi',
        routing: APP_ROUTER.MANAGE_QUESTION,
    },
    {
        icon: <ClassIcon style={{ color: "#86A8E7" }} />,
        name: 'Lớp học',
        routing: APP_ROUTER.CLASS.ALL_BY_TEACHER,
    },
    {
        icon: <DeleteIcon style={{ color: red[500] }} />,
        name: 'Thùng rác',
        routing: APP_ROUTER.TRASH_CAN,
    },
]
export const MENU_PROFILE: MenuItem[] = [
    {
        icon: <PermIdentityIcon />,
        name: 'Thông Tin Cá Nhân',
    },
    {
        icon: <VpnKeyIcon />,
        name: 'Mật Khẩu',
    },
]