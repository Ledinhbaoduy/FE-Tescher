import React, { Component } from 'react'
import BoxContainer from '../../shared/components/box-container/box-container'
import MyTableComponent from '../../shared/components/my-table';
import { GridSetting, Dropdown, VARIANT_TYPE } from '../../models/common.model';
import { TableConfig } from '../../models/table-model';
import { MODE } from '../../constants/common.constants';
import MyButton from '../../shared/components/my-button/my-button';
import { MyInput } from '../../shared/components/my-input/my-input';
import './manage-test.scss';
import history from '../../navigation/App.history';
import { APP_ROUTER } from '../../constants/router.constants';
import MyTooltipComponent from '../../shared/components/my-tooltip';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchIcon from '@material-ui/icons/Search';
import { showSnackbar } from '../../redux/actionCreator/actionCreator';
import AuthorizedService from '../../service/authorized.service';
import { TestService } from '../../service/test.service';
import { Skeleton } from '@material-ui/lab';
import { Observable } from 'rxjs';
import { MESSAGE_COMMON } from '../../constants/message.constants';

interface IManageTestState {
    openDialog: boolean;
    tableConfig: TableConfig;
    topic: Dropdown[];
    title: string;
    gridSetting: GridSetting;
    isLoading: boolean;

}
class ManageTestScreen extends Component<{ listTopic: any, showSnackbar: any, onDisabled?: boolean }, IManageTestState>{
    private testService = new TestService();
    private authorService = new AuthorizedService();
    constructor(props: any) {
        super(props)
        this.state = {
            isLoading: false,
            gridSetting: new GridSetting(),
            topic: [],
            openDialog: false,
            title: "",
            tableConfig: {
                titles: ['title', 'classroom', 'date', 'time', 'createdBy',],
                columns: [
                    { value: 'title', title: 'Tiêu đề' },
                    { value: 'classroom', title: 'Lớp' },
                    { value: 'date', title: 'Ngày Thi' },
                    { value: 'time', title: 'Thời Gian Thi' },
                    { value: 'createdBy', title: 'Người Tạo' },

                ],
                data: [],
            },

        }
    }
    componentDidMount() {
        document.title = 'Quản Lý Bài Thi'
        this.onSearch();
    }

    onSearch = () => {
        this.setState({ isLoading: true })
        const search = this.testService.getAllTestsByTeacher(this.state);
        search.subscribe((res: any) => {
            this.setState({ isLoading: false })
            const data = res.data.map((s: any) => ({ ...s, id: s._id }));
            this.setState({
                tableConfig: {
                    ...this.state.tableConfig,
                    data: data,
                    total: res.count
                }
            })
        })
    }

    onDelete = (id: string) => {
        const onItemDeleteTest: Observable<any> = this.testService.deleteTest({ id });
        onItemDeleteTest.subscribe(res => {
            if (res && res.success) {
                this.props.showSnackbar({
                    message: MESSAGE_COMMON.SUCCESS_DELETE,
                    variant: VARIANT_TYPE.SUCCESS,
                    open: true,
                })
                this.onSearch()
            }
            else {
                this.props.showSnackbar({
                    message: MESSAGE_COMMON.ERROR_DELETE,
                    variant: VARIANT_TYPE.ERROR,
                    open: true,
                })
            }
        })
    }

    onEdit = (id: string) => {
        if (id) {
            history.push({
                pathname: APP_ROUTER.TEST_DETAIL,
                search: MODE.EDIT + id,
                state: { id: id, mode: MODE.EDIT }
            });
        }
    }

    onSortData = (gridSetting: GridSetting) => {

    }


    onChangeTopic = (ids: Dropdown[]) => {
        let data = this.props.listTopic.filter((s: Dropdown) => ids.includes(s.id));
        this.setState({ topic: data });

    }

    onClickCreate = () => {
        history.push({
            pathname: APP_ROUTER.TEST_DETAIL,
            search: MODE.ADD,
            state: { mode: MODE.ADD }
        })
    }

    lineLoad = () => {
        const tmp = '1 2 3 4 5 6 7 8 9';
        return (
            tmp.split(' ').map((x: any) => <Skeleton height={45} />)
        )
    }

    render() {
        // const listTopic = this.props.listTopic || []
        return (
            <BoxContainer header="Bài Kiểm Tra/ Bài Thi" >
                <div className='managetest-container'>
                    <MyTooltipComponent title="Thêm Bài Thi" onClick={this.onClickCreate} />
                    <div className="search-filter">
                        <MyInput
                            variant="outlined"
                            label='Tìm Bải Thi...'
                            value={this.state.title}
                            onChange={(value: string) => this.setState({ title: value })} />
                    </div>
                    {/* <MyAutocomplete
                        className="topic-test"
                        label="chủ đề"
                        onChange={this.onChangeTopic}
                        value={this.state.topic}
                        multiple
                        items={listTopic}
                        multiline={true}
                    /> */}
                    <MyButton className="search-test" label="Tìm kiếm" onClick={this.onSearch} startIcon={<SearchIcon />} />

                </div>
                {
                    this.state.isLoading
                        ? this.lineLoad() :
                        <MyTableComponent
                            gridSetting={this.state.gridSetting}
                            isShowDeleteIcon={true}
                            isShowEditIcon={true}
                            tableConfig={this.state.tableConfig}
                            sort={this.onSortData}
                            delete={this.onDelete}
                            edit={this.onEdit}
                        />
                }

            </BoxContainer>
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        logged: state.data.logged,
        listTopic: state.data.listTopic
    }
}

const mapDispatchToProps = (dispatch: any) => {
    const actionCreator = { showSnackbar };
    const action = bindActionCreators(actionCreator, dispatch);
    return { ...action };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTestScreen);