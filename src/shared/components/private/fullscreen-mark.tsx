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
import appService from '../../../service/app.service';
import { Icon, InputLabel, TextField } from '@material-ui/core';
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
}
interface FullState {
  open: boolean,
  sources: any,
  files: any,
  score: string,
  title: string,
  content: string,
  date: any,
  saveText: string,
  allowClose: boolean,
  disabled: boolean,
  show_alert: boolean
  error: string,
}
 class FullScreenDialog extends Component<FullProps, FullState> {
  
    private eService = new ExamService();
    private author = new AuthorService();
    private appService = new AppService();
    constructor(props: FullProps){
      super(props);
      this.state = {
        open: false,
        sources: [],
        files: [],
        title:'',
        score: '',
        content: this.props.editInfo ? this.props.editInfo.content : '',
        date: '',
        saveText: 'Lưu',
        allowClose: true,
        disabled: false,
        show_alert: false,
        error: '',
      }
    }

    componentDidMount(){

    }

    isValid = () => {
        if(this.state.title.length <=0 && this.props.editInfo.title.length <=0){
          this.setState({error: 'Thông tin tiêu đề không hợp lệ'})
          return false
        }
        if(this.state.content.length <=0 && this.props.editInfo.content.length <=0){
          this.setState({error: 'Thông tin nội dung không hợp lệ'})
          return false
        }
        if(this.state.score.length <=0 && this.props.editInfo.score.length <=0){
          this.setState({error: 'Thông tin điểm không hợp lệ'})
          return false
        }
        if(this.state.date === '' && this.props.editInfo.date.length <=0){
          this.setState({error: 'Thông tin thời gian không hợp lệ'})
          return false
        }
        if(new Date(this.state.date).getTime() <= new Date().getTime()){
          this.setState({error: 'Thông tin thời gian không hợp lệ'})
          return false
        }
        return true
    }

    onFileDialog = (file: ChangeEvent<HTMLInputElement>|any) => {
      
      this.state.files.push(file.target.files[0]);
      this.setState({files: this.state.files});
    }
    setStatus = (a:boolean, text:string, dis:boolean, alert?: boolean) => {
      this.setState({
        allowClose: a,
        saveText: text,
        disabled: dis,
        show_alert: alert || false,
      })
    }
    // handleSave = () => {
    //   this.setStatus(false, 'Đang Lưu', true)
    //   if(!this.isValid()) {this.setStatus(true, 'Lưu', false, true); return;}
    //   const tap_tin:any = [];
    //   //this.state.files.map((x:any) => tap_tin.push({fileName: x.name}));
    //   var body = {}
    //   if(this.props.mode === 'add'){
    //     body = {
    //       tieu_de: this.state.title,
    //       noi_dung: this.state.content,
    //       diem: this.state.score,
    //       lop_hoc_id: this.props.c_id,
    //       nguoi_tao_id: this.author.getIdUsers(),
    //       han_nop_bai: this.state.date,
    //       tap_tin: tap_tin,
    //     }
    //     this.eService.addEx(body).subscribe(res => {
    //       console.log(res);
    //       this.setStatus(true, 'Lưu', false, false)
    //       if(res.success){
    //         this.props.onRefreshTable()
    //         this.handleClose();
    //       }
    //       else{

    //       }
          
    //     })
    //   }
    //   else{
    //     body = {
    //       id: this.props.editInfo.id,
    //       tieu_de: this.state.title != '' ? this.state.title : this.props.editInfo.title,
    //       noi_dung: this.state.content != '' ? this.state.content: this.props.editInfo.content,
    //       diem: this.state.score != '' ? this.state.score : this.props.editInfo.score,
    //       han_nop_bai: this.state.date != ''? this.state.date : this.props.editInfo.date,
    //       tap_tin: tap_tin,
    //     }
    //     this.eService.updateEx(body).subscribe(res => {
    //       console.log(res);
    //       if(res.success){
    //         this.setStatus(true, 'Lưu', false,false)
    //         this.props.onRefreshTable()
    //         this.handleClose();
    //       }
    //     })
    //   }
    // }

    reset = () => {
      this.setState({
        title: '',
        content: '',
        date: '',
        score:'',
        saveText: 'Lưu'
      })
    }

    handleClose = () => {
      if(this.state.allowClose){
        this.props.handleClose();
        //this.props.onReset();
        this.reset();
      }
      
    }
    
  render(){
    const {classes} = this.props;
    
    return (
      <div>
        <Dialog maxWidth='xl' open={this.props.open} onClose={this.handleClose} TransitionComponent={Transition}>
          <AppBar style={{position: 'relative'}}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Xem Điểm
              </Typography>
              {/* <Button color="inherit" disabled={this.state.disabled} onClick={this.handleSave}>
                {this.state.saveText}
              </Button> */}
            </Toolbar>
            
          </AppBar>
          
          <BoxContainer>
              
              <MyTable row={this.props.res ? this.props.res : ''}/>
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