import React, { useEffect, SyntheticEvent, FormEventHandler, FormEvent, ChangeEvent, Component, MouseEvent } from 'react';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {MyInput} from '../../shared/components/my-input/my-input';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { Icon, InputLabel, TextField } from '@material-ui/core';
import AttachmentIcon from '@material-ui/icons/Attachment';
import AuthorService from '../../service/authorized.service';
import ClassService from '../../service/class.service';
import Axios from 'axios';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { Alert } from '@material-ui/lab';
import BoxContainer from '../../shared/components/box-container/box-container';



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
  typeName: string,
  title?:string,
}
interface FullState {
    saveText: string,
    disabled: boolean,
    title: string,
    msg: string,
    show_error: boolean,
    allowClose: boolean,
}
 class FullScreenDialog extends Component<FullProps, FullState> {
    private cService = new ClassService();
    private author = new AuthorService();
    constructor(props: FullProps){
      super(props);
      this.state = {
        saveText: 'Lưu',
        disabled: false,
        title: '',
        msg: '',
        show_error: false,
        allowClose: true,
      }
    }

    componentDidMount(){

    }

    createClass = () => {
        // this.cService.addClassroom().subscribe(res => {
        //     console.log(res);
        // })
    }

    isValid = () => {
        if(this.state.title.length <=0)
            return false
        return true
    }

    setMState = (saveText:string, dis:boolean, a:boolean, msg: string, aClose:boolean) => {
        this.setState({
            saveText: saveText,
            disabled:dis,
            show_error: a,
            msg: msg,
            allowClose: aClose
        })
    }
   
    handleSave = () => {
        this.setMState('Đang lưu', true, false, '', false)
        if(!this.isValid()) {this.setMState('Lưu',false, true, 'Vui lòng nhập đầy đủ thông tin', true); return;}
        const body = {
            tieu_de: this.state.title,
            nguoi_tao_id: this.author.getIdUsers(),
        }
        this.cService.addClassroom(body).subscribe(res => {
            console.log(res);
            this.props.onRefreshTable();
            this.setMState('Lưu',false,false,'',true)
            this.handleClose();
        })
    }

    reset = () => {
        this.setState({title: '', saveText: 'Lưu'})
    }

    handleClose = () => {
        if(this.state.allowClose){
            this.reset();
            this.props.handleClose();
        }
    }
    
  render(){
    const {classes} = this.props;
    
    return (
      <div>
        <Dialog maxWidth='md' open={this.props.open} onClose={this.handleClose} TransitionComponent={Transition}>
          <AppBar style={{position: 'relative'}}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {this.props.typeName}
              </Typography>
              <Button color="inherit" disabled={this.state.disabled} onClick={this.handleSave}>
                {this.state.saveText}
              </Button>
            </Toolbar>
          </AppBar>
          <BoxContainer>
            <Alert hidden={!this.state.show_error} variant='standard' severity='error'>{this.state.msg}</Alert>
          <MyInput
          label='Tên lớp học'
          onChange={(e:string)=>{this.setState({title: e}); this.setMState('Lưu', false,false, '', true)}}
          fullWidth 
           />
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