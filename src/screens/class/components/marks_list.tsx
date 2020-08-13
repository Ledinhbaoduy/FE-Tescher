import React, {Component, ChangeEvent} from 'react';
import AddIcon from '@material-ui/icons/Add';
import MyTable from '../../../shared/components/private/my-table-mark';
import MySelect from '../../../shared/components/my-select';
import {Dropdown} from '../../../models/common.model';
import { Typography, Button } from '@material-ui/core';
import ExamService  from '../../../service/private/exam.service';
import {TestService} from '../../../service/test.service';
import ClassService from '../../../service/class.service';
import MarkService from '../../../service/private/mark.service';
import Authorized from '../../../service/authorized.service';
import { connect } from 'react-redux';
import { onLoading } from '../../../redux/actionCreator/actionCreator';
import { bindActionCreators } from 'redux';
import FullScreen from '../../../shared/components/private/fullscreen-mark';
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
    students: any,
    mark:any,
    value: number,
    isPShow: boolean,
    info: any,
}
class MarkListScreen extends Component<IMarkProps,IMarkState>{
    private eService = new ExamService();
    private tService = new TestService();
    private cService = new ClassService();
    private mService = new MarkService();
    private author = new Authorized();
    constructor(props:IMarkProps){
        super(props)
        this.state = {
            res:[],
            students: [],
            mark: [],
            value: 0,
            isPShow: false,
            info:[],
        }
        this.onPShow = this.onPShow.bind(this);
    }

    componentDidMount(){
        this.selectedChange('0');
        //this.setState({value: 0})
        this.showStudents();
        document.title= 'Điểm';

    }

    showStudents = () => {
        this.props.onLoading(true);
        this.cService.getAllStudentsByClass(this.props.c_id).subscribe(res => {
            if(res){
                console.log(res)
                this.setState({students: res.ds_sinh_vien})
            }
            this.props.onLoading(false);
        })
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
                //console.log(res);
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

    onClose = () =>{
        this.setState({isPShow: false});
    }
    onPShow = (ex_id:any) => {
        switch(this.state.value){
            case 0:
                this.mService.getExamMarkInClass(this.props.c_id, ex_id).subscribe(res => {
                    console.log(res);
                    this.setState({info: res, isPShow: true})
                })
            break;
            default:
                this.mService.getTestMarkInClass(this.props.c_id, ex_id).subscribe(res => {
                    console.log(res);
                    this.setState({info: res, isPShow: true})
                })
            break;
        }
        
    }  

    render(){
        return(
        <div className="row justify-content-md-center">
            <div className="col" >
            <FullScreen res={this.state.info} open={this.state.isPShow} handleClose={this.onClose}/>
            </div>
            <div className="col-8 fixed">
                <Typography className='text-center' variant='h3'>BẢNG ĐIỂM</Typography>
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

export default connect(mapStateToProps, mapDispatchToProps)(MarkListScreen);