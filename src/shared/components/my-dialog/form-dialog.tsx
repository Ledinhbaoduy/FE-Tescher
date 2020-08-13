import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ClassService from '../../../service/class.service';
import Author from '../../../service/authorized.service';
import { Typography } from '@material-ui/core';

export default function FormDialog(props: any) {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState(true);
  const [disabled, setEnable] = React.useState(false);
  const [text, setText] = React.useState('Mời');
  const [allowClose, setAllow] = React.useState(true);
  const [err_text, setErr] = React.useState('');
    const cService = new ClassService();
    const author = new Author();
    const checkEmail = () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.exec(email);
    }

  const submit = () => {
      const t_id = author.getUserInfo().user_info.id;
      const c_id = props.c_id;
      if(checkEmail()){
        setEnable(true);
        setText('Đang mời');
          cService.inviteStudent(email,t_id,c_id).subscribe(res => {
            setText('Mời')
            setEnable(false)
            setAllow(true);
            if(res.success){
              props.handleClose();
              setEmail('');
            }
            else{
              setError(false)
              setErr(res.data.message)
            }
            
            setText('Mời')
            setEnable(false)
            setAllow(true);
          })
      }
      else{
            setAllow(true);
            setErr('Email không hợp lệ')
            setError(false);
            
      }
  }
  const onFormClose = () =>{
    if(allowClose){
      props.handleClose()
      setEmail('')
    }
  }

  return (
    <div>
      <Dialog open={props.open} onClose={onFormClose} aria-labelledby="form-dialog-title">
  <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nhập địa chỉ email của sinh viên
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Địa chỉ email"
            type="email"
            fullWidth
            value={email}
            onChange={e => {setEmail(e.target.value); setError(true)}}
          />
          <Typography variant='body1' color='error' hidden={error}>{err_text}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Hủy bỏ
          </Button>
          <Button onClick={submit} disabled={disabled} color="primary">
            {text}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
