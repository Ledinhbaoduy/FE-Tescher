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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
  const [show, isShow] = useState(false);
  const [index, setIndex] = useState('');
  const [row, setRow] = useState([]);

  return (
      
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
        <TableRow>
              <TableCell align="left">
                <span style={{fontSize:18}}>Sinh viên</span>
                  </TableCell>
              <TableCell align="right" colSpan={3}>
              <span style={{fontSize:18}}>Điểm</span>
                </TableCell>
            </TableRow>
          {props.row && props.row.length !==0 ? props.row.map((r:any) => (
            <TableRow key={r._id} hover>
              <TableCell align="left">
              <span><AccountCircleIcon/></span>
              <span 
              style={{paddingLeft: '3%',fontSize:18}}>
                {r.sinh_vien}
              </span>
                  </TableCell>
              <TableCell align="right" colSpan={3}>
                  <span style={{fontSize:15, fontWeight:'bold'}}>{r.diem}</span>
                </TableCell>
            </TableRow>
          )):'Không có thông tin'}
        </TableBody>
      </Table>
      
    </TableContainer>
    
  );
}
