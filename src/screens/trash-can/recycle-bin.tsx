import React, { Component } from 'react';
import BoxContainer from '../../shared/components/box-container/box-container';
import { MyInput } from '../../shared/components/my-input/my-input';
import { Dropdown, GridSetting, VARIANT_TYPE } from '../../models/common.model';
import { TableConfig } from '../../models/table-model';
import { MODE } from '../../constants/common.constants';
import { connect } from 'react-redux';
import history from '../../navigation/App.history';
import { APP_ROUTER } from '../../constants/router.constants';
import MyButton from '../../shared/components/my-button/my-button';
import SearchIcon from '@material-ui/icons/Search';
import { bindActionCreators } from 'redux';
import MySelect from '../../shared/components/my-select';
import './recycle-bin.scss';
import MyTable from '../../shared/components/my-table';
import { recycleBinService } from '../../service/recyclebin.service';
import ConfirmDialog from '../../shared/components/confirm-dialog/confirm-dialog';
import { showSnackbar } from '../../redux/actionCreator/actionCreator';
import { Skeleton } from '@material-ui/lab';

const data: Dropdown[] = [
    {
        id: "1",
        value: "Bài Thi"
    },
    {
        id: "2",
        value: "Bài Tập"
    },
]

interface IManageTestState {
    mode: string;
    tableConfig: TableConfig;
    type: Dropdown;
    title: string;
    topic: Dropdown[];
    gridSetting: GridSetting;
    openConfirmDialog: boolean;
    itemId: string;
    isLoading: boolean;
}

class recycleBinScreen extends Component<{ listTopic: any, listClass: any, showSnackbar: any }, IManageTestState>{
    recycleBinService = new recycleBinService();

    constructor(props: any) {
        super(props)
        this.state = {
            topic: [],
            openConfirmDialog: false,
            title: "",
            mode: MODE.ADD,
            tableConfig: {
                titles: ['title', 'createdBy', 'classroom'],
                columns: [
                    { value: 'title', title: 'Tiêu đề' },
                    { value: 'createdBy', title: "Người Tạo" },
                    { value: 'classroom', title: 'Lớp' },
                ],
                data: [],
            },
            type: {
                id: "1",
                value: ""
            },
            gridSetting: new GridSetting(),
            itemId: '',
            isLoading: false,
        }
    }
    componentDidMount = () => {
        document.title = 'Thùng rác';
        this.onSearch();
    }
    onSelecttrashType = (id: string) => {
        const trashType = data.find(s => s.id === id)!;
        this.setState({ type: trashType });
    }

    onSortData = (gridSetting: GridSetting) => {

    }

    onSearch = () => {
        const type = this.state.type.id === "1";
        const search = type ? this.recycleBinService.getRecycleBinTest(this.state) :
            this.recycleBinService.getRecycleBinExcer(this.state);
        search.subscribe(res => {
            console.log(res);
            this.setState({
                tableConfig: {
                    ...this.state.tableConfig,
                    data: res.data,
                    total: res.count
                }
            });

        })

    }

    onClickCreate = () => {
        history.push({
            pathname: APP_ROUTER.TEST_DETAIL,
            search: MODE.ADD,
        })
    }

    lineLoad = () => {
        const tmp = '1 2 3 4 5 6 7 8 9';
        return (
            tmp.split(' ').map((x: any) => <Skeleton height={45} />)
        )
    }

    onChangeTopic = (ids: Dropdown[]) => {
        let data = this.props.listTopic.filter((s: Dropdown) => ids.includes(s.id));
        this.setState({ topic: data });

    }

    onRestore = () => {
        const id = this.state.itemId
        if (id) {
            const type = this.state.type.id === '1';
            const restore = type ?
                this.recycleBinService.recycleBinRestoreTest({ id })
                : this.recycleBinService.recycleBinRestoreExcer({ id });
            restore.subscribe(res => {
                if (res && res.success) {
                    this.toggleConfirmDialog('');
                    this.onSearch();
                    this.props.showSnackbar({
                        message: "Khôi Phục Thành Công",
                        variant: VARIANT_TYPE.SUCCESS,
                        open: true,
                    })
                }
                else {
                    this.props.showSnackbar({
                        message: "Khôi Phục Thất Bại",
                        variant: VARIANT_TYPE.ERROR,
                        open: true,
                    })
                }
            });
        }
    }

    onDelete = (id: string) => {
        if (id) {
            const type = this.state.type.id === '1';
            const restore = type ?
                this.recycleBinService.recycleBinDeleteTest({ id })
                : this.recycleBinService.recycleBinDeleteExcer({ id });
            restore.subscribe(res => {
                if (res && res.success) {
                    this.props.showSnackbar({
                        message: res.message,
                        variant: VARIANT_TYPE.SUCCESS,
                        open: true,
                    })
                    this.onSearch();
                }
                else {
                    this.props.showSnackbar({
                        message: res.message,
                        variant: VARIANT_TYPE.ERROR,
                        open: true,
                    })
                }
            });
        }
    }

    toggleConfirmDialog = (id: string) => {
        this.setState({
            openConfirmDialog: !this.state.openConfirmDialog,
            itemId: id,
        });
    }

    render() {
        return (
            <BoxContainer header="Thùng Rác" >
                <div className='trashCan-container'>
                    <div className="search-filter">
                        <MyInput
                            variant="outlined"
                            label='Tìm Kiếm...'
                            value={this.state.title}
                            onChange={(value: string) => this.setState({ title: value })} />
                    </div>
                    <div className='trash-option'>
                        <MySelect
                            label="Lựa Chọn"
                            items={data}
                            value={this.state.type.id}
                            onChange={this.onSelecttrashType}
                        />
                    </div>
                    <MyButton className="btn-search-trash" label="Tìm kiếm" onClick={() => this.onSearch()} startIcon={<SearchIcon />} />
                </div>
                {this.state.isLoading
                    ? this.lineLoad() :
                    < MyTable
                        gridSetting={this.state.gridSetting}
                        isShowRestoreIcon={true}
                        isShowDeleteIcon={true}
                        tableConfig={this.state.tableConfig}
                        sort={this.onSortData}
                        restore={this.toggleConfirmDialog}
                        delete={this.onDelete}
                    />}

                {this.state.openConfirmDialog ?
                    <ConfirmDialog
                        content="Bạn Có Muốn Khôi Phục Không ?"
                        onSubmit={this.onRestore}
                        onClose={(e: any) => this.toggleConfirmDialog('')}
                        title="Xác Nhận Khôi Phục"
                        openDialog={this.state.openConfirmDialog}
                    /> : null}

            </BoxContainer>
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        isLoading: state.data.isLoading,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    const actionsCreator = { showSnackbar };
    const action = bindActionCreators(actionsCreator, dispatch);
    return { ...action };
}
export default connect(mapStateToProps, mapDispatchToProps)(recycleBinScreen);
