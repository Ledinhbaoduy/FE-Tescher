import React, { Component } from 'react'
import BoxContainer from '../../shared/components/box-container/box-container'
import { MyInput } from '../../shared/components/my-input/my-input'
import MySelect from '../../shared/components/my-select'
import { Dropdown, GridSetting } from '../../models/common.model'
import MyButton from '../../shared/components/my-button/my-button'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import history from '../../navigation/App.history'
import './manage-test.scss';
import AppQuestionDialog from './add-question-dialog'
import { MODE, VARIANT_TYPE } from '../../constants/common.constants'
import { IMyQuestion } from '../../shared/models/question.model'
import MyQuestion from '../../shared/components/my-question/question'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TestService } from '../../service/test.service'
import MyPicker from '../../shared/components/my-picker'
import { showSnackbar } from '../../redux/actionCreator/actionCreator';
import { MESSAGE_COMMON } from '../../constants/message.constants'

interface ICreateTest {
    openDialog: boolean;
    tieu_de: string;
    lop_hoc_id: Dropdown;
    ngay_thi: Date;
    thoi_gian_thi: string;
    ds_cau_hoi: IMyQuestion[];
    // diem: string;
    topic: Dropdown[],
    onDisabled: boolean;

}
interface ITestDetail {
    onClickCreate: Function;
    listTopic: Dropdown[];
    listClass: Dropdown[];
    location: any;
    showSnackbar: any;
}

class TestDetailScreen extends Component<ITestDetail, ICreateTest> {

    testService = new TestService();
    btnText = 'Tạo Bài Thi'
    constructor(props: any) {
        super(props)
        this.state = {
            openDialog: false,
            topic: [],
            lop_hoc_id: {
                id: "",
                value: "",
            },
            ds_cau_hoi: [],
            ngay_thi: new Date(),
            tieu_de: "",
            onDisabled: false,
            thoi_gian_thi: "",
        }
    }

    componentDidMount = () => {
        switch (this.props.location.state.mode) {
            case MODE.ADD:
                this.onAddMode();
                break;
            case MODE.EDIT:
                this.onEditMode();
                break;
        }
    }

    onAddMode = () => {
        document.title = 'Tạo Bài Thi'
        this.btnText = 'Tạo Bài Thi';
    }
    //lấy chi tiết bài thi để thực hiên update
    onEditMode = () => {
        this.btnText = 'Sửa Bài Thi'
        document.title = 'Sửa Bài Thi'
        const id = this.props.location.state.id;
        this.testService.getDetailTest(id).subscribe(res => {
            if (res) {
                res.lop_hoc_id = { id: res.lop_hoc_id._id, value: '' };
                res.ds_cau_hoi = res.ds_cau_hoi.map((s: any) => ({ ...s, ...s.cau_hoi_id }));
                this.setState(res);
            }
        });
        this.setState({onDisabled: true})

    }

    onclickCreateTest = () => {
        this.props.onClickCreate();
    }

    // lấy api lớp học
    onSelectClass = (id: string) => {
        const value = this.props.listClass.find(s => s.id === id)!
        this.setState({ lop_hoc_id: value });
    }

    onSortData = (gridSetting: GridSetting) => {


    }

    //hiển thị dialog add câu hỏi vào bài thi
    toggleDialog = () => {
        this.setState({ openDialog: !this.state.openDialog });
    }

    //add câu hỏi vào bài thi
    onAddQuestion = (data: IMyQuestion) => {
        const question = [...this.state.ds_cau_hoi, data];
        this.setState({ ds_cau_hoi: question });
    }

    //những câu hỏi được chọn hiện thị trong form thêm bài thi
    renderListQuestion = () => {
        return this.state.ds_cau_hoi.map((s: any, i: number) => {
            s = { ...s, canAdd: false, canDelete: true };
            return <MyQuestion {...s} index={i + 1} onDelete={this.onDeleteQuestion} />
        })
    }

    //xóa câu hỏi trong form thêm bài thi
    onDeleteQuestion = (id: string) => {
        const filterQuestion = this.state.ds_cau_hoi.filter(s => s._id !== id);
        this.setState({ ds_cau_hoi: filterQuestion });
    }

    // lấy api topic 
    onChangeTopic = (ids: Dropdown[]) => {
        let data = this.props.listTopic.filter((s: Dropdown) => ids.includes(s.id));
        this.setState({ topic: data });
    }

    // xử lý submit thêm bài thi
    onSubmit = () => {
        const state = this.state;
        const isValidForm = state.ds_cau_hoi.length >= 1 && state.ds_cau_hoi.length <= 100;
        if (!isValidForm) {
            this.props.showSnackbar({
                message: 'Phải Có Ít Nhất một Câu Hỏi và nhiều nhất là 100 câu hỏi !!',
                variant: VARIANT_TYPE.WARNING,
                open: true,
            });
            return;
        }
        else if (!state.tieu_de) {
            this.props.showSnackbar({
                message: 'bạn chưa điền vào ô tên bài thi !!',
                variant: VARIANT_TYPE.WARNING,
                open: true,
            });
            return;
        }
        else if (!state.lop_hoc_id.id) {
            this.props.showSnackbar({
                message: 'bạn chưa chọn vào ô lớp học !!',
                variant: VARIANT_TYPE.WARNING,
                open: true,
            });
            return;
        }
        else if (!state.thoi_gian_thi) {
            this.props.showSnackbar({
                message: 'bạn chưa điền vào ô thời gian thi!!',
                variant: VARIANT_TYPE.WARNING,
                open: true,
            });
            return;
        }
        else if (parseInt(state.thoi_gian_thi) <= 10) {
            this.props.showSnackbar({
                message: 'Thời gian thi phải lớn hơn 10 !!',
                variant: VARIANT_TYPE.WARNING,
                open: true,
            });
            return;
        }
        else if (new Date(state.ngay_thi).getTime() <= new Date().getTime()) {
            this.props.showSnackbar({
                message: 'Bạn Chọn Ngày thi Không Hợp Lệ!!',
                variant: VARIANT_TYPE.WARNING,
                open: true,
            });
            return;
        }
        const question = state.ds_cau_hoi.map(s => ({ cau_hoi_id: s._id, loai: s.loai }));
        const body = {
            ...state,
            lop_hoc_id: state.lop_hoc_id.id,
            ds_cau_hoi: question,
            thoi_gian_thi: parseInt(state.thoi_gian_thi),
        }
        switch (this.props.location.state.mode) {
            case MODE.ADD:
                this.onAddTest(body);
                break;
            case MODE.EDIT:
                this.onEditTest(body);
                break;
        }
    }

    //xử lý add bài thi
    onAddTest = (body: any) => {
        this.testService.addTest(body).subscribe(res => {
            if (res && res.success) {
                this.props.showSnackbar({
                    message: MESSAGE_COMMON.SUCCESS_ADD,
                    variant: VARIANT_TYPE.SUCCESS,
                    open: true,
                })
                history.goBack();
            } else {
                this.props.showSnackbar({
                    message: MESSAGE_COMMON.ERROR_ADD,
                    variant: VARIANT_TYPE.ERROR,
                    open: true,
                })
            }
        });
    }

    //xử lý cập nhật bài thi
    onEditTest = (body: any) => {
        body.id = this.props.location.state.id;
        this.testService.updateTest(body).subscribe(res => {
            if (res && res.success) {
                this.props.showSnackbar({
                    message: MESSAGE_COMMON.SUCCESS_UPDATE,
                    variant: VARIANT_TYPE.SUCCESS,
                    open: true,
                })
                history.goBack();
            }
            else {
                this.props.showSnackbar({
                    message: MESSAGE_COMMON.ERROR_UPDATE,
                    variant: VARIANT_TYPE.ERROR,
                    open: true,
                })
            }
        });
    }

    //quay trở lại trang quản lý bài thi
    onGoBack = () => {
        history.goBack();
    }

    render() {
        const listClass = this.props.listClass || [];
        return (
            <BoxContainer header={this.btnText}>
                <div className="group-name-score-time">
                    <MyInput
                        className="name-test"
                        label='Tên bài thi'
                        onChange={(value: string) => this.setState({ tieu_de: value })}
                        value={this.state.tieu_de}
                        variant="outlined"
                        multiline
                        rowsMax={4}
                    />
                    <MyInput
                        className="time-test"
                        label="Thời gian làm bài"
                        onChange={(value: string) => this.setState({ thoi_gian_thi: value })}
                        value={this.state.thoi_gian_thi}
                        type="number"
                        variant="outlined"
                    />
                </div>
                <div className="group-class-date">
                    <div className="class">
                        <MySelect
                            label="Lớp"
                            items={listClass}
                            onChange={this.onSelectClass}
                            value={this.state.lop_hoc_id.id}
                            disabled={this.state.onDisabled}
                        />
                    </div>

                    <MyPicker
                        className="time-start-test"
                        label="Thời gian bắt đầu thi"
                        value={this.state.ngay_thi}
                        onChange={(value: Date) => { this.setState({ ngay_thi: value }) }}
                        inputVariant="outlined"
                        format='MM/dd/yyyy HH:mm:ss'
                    />
                </div>
                <div className="btn-create">
                    <MyButton
                        label={this.btnText}
                        color="primary"
                        onClick={this.onSubmit}
                        startIcon={<AddCircleIcon />}
                    />
                    <div className="btn-add">
                        <MyButton
                            label="add câu hỏi"
                            color="primary"
                            onClick={this.toggleDialog}
                        />
                    </div>
                    <div className="go-back">
                        <MyButton
                            label="Quay lại"
                            color="primary"
                            onClick={this.onGoBack}
                        />
                    </div>
                </div>

                {this.state.openDialog && <AppQuestionDialog
                    openDialog={this.state.openDialog}
                    toggleDialog={this.toggleDialog}
                    onAddQuestion={this.onAddQuestion}
                    listQuestion={this.state.ds_cau_hoi}
                // type={type}
                />}

                {this.renderListQuestion()}
            </BoxContainer>
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        listTopic: state.data.listTopic,
        listClass: state.data.listClass
    };
};

const mapDispatchToProps = (dispatch: any) => {
    const actionsCreator = { showSnackbar };
    const action = bindActionCreators(actionsCreator, dispatch);
    return { ...action };
}
export default connect(mapStateToProps, mapDispatchToProps)(TestDetailScreen);