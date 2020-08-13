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
import { Icon, InputLabel, TextField, LinearProgress } from '@material-ui/core';
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
  //files: any,
  students:any,
  score: string,
  //title: string,
  content: string,
  date: any,
  saveText: string,
  allowClose: boolean,
  error: boolean,
  isLoading: boolean,
  text_message: string,
  error_text: string,
  isMark: boolean,
  disabled: boolean,
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
        sources: '',
        students: [],
        isMark: false,
        //files: [],
        //title:'',
        score: '',
        content: this.props.editInfo ? this.props.editInfo.content : '',
        date: '',
        saveText: 'Chấm điểm',
        allowClose: true,
        error: false,
        isLoading: false,
        text_message: '',
        error_text: '',
        disabled: false,
      }
    }

    componentDidMount(){
        this.getStudents();
    }

    isValid = () => {
        var value = Number.parseInt(this.state.score)
        if(Number.isSafeInteger(value) && value >=0 && value <=10){
            return true
        }
        return false;
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
            console.log(res);
          this.setState({students: res.ds_sinh_vien})
        })
    }

    getEx = (s_id:any) => {
        this.setState({isLoading: true})
        this.mService.getExOfStudent(s_id, this.props.id).subscribe(res =>{
            console.log(res)
            this.setState({sources: res, isLoading: false});
            if(res && res.da_cham_diem){
              this.setState({disabled: true})
            }
            if(!res){
              
                this.setState({text_message: 'Không có thông tin'})
            }
            //console.log(this.state.sources);
        })
    }

    handleSave = () => {
      this.setState({allowClose: false, saveText: 'Đang chấm', })
        if(!this.isValid()){
            this.setState({error: true, error_text: 'Điểm không hợp lệ', allowClose: true, saveText: 'Chấm điểm'})
        }
        else{
            const body = {
                diem: parseFloat(this.state.score),
                sinh_vien_id: this.state.sources.sinh_vien_id._id,
                lop_hoc_id: this.props.c_id,
                ex_id: this.state.sources.bai_tap_id._id,
                loai: 'BaiTap',
                chi_tiet_bai_lam: null,
            }
            this.mService.addMark(body).subscribe(res => {
                console.log(res);
                this.getEx(this.state.sources.sinh_vien_id._id)
            })
            //this.setState({error_text: '', error: false})
            this.reset();
        }
        //console.log(this.isValid())
    }

    reset = () => {
      this.setState({
        //title: '',
        content: '',
        date: '',
        score:'',
        saveText: 'Chấm điểm',
        text_message: '',
        sources: '',
        error: false,
        error_text: '',
        disabled: false,
      })
    }

    handleClose = () => {
      if(this.state.allowClose){
        this.props.handleClose();
        this.reset();
      }
    }

    InputChange = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        //console.log(e);
        //let value = Number.parseInt(e.target.value);
        console.log(e);
        this.setState({score: e.target.value})
        //console.log(Number.isSafeInteger(value));
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
                  <div className='col-2 text-light border-right border-primary'>
                      {this.state.students ? this.state.students.map((x:any)=>{
                          return <div className='text-center p-1'><a className='btn btn-primary w-100' onClick={()=> this.getEx(x._id)}>{x.ho + ' ' +x.ten}</a><br></br>
                          </div>
                      }): ''}
                  </div>
                  <div className='col-10'>
                    {/* <Typography variant='h3'>Bài làm của sinh viên</Typography> */}
                    {this.state.sources ? <div>
                      {this.state.sources.da_cham_diem ? <i className='text-muted'>Đã chấm</i>: ''}    
                        <div className='row'>
                            <div className='col-6'>
                            <Typography variant='h4'>Tên bài tập: {this.state.sources.bai_tap_id.tieu_de}</Typography>
                            <Typography>của: {this.state.sources.sinh_vien_id.ho+ ' '+ this.state.sources.sinh_vien_id.ten}</Typography>
                                {
                                  !this.state.sources.da_cham_diem 
                                  ? 
                                  <TextField error={this.state.error} 
                                  helperText={this.state.error_text} 
                                  label='Điểm' value={this.state.score} 
                                  onChange={this.InputChange}/>
                                  : ''
                                }
                                
                                </div>
                            <div className='col-6 text-right'>
                                <Button disabled={this.state.disabled} variant='contained' color='primary' onClick={this.handleSave}>{this.state.saveText}</Button>
                                </div>
                        </div>
                        <br></br>
                        <p>{this.state.sources.bai_tap_id.noi_dung}</p>
                        
                    </div> : <p className='text-center text-primary'>{this.state.text_message}</p>}
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