import { Dropdown } from "../../models/common.model";

export interface IMyQuestion {
    _id: string;
    noi_dung: string;
    answer?: string;
    lua_chon?: Dropdown[];
    score: number;
    loai: string;
    canDelete?: boolean;
    canAdd?: boolean;
    clickAdd?: any;
    disableAdd?: boolean;
    clickEdit?: any;
    index?: number;
    onDelete?: any;
    diem?: string;
}
