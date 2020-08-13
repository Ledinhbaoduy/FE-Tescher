import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RemoveIcon from '@material-ui/icons/Remove';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Promt from './my-dialog/promt';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

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
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function SimpleTable(props: any) {
  const classes = useStyles();
  const [show, isShow] = useState(false);
  const [index, setIndex] = useState('');
  const [row, setRow] = useState([]);
const remove = (id: string)=>{
    props.callOpen(id);
}
  return (
      
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        
        <TableBody>
          {props.row ? props.row.map((r:any) => (
            <TableRow key={r._id} hover>
              <TableCell align="left">
              <span><img src={r.anh_dai_dien} 
                    width='40' height='40' style={{borderRadius:'50%'}}/></span><span style={{padding:'2%'}}>{r.ho+' '+r.ten}</span>
                  </TableCell>
              <TableCell align="right"><Button onClick={()=>{setIndex(r._id); remove(r._id)}}>Xóa</Button></TableCell>
            </TableRow>
          )) : ''}
        </TableBody>
      </Table>
      
    </TableContainer>
    
  );
}
