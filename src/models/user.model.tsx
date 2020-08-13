import { Dropdown } from "./common.model";
import { radioModel } from "../shared/models/shared.component.model";

export class UserLogin {
    email: string;
    mat_khau: string;
    // loai: number;
    constructor(email: string, password: string) {
        this.email = email;
        this.mat_khau = password;
    }
}

export interface UserInformation {
    _id:string;
    ho: string;
    ten: string;
    anh_dai_dien: string;
    mat_khau: string;
    email: string;
    ngay_sinh:  Date;
    updatedAt:  Date;
    nguoi_tao_id: string;
    createdAt: Date;
    fullName: string;
    ly_do:string;
    isLoading: boolean;
    sdt: string;
    gioi_tinh: boolean;
    onDisabled: boolean;
}


export interface TokenInformation {
    user_info: TokenInfo;
    token: string;
    success: boolean;
}

interface TokenInfo {
    id: string;
    email: string;
}