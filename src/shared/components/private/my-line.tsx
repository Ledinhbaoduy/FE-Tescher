import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RemoveIcon from '@material-ui/icons/Remove';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
//import Promt from './my-dialog/promt';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Draggable from 'react-draggable';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}
function PaperComponent(props: PaperProps) {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }
export default function SimpleTable(props: any) {
  const classes = useStyles();
  // const [show, isShow] = useState(false);
  // const [index, setIndex] = useState('');
  // const [row, setRow] = useState([]);

  return (
      
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {props.row ? props.row.map((r:any,index:any) => (
            <TableRow key={r._id} hover>
              <TableCell align="left">

              <span><AssignmentIcon/></span><span style={{paddingLeft: '3%',fontSize:18}}>{r.tieu_de}</span>
                  </TableCell>
              <TableCell align="right" colSpan={3}>
              <Tooltip title={'Xem chi tiết'}><IconButton onClick={()=>{props.viewExam(r._id)}}><VisibilityIcon/></IconButton></Tooltip>
              <Tooltip title={'Sửa thông tin'}><IconButton onClick={()=>{props.editExam(r._id)}}><EditIcon/></IconButton></Tooltip>
              <Tooltip title={'Xóa khỏi lớp'}><IconButton onClick={()=>{props.onPShow(); props.getIndex(r._id)}} ><DeleteIcon/></IconButton></Tooltip >
                </TableCell>
            </TableRow>
          )) : 'Không có thông tin'}
        </TableBody>
      </Table>
    </TableContainer>
    
  );
}
