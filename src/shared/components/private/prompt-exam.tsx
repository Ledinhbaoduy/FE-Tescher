import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ClassService from '../../../service/class.service';

export default function AlertDialog(props: any) {
  const [dis, setDis] = useState(false);
  const [text, setText] = useState('Xóa');
    const agree = () => {
        props.removed();
    }
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {'Bạn có chắc chắn muốn xóa?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Hủy bỏ
          </Button>
          <Button onClick={agree} disabled={dis} color="primary" autoFocus>
            {text}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
