import React, { Component } from 'react'
import MyDialog from '../../shared/components/my-dialog/my-dialog'
import { MyInput } from '../../shared/components/my-input/my-input'
import { IMyQuestion } from '../../shared/models/question.model';
import MyQuestion from '../../shared/components/my-question/question';
import { TestService } from '../../service/test.service';
import { Dropdown } from '../../models/common.model';
import { QUESTION_TYPE } from '../../constants/common.constants';
import MySelect from '../../shared/components/my-select';
import './manage-test.scss';
import MyAutocomplete from '../../shared/components/my-autocomplete';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showSnackbar } from '../../redux/actionCreator/actionCreator';
import MyButton from '../../shared/components/my-button/my-button';
import SearchIcon from '@material-ui/icons/Search';
interface IDialogProps {
    openDialog: boolean,
    toggleDialog: any,
    type?: boolean;
    onAddQuestion: any;
    listQuestion: IMyQuestion[];
    listTopic: Dropdown[];
}

interface IDialogState {
    loai: Dropdown;
    data: IMyQuestion[];
    isLoading: boolean;
    topicId: Dropdown[];
    title: string;
}

class AppQuestionDialog extends Component<IDialogProps, IDialogState>{

    testService = new TestService();

    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: false,
            loai: QUESTION_TYPE[0],
            data: [],
            topicId: [],
            title: "",
        }
    }

    componentDidMount() {
        this.onSearch();
    }

    renderListQuestion = () => {
        return this.state.data ? this.state.data.map(s => {
            s = { canAdd: true, ...s };
            return <MyQuestion {...s} clickAdd={(s: IMyQuestion) => this.handleAddQuestion(s)} />
        }) : <div>Data Not Found</div>;
    }

    handleAddQuestion = (question: IMyQuestion) => {
        const data = this.state.data.map((s: any) => {
            const disableAdd = s.disableAdd ? s.disableAdd : question._id === s._id;
            return { ...s, disableAdd };
        });
        this.setState({ data: data }, () => this.props.onAddQuestion(question));
    }

    onSearch() {
        this.setState({ data: [] });
        const type = this.state.loai.id === "1";
        const topicId = this.state.topicId.map(s => s.id);
        // const body = {
        //     ...topicId,
        //     // title: this.state.title
        // }
        const search = type ? this.testService.getQuestionMCByTopic(topicId) :
            this.testService.getQuestionEssayByTopic(topicId);
        search.subscribe(res => {
            if (res && res.length) {
                res = res.map((s: any) => {
                    const disableAdd = this.props.listQuestion.some(f => f._id === s._id);
                    return { ...s, loai: type ? 'TracNghiem' : 'TuLuan', disableAdd };
                });
                this.setState({ data: res });
            }
        });
    }

    onSelectQuestionType = (id: string) => {
        const questionType = QUESTION_TYPE.find(s => s.id === id)!;
        this.setState({ loai: questionType }, () => {
            this.onSearch();
        })
    }

    onChangeTopic = (ids: Dropdown[]) => {
        let dataTopic = this.props.listTopic.filter((s: Dropdown) => ids.includes(s.id));
        this.setState({ topicId: dataTopic });
    }

    render() {
        const listTopic = this.props.listTopic || [];
        return (
            <MyDialog
                title='Thêm Câu Hỏi Vào Bài Thi'
                open={this.props.openDialog}
                onClose={this.props.toggleDialog}
                maxWidth="lg"
                fullWidth={true}>
                <div className="test-content-dialog">
                    <MyInput
                        label="Tìm Kiếm Câu Hỏi"
                        onChange={(value: string) => this.setState({ title: value })}
                        variant="outlined"
                        value={this.state.title}
                    />
                    <div className="select-type-question">
                        <MySelect
                            label="Loại câu hỏi"
                            items={QUESTION_TYPE}
                            value={this.state.loai.id}
                            onChange={this.onSelectQuestionType}
                        />
                    </div>
                    <MyAutocomplete
                        className="topic-question"
                        label="Chủ đề câu hỏi"
                        onChange={this.onChangeTopic}
                        value={this.state.topicId}
                        multiple
                        items={listTopic}
                        multiline={true}
                    />
                    <div className="btn-search">
                        <MyButton
                            label="Tìm Câu Hỏi"
                            color="primary"
                            onClick={() => this.onSearch()}
                            startIcon={<SearchIcon />}
                        />
                    </div>

                </div>
                <div>
                    {this.renderListQuestion()}
                </div>
            </MyDialog>
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        listTopic: state.data.listTopic,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    const actionsCreator = { showSnackbar };
    const action = bindActionCreators(actionsCreator, dispatch);
    return { ...action };
}
export default connect(mapStateToProps, mapDispatchToProps)(AppQuestionDialog);