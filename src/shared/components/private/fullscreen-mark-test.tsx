import React, { useEffect, SyntheticEvent, FormEventHandler, FormEvent, ChangeEvent, Component, MouseEvent } from 'react';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {MyInput} from '../my-input/my-input';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import ExamService from '../../../service/private/exam.service';
import AuthorService from '../../../service/authorized.service';
import MarkService from '../../../service/private/mark.service';
import appService from '../../../service/app.service';
import { Icon, InputLabel, TextField, LinearProgress, Checkbox, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import BoxContainer from '../box-container/box-container';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { InputField } from '../../../models/common.model';
import AppService from '../../../service/app.service';
import Axios from 'axios';
import {API_FILE} from '../../../constants/api.constants';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { Alert } from '@material-ui/lab';
import MyTable from '../private/my-table-marks-list';
import MySelect from '../my-select';
import { Link } from 'react-router-dom';
import ClassService from '../../../service/class.service';
import MyCheckBox from '../my-checkbox/my-checkbox';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
interface FullProps{
  c_id?: string,
  open: boolean,
  handleClose: any,
  classes?:any,
  onRefreshTable?:any,
  editInfo?:any,
  res?:any,
  id?:string,
}
interface FullState {
  open: boolean,
  sources: any,
  files: any,
  students:any,
  score: string,
  title: string,
  content: string,
  date: any,
  saveText: string,
  allowClose: boolean,
  disabled: boolean,
  show_alert: boolean
  error: string,
  isLoading: boolean,
  text_message: string,
  questions:any,
}
 class FullScreenDialog extends Component<FullProps, FullState> {
  
    private eService = new ExamService();
    private cService = new ClassService();
    private author = new AuthorService();
    private mService = new MarkService();
    private appService = new AppService();
    constructor(props: FullProps){
      super(props);
      this.state = {
        open: false,
        sources: null,
        students: [],
        files: [],
        questions: [],
        title:'',
        score: '',
        content: this.props.editInfo ? this.props.editInfo.content : '',
        date: '',
        saveText: 'Chấm điểm',
        allowClose: true,
        disabled: false,
        show_alert: false,
        error: '',
        isLoading: false,
        text_message: '',
      }
    }

    componentDidMount(){
      this.getStudents();
    }

    // isValid = () => {
    //     if(this.state.title.length <=0 && this.props.editInfo.title.length <=0){
    //       this.setState({error: 'Thông tin tiêu đề không hợp lệ'})
    //       return false
    //     }
    //     if(this.state.content.length <=0 && this.props.editInfo.content.length <=0){
    //       this.setState({error: 'Thông tin nội dung không hợp lệ'})
    //       return false
    //     }
    //     if(this.state.score.length <=0 && this.props.editInfo.score.length <=0){
    //       this.setState({error: 'Thông tin điểm không hợp lệ'})
    //       return false
    //     }
    //     if(this.state.date === '' && this.props.editInfo.date.length <=0){
    //       this.setState({error: 'Thông tin thời gian không hợp lệ'})
    //       return false
    //     }
    //     if(new Date(this.state.date).getTime() <= new Date().getTime()){
    //       this.setState({error: 'Thông tin thời gian không hợp lệ'})
    //       return false
    //     }
    //     return true
    // }

    onFileDialog = (file: ChangeEvent<HTMLInputElement>|any) => {
      
      this.state.files.push(file.target.files[0]);
      this.setState({files: this.state.files});
    }

    addQuestion = (cau_hoi:any, dap_an:string, dung_sai:boolean, loai: string) => {
        const detail = {
          cau_hoi_id: cau_hoi._id,
          cau_tra_loi: dap_an,
          dung_sai: dung_sai,
          loai: loai,
        }
        this.state.questions.push(detail)
        //this.setState({questions: this.state.questions})
    }
    
    // setStatus = (a:boolean, text:string, dis:boolean, alert?: boolean) => {
    //   this.setState({
    //     allowClose: a,
    //     saveText: text,
    //     disabled: dis,
    //     show_alert: alert || false,
    //   })
    // }

    getStudents = () => {
        this.cService.getAllStudentsByClass(this.props.c_id).subscribe(res => {
          this.setState({students: res.ds_sinh_vien})
        })
    }

    // getEx = (s_id:any) => {
    //     this.mService.getExOfStudent(s_id, this.props.id).subscribe(res =>{
    //         console.log(res)
    //     })
    // }

    getTest = (s_id:any) => {
      this.setState({isLoading: true, sources: null})
        this.mService.getTestOfStudent(s_id, this.props.id).subscribe(res => {
            //console.log(res);
            this.setState({isLoading: false})
            if(res){
              if(res._id&&res.da_cham_diem){
                this.setState({disabled: true, sources: res})
              }
              else if(res._id){
                this.setState({sources: res})
              }
              else{
                this.setState({text_message: 'Không có thông tin'});
              }
            }
            
            if(!res){
              this.setState({text_message: 'Không có thông tin'});
            }
        })
    }

    reset = () => {
      this.setState({
        title: '',
        content: '',
        date: '',
        score:'',
        saveText: 'Chấm điểm',
        sources: '',
        disabled: false,
      })
    }

    handleClose = () => {
      if(this.state.allowClose){
        this.props.handleClose();
        this.reset();
      }
      
    }

    handleSave = () => {
      try{
        var count = this.state.questions.length/2;
        var avg = 10 / count;
        var mark = 0;
        const details = [];
        for (let index = 0; index < this.state.questions.length/2; index++) {
          const element = this.state.questions[index];
          element.dung_sai ? mark+=avg : mark+=0;
          details.push(element);
        }
        this.setState({ disabled: true, allowClose: false, saveText: 'Đang chấm', })
          const body = {
              diem: mark,
              sinh_vien_id: this.state.sources.sinh_vien_id._id,
              lop_hoc_id: this.props.c_id,
              ex_id: this.state.sources.bai_thi_id._id,
              loai: 'BaiThi',
              chi_tiet_bai_lam: details,
          }
          this.mService.addMark(body).subscribe(res => {
              console.log(res);
              this.setState({allowClose: true, saveText: 'Chấm điểm'})
          })
      }
      catch(err){
        throw err;
      }
      
    }

    mulQuestionRender = (sources:any, choosen: string, index:any):any => {
      var text_student_choosen = 'text-primary', text_normal = ''
      var dap_an = sources.dap_an ? sources.dap_an.value : ''
      var dap_an_label = sources.dap_an ? sources.dap_an.id === choosen : false
      this.addQuestion(sources, choosen, dap_an_label, 'TracNghiem');
      return ( <div><div className="card w-100 mt-3 bg-dark">
      <div className="card-header bg-primary text-white">
      <span className='font-weight-bold'>Câu số {(index+1)}: {sources.noi_dung}</span>
      </div>
      <ul className="list-group list-group-flush text-white">
        {sources.lua_chon ? sources.lua_chon.map((x:any) => 
        <li className='list-group-item bg-dark'><p className={(x.id === choosen ? text_student_choosen : text_normal)}>{x.label}. {x.value}</p></li>
        ) : ''}
        <li className='list-group-item bg-dark'><p>Đáp án chính xác là: <span className='text-success'>{dap_an}</span></p></li>
        <li className='list-group-item bg-dark'>
          <span>Kết quả câu này:<p className='text-danger'>{dap_an_label ? 'Đúng' : 'Sai'}</p></span>
        </li>
      </ul>
      
        
    </div>
    </div>
      )
    }

    essayQuestionRender = (sources: any, answer:string, index:any) => {
      this.addQuestion(sources, answer, false, 'TuLuan');
      return (<div> <div className="card w-100 mt-3">
        <div className="card-header bg-primary text-white">
          <span className='font-weight-bold'>Câu số {(index+1)}: {sources.noi_dung}</span>
          
        </div>
          <div className='card-body bg-dark text-white'>
            Câu trả lời của sinh viên: {answer}
              </div>
          <MyCheckBox label='Đánh dấu là câu đúng' onChange={(e: any)=>{
           this.state.questions[index].dung_sai = e.target.checked
             }}/>
        </div>
         </div>
              )
    }
    
  render(){
    const {classes} = this.props;
    
    return (
      <div>
        <Dialog fullScreen fullWidth open={this.props.open} onClose={this.handleClose} TransitionComponent={Transition}>
          <AppBar style={{position: 'relative'}}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Chấm điểm
              </Typography>
              {/* <Button color="inherit" disabled={this.state.disabled} onClick={this.handleSave}>
                {this.state.saveText}
              </Button> */}
            </Toolbar>
            
          </AppBar>
          {this.state.isLoading ? <LinearProgress /> : ''}
          
          <BoxContainer>
              <div className='row'>
                  <div className='col-2 text-light border-right border-muted'>
                  <br/>
                  {this.state.students ? this.state.students.map((x:any)=>{
                          return <div className='text-center p-1'><a className='btn btn-primary w-100' onClick={() => this.getTest(x._id)}>{x.ho + ' ' +x.ten}</a><br></br></div>
                      }): ''}
                  </div>
                  <div className='col-10'>
                    {this.state.sources 
                    ? 
                    <div>
                      {this.state.sources.da_cham_diem ? <i className='text-muted'>Đã chấm</i>: ''}
                      <div className='row'>
                      <div className='col-6'>
                      <Typography variant='h4'>Bài thi: {this.state.sources.bai_thi_id.tieu_de}</Typography>
                      </div>
                      <div className='col-6 text-right'>
                    <Button variant='contained' color='primary' disabled={this.state.disabled} onClick={this.handleSave}>{this.state.saveText}</Button>
                      </div>
                    </div>
                      
                      <Typography>của: {this.state.sources.sinh_vien_id.ho + ' '+this.state.sources.sinh_vien_id.ten}</Typography>
                      <i className='text-success'>Trắc nghiệm sẽ được chấm tự động</i>
                      <Typography variant='h6'>Bài làm chi tiết</Typography>
                      {this.state.sources.bai_thi_sinh_vien ? this.state.sources.bai_thi_sinh_vien.map((x:any, index:any) => 
                      {
                        return x.loai === 'TracNghiem' ? 
                        this.mulQuestionRender(x.cau_hoi_id, x.dap_an, index) : 
                        this.essayQuestionRender(x.cau_hoi_id, x.dap_an, index)
                      }) :'' }
                    </div>
                    : 
                    <p className='text-primary text-center'>{this.state.text_message}</p>
                    }
                  </div>
              </div>
          </BoxContainer>
        </Dialog>
      </div>
    );
  }  
}
const styles = (theme: Theme) => ({
    // root: {
    //   position: 'relative',
    // },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    input:{
      borderRadius: 5,
      '&:hover': {
        backgroundColor: '#E8E8E8',
      },
      '&:focus':{
        shrink: true,
      }
    }
  });
export default withStyles(styles)(FullScreenDialog);