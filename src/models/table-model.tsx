import { GridSetting } from "./common.model";

export interface TableQuestData {
    question: string,
    answerA: string,
    answerB: string,
    answerC: string,
    answerD: string,
    answer: string,
    topic: string,
    score: number,
    updateAt?: string,
    createBy?: string,
}

interface IAnswer {
    id: string;
    value: string;
}

export interface IMyTable {
    tableConfig: TableConfig;
    gridSetting: GridSetting;
    sort?: any;
    view?: any;
    edit?: any;
    add?: any;
    delete?: any;
    restore?: any;
    classes?: any;
    isShowRestoreIcon?: boolean;
    isShowEditIcon?: boolean;
    isShowDeleteIcon?: boolean;
    isShowCheckBox?: boolean;
}

export class TableConfig {
    titles: string[];
    columns: ColumnTable[];
    rowCount?: number;
    total?: number;
    data: any[];
    constructor(titles: string[], columns: ColumnTable[], data: any[]) {
        this.titles = titles;
        this.columns = columns;
        this.data = data;
    }
}
export interface ColumnTable {
    title: string;
    value: string;
    isSort?: boolean;
    isDisplay?: boolean;
}
export interface tableTest {
    tieu_de: string;
    lop_hoc_id: string;
    ngay_thi: Date;
    thoi_gian_thi: number;
    ngay_tao: Date;
    updatedAt: Date;
}
export interface tableEssay {
    topic: string;
    question: string;
    answer: string;
    score: number;
    updateAt?: string;
    createBy?: string;
}