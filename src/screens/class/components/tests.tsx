import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {onLoading} from '../../../redux/actionCreator/actionCreator';
import AuthorService from '../../../service/authorized.service';
import ClassService from '../../../service/class.service';
import {TestService} from '../../../service/test.service';
import MyTable from '../../../shared/components/private/my-table-test';
import FullScreen from '../../../shared/components/private/fullscreen-test';
import { Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Prompt from '../../../shared/components/private/prompt-exam';

interface ITestProps{
    c_id: string;
    onLoading?:any;
}

class TestScreen extends Component<ITestProps,{res:any, isShow:boolean, isPShow: boolean, index:number, info:any}>{
    private author = new AuthorService();
    private cService = new ClassService();
    private tService = new TestService();
    constructor(props:ITestProps){
        super(props);
        this.state = {
            res: [],
            isShow: false,
            isPShow: false,
            index: -1,
            info: {
                title:'',
            }
        }
    }


    componentDidMount(){
        this.props.onLoading(true);
        const body = {
            title: '',
            gridSetting: {
                PageIndex: 0,
                PageSize: 10,
            }
        }
        this.tService.getAllTestsByTeacher(body).subscribe(res => {
            console.log(res);
            this.props.onLoading(false);
        })
    }

    componentDidUpdate(){

    }

    onClose = () => {
        this.setState({isShow: false});
    }
    onPClose = () => {
        this.setState({isPShow: false});
    }

    onAddToTable = (id:string, tieu_de: string) =>{
        this.setState({isShow:false})
        this.state.res.push({_id: id, tieu_de: tieu_de})
        this.setState({res: this.state.res})
        this.cService.addTestToClass(this.props.c_id, id).subscribe(res => {
            console.log(res);

        })
    }

    // viewTest = (id: any) => {
    //     this.props.onLoading(true);
    //     this.tService.getById(id).subscribe(res => {
    //         this.setState({
    //             info: {
    //                 title: res.tieu_de,
    //                 content: res.noi_dung,
    //             },
    //             infoShow: true,
    //         })
    //         this.props.onLoading(false);
    //     })
    // }

    getIndex = (index: number) => {
        this.setState({index: index});
    }

    removed = () => {
        this.props.onLoading(true);
        this.setState({isPShow: false})
        this.state.res.splice(this.state.index,1);
        this.setState({res: this.state.res});
        // this.cService.removeTestByIndex(this.props.c_id, this.state.index).subscribe(res => {
        //     this.props.onLoading(false);
        // })
    }

    render(){
        return(
            <div className="row justify-content-md-center">
            <div className="col col-md-2" >
            <FullScreen open={this.state.isShow} handleClose={this.onClose} onAddToTable={this.onAddToTable}/>
            <FullScreen open={this.state.isShow} handleClose={this.onClose} onAddToTable={this.onAddToTable}/>
            </div>
            <div className="col-md-auto">
                <Typography variant='h3'>BÀI THI/ BÀI KIỂM TRA</Typography>
                <table className="table">
                  <tr>
                      <td className='text-left'><Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => this.setState({isShow: true})}>Đăng bài thi/ bài kiểm tra</Button></td>
                      <td></td>
                      <td></td>
                  </tr>
              </table>
              <MyTable row={this.state.res} onPShow={()=>this.setState({isPShow: true})} getIndex={this.getIndex}/>
            </div>
            <div className="col col-lg-2" ></div>
            <Prompt open={this.state.isPShow} handleClose={this.onPClose} removed={this.removed} title={'Xóa bài thi'}/>
            {/* <InfoDialog open={this.state.infoShow} onClose={()=>this.setState({infoShow: false})} title={this.state.info.title} children={this.state.info.content}/> */}
            </div>
        )
    }
}

const mapStateToProps = (state:any) => {
    return {
        logged: state.data.logged,
        isLoading: state.data.isLoading,
    }
}
const mapDispatchToProps = (dispatch:any) => {
    const actionCreator = {onLoading}
    const action = bindActionCreators(actionCreator, dispatch);
    return {...action};
}

export default connect(mapStateToProps, mapDispatchToProps)(TestScreen);