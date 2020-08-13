import React, {Component, ChangeEvent} from 'react';
import AddIcon from '@material-ui/icons/Add';
import MyTable from '../../../shared/components/private/my-table-marktest';
import MySelect from '../../../shared/components/my-select';
import FullScreen from '../../../shared/components/private/fullscreen-mark-test';
import FullScreenExam from '../../../shared/components/private/fullscreen-mark-exam';
import {Dropdown} from '../../../models/common.model';
import { Typography, Button } from '@material-ui/core';
import ExamService  from '../../../service/private/exam.service';
import {TestService} from '../../../service/test.service';
import Authorized from '../../../service/authorized.service';
import { connect } from 'react-redux';
import { onLoading } from '../../../redux/actionCreator/actionCreator';
import { bindActionCreators } from 'redux';

const MarkItems : Dropdown[] = [ 
    {
        id: '0',
        value: 'Bài tập'
    },
    {
        id: '1',
        value: 'Bài thi/kiểm tra'
    }
]

interface IMarkProps{
    onLoading?:any;
    c_id?:any;
}

interface IMarkState{
    res: any,
    value: number,
    isPShow: boolean,
    isShow: boolean,
    id: any,
}
class MarkScreen extends Component<IMarkProps,IMarkState>{
    private eService = new ExamService();
    private tService = new TestService();
    private author = new Authorized();
    constructor(props:IMarkProps){
        super(props)
        this.state = {
            res:[],
            value: 0,
            isPShow: false,
            isShow: false,
            id: '',
        }
        this.onPShow = this.onPShow.bind(this);
    }

    componentDidMount(){
        this.selectedChange('0');
        //this.setState({value: 0})
        document.title = 'Chấm điểm'
    }

    selectedChange = (e:string) => {
        this.setState({value: Number.parseInt(e)})
        switch(e){
            case '0':
                this.showExams();
                break;
            case '1':
                this.showTests();
                break;
            default:
                
                break;
        }
    }

    showExams = () => {
        this.props.onLoading(true)
        this.eService.getExInClassroom(this.props.c_id).subscribe(res => {
            if(res){
                this.setState({res: res})
                console.log(res);
            }
            this.props.onLoading(false)
        })
    }

    showTests = () => {
        this.props.onLoading(true);
        this.tService.getTestInClassroom(this.props.c_id).subscribe(res => {
            if(res){
                this.setState({res: res})
            }
            this.props.onLoading(false);
        })
    }

    onPShow = (id:any) => {
        switch(this.state.value){
            case 0:
                this.setState({isShow: true, id: id})
                break;
            default:
                this.setState({isPShow: true, id: id});
                break;
        }
        //alert(id);

    }
    onPClose = () => {
        this.setState({isPShow: false})
    }
    onClose = () => {
        this.setState({isShow: false})
    }

    render(){
        return(
        <div className="row justify-content-md-center">
            <div className="col" >
            <FullScreen open={this.state.isPShow} handleClose={this.onPClose} c_id={this.props.c_id} id={this.state.id}/>
            <FullScreenExam open={this.state.isShow} handleClose={this.onClose} c_id={this.props.c_id} id={this.state.id}/>
            </div>
            
            <div className="col-8">
                <Typography className='text-center' variant='h3'>CHẤM ĐIỂM</Typography>
                <table className="table">
                  <tr>
                      <td></td>
                      <td>
                      <MySelect items={MarkItems} label='Chọn loại' 
                          onChange={this.selectedChange}
                          value={this.state.value}
                          />
                      </td>
                      <td>
                      </td>
                  </tr>
              </table>
              <MyTable row={this.state.res} onPShow={this.onPShow} />
            </div>
            <div className="col" ></div>
            {/* <Prompt open={this.state.isPShow} handleClose={this.onPClose} removed={this.removed} title={'Xóa bài thi'}/> */}
            {/* <InfoDialog open={this.state.infoShow} 
            onClose={()=>this.setState({infoShow: false})} 
            title={this.state.info.title} 
            children={this.state.info.content}/> */}
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
    return {...action}

}

export default connect(mapStateToProps, mapDispatchToProps)(MarkScreen);