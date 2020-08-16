import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { onLoading } from '../../../redux/actionCreator/actionCreator';
import AuthorService from '../../../service/authorized.service';
import ClassService from '../../../service/class.service';
import ExamService from '../../../service/private/exam.service';
import history from '../../../navigation/App.history';
import MyCard from '../../../shared/components/private/my-card';
import MyTable from '../../../shared/components/private/my-line';
import FullScreen from '../../../shared/components/private/fullscreen';
import { Typography, Button, Divider } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Prompt from '../../../shared/components/private/prompt-exam';
import InfoDialog from '../../../shared/components/my-dialog/my-dialog';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { RaceSubscriber } from 'rxjs/internal/observable/race';

interface IExamProps {
    c_id: string;
    onLoading?: any;
}

interface IExamState {
    res: any,
    isShow: boolean,
    isPShow: boolean,
    infoShow: boolean,
    editShow: boolean,
    e_id: string,
    info: any,
    isChanged: boolean
}

class ExamScreen extends Component<IExamProps, IExamState>{
    private author = new AuthorService();
    private cService = new ClassService();
    private eService = new ExamService();

    constructor(props: IExamProps) {
        super(props);
        this.state = {
            res: [],
            isShow: false,
            isPShow: false,
            infoShow: false,
            editShow: false,
            e_id: '',
            info: {
                title: '',
                content: '',
                score: '',
                date: '',
            },
            isChanged: false,
        }
        this.onRefreshTable = this.onRefreshTable.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.removed = this.removed.bind(this);
        this.viewExam = this.viewExam.bind(this);
    }
    componentDidMount() {
        document.title= 'Bài Tập'
        this.props.onLoading(true);
        this.eService.getExInClassroom(this.props.c_id).subscribe(res => {
            this.setState({ res: res });
            this.props.onLoading(false);
        })
    }

    componentDidUpdate() {

    }

    onClose = () => {
        this.setState({ isShow: false });
    }

    onPClose = () => {
        this.setState({ isPShow: false, e_id: '' });
    }

    onEditClose = () => {
        this.setState({ editShow: false })
    }

    onInfoClose = () => {
        this.reset();
        this.setState({ infoShow: false });
    }

    onRefreshTable = () => {
        this.props.onLoading(true)
        this.eService.getExInClassroom(this.props.c_id).subscribe(res => {
            this.setState({ res: res })
            this.props.onLoading(false)
        })
    }

    viewExam = (id: any) => {
        this.props.onLoading(true);
        this.eService.getById(id).subscribe(res => {
            const diem = res.diem
            const files = res.tap_tin.length > 0 ? res.tap_tin.map((x: any) => <div><Button variant='outlined' startIcon={<InsertDriveFileIcon />}>
                <a href={`https://anstudying.herokuapp.com/api/file/file/${x.fileName}`} target='_blank'>{x.originName}</a></Button></div>) : 'Không có tệp đính kèm'
            const noi_dung = res.noi_dung ? res.noi_dung.split('\\n')
                .map((x: any) => <div>{x}<br></br></div>) : ''
            this.setState({
                info: {
                    title: res.tieu_de,
                    content: <div>Điểm: {diem}<br></br>{noi_dung}<br></br>Tệp đính kèm<Divider />{files}</div>,
                },
                infoShow: true,
            })
            this.props.onLoading(false);
            console.log(res);
        })
    }

    editExam = (id: any) => {
        this.props.onLoading(true)
        this.eService.getById(id).subscribe(res => {
            this.setState({
                info: {
                    id: res._id,
                    title: res.tieu_de,
                    content: res.noi_dung,
                    score: res.diem,
                    date: new Date(res.han_nop_bai).toJSON().split('.')[0],
                },
                editShow: true,
            })
            this.props.onLoading(false)
        })
    }

    getIndex = (id: string) => {
        this.setState({ e_id: id });
    }

    removed = () => {
        this.props.onLoading(true);
        this.setState({ isPShow: false })
        this.setState({ res: this.state.res });
        this.eService.softDeleteEx(this.state.e_id).subscribe(res => {
            this.props.onLoading(false);
            this.onRefreshTable();
        })
    }
    reset = () => {
        this.setState({
            info: {
                title: '',
                content: '',
                score: '',
                date: '',
            }
        })
    }

    render() {
        return (
            <div className="row justify-content-lg-center">
                <div className="col col-sm-2" >
                    <FullScreen typeName='Tạo bài tập' onReset={this.reset} mode='add' editInfo={this.state.info} c_id={this.props.c_id} open={this.state.isShow} handleClose={this.onClose} onRefreshTable={this.onRefreshTable} />
                    <FullScreen typeName='Sửa bài tập' onReset={this.reset} mode='edit' editInfo={this.state.info} open={this.state.editShow} handleClose={this.onEditClose} onRefreshTable={this.onRefreshTable} />
                </div>
                <div className="col col-lg-sm">
                    <Typography variant='h3'>BÀI TẬP</Typography>
                    <table className="table">
                        <tr>
                            <td className='text-left'>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    startIcon={<AddIcon />}
                                    onClick={() => this.setState({ isShow: true })}>Thêm bài tập
                                    </Button>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                    <MyTable row={this.state.res} editExam={this.editExam} viewExam={this.viewExam} onPShow={() => this.setState({ isPShow: true })} getIndex={this.getIndex} />
                </div>
                <div className="col col-lg-2" ></div>
                <Prompt open={this.state.isPShow} handleClose={this.onPClose} removed={this.removed} title={'Xóa bài tập'} />
                <InfoDialog fullWidth open={this.state.infoShow} onClose={this.onInfoClose} title={this.state.info.title} children={this.state.info.content} />
            </div>
        )
    }
}


const mapStateToProps = (state: any) => {
    return {
        logged: state.data.logged,
        isLoading: state.data.isLoading,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    const actionCreator = { onLoading }
    const action = bindActionCreators(actionCreator, dispatch);
    return { ...action }
}
export default connect(mapStateToProps, mapDispatchToProps)(ExamScreen);