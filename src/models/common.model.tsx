
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

export interface Dropdown {
    id: any;
    value: string;
    disabled?: boolean;
}
export interface RadioModel {
    label: string,
    value: any,
    disabled?: boolean,
}
export interface InputField {
    id: any;
    value: string;
    disabled?: boolean;
    label?: string;
}

export interface Image {
    id?: string;
    file: Blob | string;
    foreignId: string;
}

export class GridSetting {
    PageIndex: number;
    PageSize: number;
    SortColumn: string;
    SortOrder: string;
    constructor() {
        this.PageIndex = 0;
        this.PageSize = 8;
        this.SortColumn = "";
        this.SortOrder = "Descending";
    }
}

export interface Pagination {
    onChangePage: any,
    onChangeRowsPerPage: any,
    total: number,
    gridSetting: GridSetting,
    rowsPerPage: number[],
}

export interface MenuItem {
    icon: any;
    name: string;
    routing?: string;
}

export class SnackbarModel {
    message: string;
    variant: any;
    open: boolean;
    onClose?: any;

    constructor() {
        this.message = '';
        this.variant = '';
        this.open = false;
    }
}
const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};


export const VARIANT_TYPE = {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
    INFO: 'info',
}