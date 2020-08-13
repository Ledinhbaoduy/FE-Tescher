import React, { Component } from 'react';
import MyDialog from '../../shared/components/my-dialog/my-dialog';
import { MyInput } from '../../shared/components/my-input/my-input';
import { DialogActions } from '@material-ui/core';
import MyButton from '../../shared/components/my-button/my-button';
import { Dropdown, InputField, VARIANT_TYPE } from '../../models/common.model';
import { Guid } from 'guid-typescript';
import MySelect from '../../shared/components/my-select';
import { MODE, QUESTION_TYPE } from '../../constants/common.constants';
import BoxContainer from '../../shared/components/box-container/box-container';
import CommonService from '../../service/common.service';
import Authorized from '../../service/authorized.service';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { QuestionService } from '../../service/question.service';
import { showSnackbar } from '../../redux/actionCreator/actionCreator';

interface IDialogProps {
    openDialog: boolean,
    toggleDialog: any,
    onSubmit: any,
    mode: string,
    type: boolean;
    listTopic: Dropdown[];
    id: string;
    onLoading?: any;
    editInfo?: any;
    showSnackbar: any;

}

export interface IManageQuestionDialogState {
    id?: string;
    danh_muc: Dropdown;
    noi_dung: string;
    lua_chon: InputField[],
    dap_an: Dropdown;
    diem: number;
    nguoi_tao_id: string,
    isLoading: boolean;
    type: Dropdown;
}

const initState = {
    id: '',
    noi_dung: '',
    lua_chon: [
        { id: '', label: 'Đáp Án A', value: '' },
        { id: '', label: 'Đáp Án B', value: '' },
        { id: '', label: 'Đáp Án C', value: '' },
        { id: '', label: 'Đáp Án D', value: '' }
    ],
    danh_muc: { id: '', value: '' },
    dap_an: { id: '', value: '' },
    diem: 0,
    nguoi_tao_id: '',
    isLoading: false,
    type: QUESTION_TYPE[0],
}
class ManageQuestionDialog extends Component<IDialogProps, IManageQuestionDialogState> {
    private commonService = new CommonService();
    private authorService = new Authorized();
    private questionService = new QuestionService();
    private title: string = '';

    constructor(props: any) {
        super(props);
        this.state = initState;
    }

    componentDidMount() {
        switch (this.props.mode) {
            case MODE.ADD:
                this.onAddMode();
                break;
            case MODE.EDIT:
                this.onEditMode();
                break;
            case MODE.VIEW:
                this.onViewMode();
                break;
        }
    }

    onViewMode = () => {

    }
    //hàm thêm câu hỏi
    onAddMode = () => {
        this.title = 'Tạo Câu Hỏi';
        const setIDAnswers = this.state.lua_chon.map(s => ({ ...s, id: Guid.create().toString() }));
        this.setState({ lua_chon: setIDAnswers, });
    }
    //hàm sửa câu hỏi
    onEditMode = () => {
        this.setState({ isLoading: true });
        this.title = 'Sửa Câu Hỏi';
        const type = this.props.type;
        if (this.props.id) {
            type ?
                this.questionService.getDetailMultipleChoiceQuestion(this.props.id).subscribe(res => {
                    this.setState({ isLoading: false });
                    if (res) {
                        this.setState({
                            noi_dung: res.question,
                            lua_chon: res.options,
                            dap_an: res.answer,
                            diem: res.score,
                            danh_muc: res.topic,
                            id: this.props.id
                        });
                    }
                }) :
                this.questionService.getDetailEssayQuestion(this.props.id).subscribe(res => {
                    this.setState({ isLoading: false });
                    if (res) {
                        const topic = { id: res.danh_muc._id };
                        this.setState({ ...res, danh_muc: topic, id: this.props.id });
                    }
                })

        }
    }

    renderAnswer = () => {
        return this.state.lua_chon.map((answer, index) =>
            <div className="answer">
                <MyInput
                    id="question"
                    label={answer.label!}
                    onChange={(e: string) => this.handleInputAnswer(e, answer.id)}
                    value={answer.value}
                    rowsMax={4}
                    multiline
                    fullWidth
                    variant="standard"
                    inputRef={(el: []) => this.state.lua_chon === el}
                />
            </div>

        )
    }

    handleInputAnswer = (value: string, id: any) => {
        const answers = this.state.lua_chon.map(s => {
            if (s.id === id) {
                s.value = value;
            }
            return s;
        })
        this.setState({ lua_chon: answers })
    }

    handleGetOption = (value: any, field: string): void => {
        if (value) {
            if (field === 'topic') {
                const _topic = this.props.listTopic.find(s => s.id === value)!;
                this.setState({ danh_muc: _topic });
            } else {
                const _correctAnswer = this.state.lua_chon.find(s => s.id === value)!;
                this.setState({ dap_an: _correctAnswer });
            }
        }
    }

    validateForm_1 = () => {
        if (!this.state.noi_dung) {
            this.props.showSnackbar({
                message: "bạn chưa điền vào tên câu hỏi!",
                variant: VARIANT_TYPE.WARNING,
                open: true
            });
            return false;
        }
        else if (!this.state.danh_muc.id) {
            this.props.showSnackbar({
                message: "bạn chưa chọn chủ đề cho câu hỏi!",
                variant: VARIANT_TYPE.WARNING,
                open: true
            });
            return false;
        }
        else if (!this.state.dap_an.id) {
            this.props.showSnackbar({
                message: "bạn chưa chọn đáp án đúng cho câu hỏi!",
                variant: VARIANT_TYPE.WARNING,
                open: true
            });
            return false;
        }
        else if (!this.state.diem ) {
            this.props.showSnackbar({
                message: "bạn chưa điền vào điểm!",
                variant: VARIANT_TYPE.WARNING,
                open: true
            });
            return false;
        }
        else if(this.state.diem <=0 || this.state.diem > 10){
            this.props.showSnackbar({
                message: "bạn phải nhập điểm bé hơn 10 và không được bé hơn 0!",
                variant: VARIANT_TYPE.WARNING,
                open: true
            });
            return false;
        }
        else {
            const invalid = this.state.lua_chon.some(s => s.value === "");
            const missingLabel = this.state.lua_chon.filter(s => s.value === "").map(s => ' ' + s.label);
            if (invalid) {
                this.props.showSnackbar({
                    message: `Vui long dien cac cau:${missingLabel}`,
                    variant: VARIANT_TYPE.WARNING,
                    open: true
                });
                return false;
            }
        }
        return true;
    }

    validateForm_2 = () => {
        if (!this.state.noi_dung) {
            this.props.showSnackbar({
                message: "bạn chưa điền vào tên câu hỏi!",
                variant: VARIANT_TYPE.WARNING,
                open: true
            });
            return false;
        }
        else if (!this.state.danh_muc.id) {
            this.props.showSnackbar({
                message: "bạn chưa chọn chủ đề cho câu hỏi!",
                variant: VARIANT_TYPE.WARNING,
                open: true
            });
            return false;
        }
        else if (!this.state.diem || this.state.diem <= 0) {
            this.props.showSnackbar({
                message: "bạn chưa điền vào điểm!",
                variant: VARIANT_TYPE.WARNING,
                open: true
            });
            return false;
        }
        return true
    }
    onSubmit = () => {
        const validate = this.props.type ? this.validateForm_1() : this.validateForm_2();
        if (validate) {
            const item = {
                ...this.state,
                nguoi_tao_id: this.authorService.getUserInfo().user_info.id,
                diem: this.state.diem,
                danh_muc: this.state.danh_muc.id,
            };
            this.props.onSubmit(item);
            this.setState(initState);
        }
    }

    onClose() {
        this.setState(initState);
        this.props.toggleDialog();
    }

    render() {
        const correctAnswers = this.state.lua_chon.map(s => ({ id: s.id, value: s.label! }));
        const isMultipleChoice = this.props.type;
        const listTopic: Dropdown[] = this.props.listTopic || [];
        return (
            <MyDialog
                title={this.title}
                open={this.props.openDialog}
                onClose={() => this.onClose()}
                maxWidth="sm"
                fullWidth={true}
            >
                <BoxContainer>
                    <div className="input-data">
                        <div className='name-question'>
                            <MyInput
                                label="câu hỏi"
                                onChange={(e: string) => this.setState({ noi_dung: e })}
                                value={this.state.noi_dung}
                                rowsMax={4}
                                multiline
                                fullWidth
                                variant="standard"
                                inputRef={(e: string) => this.state.noi_dung === e}
                            />
                        </div>
                        {isMultipleChoice ? this.renderAnswer() : null}

                        <div className="group-topic-questionCombobox">
                            {isMultipleChoice ? <div className="question-combobox">
                                <MySelect
                                    label="Đáp Án Đúng"
                                    items={correctAnswers}
                                    value={this.state.dap_an.id}
                                    onChange={(e: any) => this.handleGetOption(e, '')}
                                />

                            </div> : null}
                            <div className='input-topic'>
                                <MySelect
                                    label='Chủ đề'
                                    items={listTopic}
                                    value={this.state.danh_muc.id}
                                    onChange={(e: any) => this.handleGetOption(e, 'topic')}
                                    defaultValue={listTopic[0]?.id}
                                />
                            </div>
                        </div>

                        <div className="score">
                            <MyInput
                                label="Điểm"
                                onChange={(e: number) => this.setState({ diem: e })}
                                value={this.state.diem}
                                rowsMax={4}
                                type="number"
                                fullWidth
                                variant="standard"
                                inputRef={(e: number) => this.state.diem === e}
                            />

                        </div>
                    </div>
                </BoxContainer>
                <DialogActions>
                    <MyButton label="Xác Nhận" onClick={this.onSubmit} />
                    <MyButton label="Hủy" onClick={() => this.onClose()} color='secondary' />
                </DialogActions>

            </MyDialog>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        listTopic: state.data.listTopic
    };
};

const mapDispatchToProps = (dispatch: any) => {
    const actionsCreator = { showSnackbar };
    const action = bindActionCreators(actionsCreator, dispatch);
    return { ...action };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageQuestionDialog);