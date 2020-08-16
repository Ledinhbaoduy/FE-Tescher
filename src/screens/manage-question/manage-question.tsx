import React, { Component } from 'react'
import './manage-question.scss';
import { Observable } from "rxjs";
import { TableConfig } from '../../models/table-model'
import { MyInput } from '../../shared/components/my-input/my-input';
import MyButton from '../../shared/components/my-button/my-button';
import BoxContainer from '../../shared/components/box-container/box-container';
import ManageQuestionDialog, { IManageQuestionDialogState } from './manage-question-dialog';
import { MODE } from '../../constants/common.constants';
import MyTableComponent from '../../shared/components/my-table';
import MySelect from '../../shared/components/my-select';
import { Dropdown, GridSetting, VARIANT_TYPE } from '../../models/common.model';
import { QuestionService } from '../../service/question.service';
import SearchIcon from '@material-ui/icons/Search';
import CommonService from '../../service/common.service';
import Skeleton from '@material-ui/lab/Skeleton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppService from '../../service/authorized.service';
import MyTooltipComponent from '../../shared/components/my-tooltip';
import { QUESTION_TYPE } from '../../constants/common.constants';
import { showSnackbar, onLoading } from '../../redux/actionCreator/actionCreator';
import { MESSAGE_COMMON } from '../../constants/message.constants';

interface IManageQuestionState {
    openDialog: boolean;
    mode: string;
    tableConfigMultipleChoice: TableConfig;
    questionType: Dropdown;
    title: string;
    tableConfigEssay: TableConfig;
    gridSetting: GridSetting,
    isLoading: boolean,
    topic: Dropdown[]
    dialogId: string;
}
class ManageQuestionScreen extends Component<{ listTopic: any, isLogged?: boolean, showSnackbar: any }, IManageQuestionState> {
    private questionService = new QuestionService();
    private commonService = new CommonService();
    private authorService = new AppService();

    constructor(props: any) {
        super(props);
        this.state = {
            gridSetting: new GridSetting(),
            openDialog: false,
            mode: MODE.ADD,
            title: "",
            tableConfigMultipleChoice: {
                titles: ['question', 'answerA', 'answerB', 'answerC', 'answerD', 'answer', 'topic', 'score', 'updatedBy', 'createdBy', 'createdAt'],
                columns: [
                    { value: 'question', title: 'Câu Hỏi' },
                    { value: 'answerA', title: 'Đáp Án A' },
                    { value: 'answerB', title: 'Đáp Án B' },
                    { value: 'answerC', title: 'Đáp Án C' },
                    { value: 'answerD', title: 'Đáp Án D' },
                    { value: 'answer', title: 'Đáp Án Đúng' },
                    { value: 'topic', title: 'Chủ Đề' },
                    // { value: 'score', title: 'Điểm' },
                    { value: 'createdBy', title: 'Người Tạo' },
                    { value: 'createdAt', title: 'Ngày Tạo' },
                    { value: 'updatedAt', title: 'Ngày Cập Nhật' },
                ],
                data: [],


            },
            topic: [],
            questionType: QUESTION_TYPE[0],

            tableConfigEssay: {
                titles: ['question', 'topic', 'score', 'updatedAt', 'createdBy', 'createdAt'],
                columns: [
                    { value: 'question', title: 'Câu Hỏi' },
                    { value: 'topic', title: 'Chủ Đề' },
                    // { value: 'score', title: 'Điểm' },
                    { value: 'createdBy', title: 'Người Tạo' },
                    { value: 'updatedAt', title: 'Ngày Cập Nhật' },
                    { value: 'createdAt', title: 'Ngày Tạo' },
                ],
                data: [],
            },
            isLoading: false,
            dialogId: '',
        }
    }
    componentDidMount() {
        document.title= 'Quản Lý Câu Hỏi';
        this.onSearch();
    }
    // hàm đổ api vào bảng 
    onSearch() {
        this.setState({ isLoading: true });
        const questionType = this.state.questionType.id === '1';
        const search = questionType ?
            this.questionService.searchContentQuestionMultipleChoice(this.state) :
            this.questionService.searchContentQuestionEssay(this.state);

        search.subscribe(res => {
            this.setState({ isLoading: false });
            debugger
            const data = res.data.map((s: any) => ({ ...s, id: s._id }));
            if (questionType) {
                this.setState({
                    tableConfigMultipleChoice: {
                        ...this.state.tableConfigMultipleChoice,
                        data: this.formatDataMultipleQuestion(data),
                        total: res.count
                    }
                })
            } else {
                this.setState({
                    tableConfigEssay: {
                        ...this.state.tableConfigEssay,
                        data: data,
                        total: res.count
                    }
                });
            }
        });
    }
    // hàm map lại các cột đáp án 
    formatDataMultipleQuestion = (data: any) => {
        const tableData = data.map((row: any) => {
            row.answers = row.answers.map((s: any, i: number) => ({
                ...s, label: s.label = 'answer' + this.commonService.getLocationAlphabet(i)
            }));
            row.answers.forEach((s: any) => {
                row[s.label] = s.value;
            })
            delete row.answers;
            return row;
        })
        return tableData;
    }


    toggleDialog = () => {
        this.setState({ openDialog: !this.state.openDialog })
    }
    // hàm thêm câu hỏi
    onSubmit = (item: IManageQuestionDialogState) => {
        switch (this.state.mode) {
            case MODE.ADD:
                this.onAdd(item);
                break;
            case MODE.EDIT:
                this.onEdit(item);
                break;
            default:
                break;
        }

    }

    onAdd = (item: IManageQuestionDialogState) => {
        const type = this.state.questionType.id === '1';
        type ?
            this.questionService.addMultipleChoiceQuestion(item).subscribe(res => {
                if (res && res.success) {
                    this.props.showSnackbar({
                        message: MESSAGE_COMMON.SUCCESS_ADD,
                        variant: VARIANT_TYPE.SUCCESS,
                        open: true
                    })
                    this.setState({ openDialog: !this.state.openDialog }, () => this.onSearch());
                }
                else {
                    this.props.showSnackbar({
                        message: MESSAGE_COMMON.ERROR_ADD,
                        variant: VARIANT_TYPE.ERROR,
                        open: true
                    })
                }
            })
            : this.questionService.addEssay(item).subscribe(res => {
                if (res && res.success) {
                    this.props.showSnackbar({
                        message: MESSAGE_COMMON.SUCCESS_ADD,
                        variant: VARIANT_TYPE.SUCCESS,
                        open: true
                    });
                    this.setState({ openDialog: !this.state.openDialog }, () => this.onSearch());
                }
                else {
                    this.props.showSnackbar({
                        message: MESSAGE_COMMON.ERROR_ADD,
                        variant: VARIANT_TYPE.ERROR,
                        open: true
                    });
                }
            })
    }

    onEdit = (item: IManageQuestionDialogState) => {
        const type = this.state.questionType.id === '1';
        const body = { ...item, id: item.id };
        type ?
            this.questionService.updateMultipleChoiceQuestion(body).subscribe(res => {
                if (res && res.success) {
                    this.props.showSnackbar({
                        message: MESSAGE_COMMON.SUCCESS_UPDATE,
                        variant: VARIANT_TYPE.SUCCESS,
                        open: true
                    });
                    this.setState({ openDialog: !this.state.openDialog }, () => this.onSearch());
                }
                else {
                    this.props.showSnackbar({
                        message: MESSAGE_COMMON.ERROR_UPDATE,
                        variant: VARIANT_TYPE.ERROR,
                        open: true
                    });
                }
            })
            : this.questionService.updateEssay(body).subscribe(data => {
                if (data && data.success) {
                    this.props.showSnackbar({
                        message: MESSAGE_COMMON.SUCCESS_UPDATE,
                        variant: VARIANT_TYPE.SUCCESS,
                        open: true
                    });
                    this.setState({ openDialog: !this.state.openDialog }, () => this.onSearch());
                }
                else {
                    this.props.showSnackbar({
                        message: MESSAGE_COMMON.ERROR_UPDATE,
                        variant: VARIANT_TYPE.ERROR,
                        open: true
                    });
                }
            })
    }

    // hàm lấy id question type
    onSelectQuestionType = (id: string) => {
        const questionType = QUESTION_TYPE.find(s => s.id === id)!;
        this.setState({ questionType: questionType }, () => {
            this.onSearch();
        })
    }
    // hàm sắp sếp theo cột
    onSortData = (gridSetting: GridSetting) => {
        this.setState({ gridSetting }, () => {
            this.onSearch();
        });
    }
    //hàm xóa câu hỏi trong bảng 
    onDelete = (id: string) => {
        const type = this.state.questionType.id === "1";
        const obDeleteItem: Observable<any> = type ? this.questionService.deleteMultipleChoiceQuestion({ id }) :
            this.questionService.deleteEssay({ id })
        obDeleteItem.subscribe(res => {
            if (res && res.success) {
                this.props.showSnackbar({
                    message: MESSAGE_COMMON.SUCCESS_DELETE,
                    variant: VARIANT_TYPE.SUCCESS,
                    open: true
                });
                this.onSearch();
            }
            else {
                this.props.showSnackbar({
                    message: MESSAGE_COMMON.ERROR_DELETE,
                    variant: VARIANT_TYPE.ERROR,
                    open: true
                });
            }
        })
    }

    lineLoad = () => {
        const tmp = '1 2 3 4 5 6 7 8 9';
        return (
            tmp.split(' ').map((x: any) => <Skeleton height={45} />)
        )
    }
    //hàm lấy api chủ đề
    onChangeTopic = (ids: Dropdown[]) => {
        let data = this.props.listTopic.filter((s: Dropdown) => ids.includes(s.id));
        this.setState({ topic: data });

    }

    onClickEdit = (id: string) => {
        if (id) {
            this.setState({
                dialogId: id,
                mode: MODE.EDIT,
            }, () => this.toggleDialog())
        }
    }

    onClickAdd = () => {
        this.setState({
            dialogId: '',
            mode: MODE.ADD,
        }, () => this.toggleDialog())
    }

    render() {
        const type = this.state.questionType.id === '1';
        // const listTopic = this.props.listTopic || [];
        const tableConfig = type ? this.state.tableConfigMultipleChoice : this.state.tableConfigEssay
        return (
            <BoxContainer header='Thư Viện Câu Hỏi'>
                <div className='action-container'>
                    <div className="button-creat">

                        <MyTooltipComponent title='Tạo câu hỏi' onClick={this.onClickAdd} />
                    </div>
                    <div className="search">
                        <MyInput
                            variant="outlined"
                            label='Tìm kiếm câu hỏi'
                            value={this.state.title}
                            onChange={(value: string) => this.setState({ title: value })} />
                    </div>
                    <div className="select-species">
                        <MySelect
                            label="Loại Câu Hỏi"
                            items={QUESTION_TYPE}
                            value={this.state.questionType.id}
                            onChange={this.onSelectQuestionType}

                        />
                    </div>
                    {/* <MyAutocomplete
                        className="Question-topic"
                        label="chủ đề"
                        onChange={this.onChangeTopic}
                        value={this.state.topic}
                        multiple
                        items={listTopic}
                        multiline={true}
                    /> */}
                    <MyButton className="btn-search-question" label="Tìm kiếm" onClick={() => this.onSearch()} startIcon={<SearchIcon />} />
                </div>
                {/* bảng câu hỏi */}
                {
                    this.state.isLoading
                        ? this.lineLoad()

                        : <MyTableComponent
                            gridSetting={this.state.gridSetting}
                            isShowDeleteIcon={true}
                            isShowEditIcon={true}
                            tableConfig={tableConfig}
                            sort={this.onSortData}
                            delete={this.onDelete}
                            edit={this.onClickEdit}
                        />

                }
                {this.state.openDialog ? <ManageQuestionDialog
                    openDialog={this.state.openDialog}
                    toggleDialog={this.toggleDialog}
                    onSubmit={this.onSubmit}
                    mode={this.state.mode}
                    type={type}
                    id={this.state.dialogId}
                /> : null}
            </BoxContainer>
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        logged: state.data.logged,
        listTopic: state.data.listTopic,
        isLoading: state.data.isLoading,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    const actionCreator = { showSnackbar, onLoading };
    const action = bindActionCreators(actionCreator, dispatch);
    return { ...action };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageQuestionScreen);