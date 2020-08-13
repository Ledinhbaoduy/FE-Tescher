import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { TestService }  from '../../../service/test.service';
import AuthorizedService from '../../../service/authorized.service';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props: any) {
    const tService = new TestService();
    const author = new AuthorizedService();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [sources, setSources] = React.useState([]);
    useEffect(()=>{
        getItems();
    },[])

    const getItems = () =>{
        const id = author.getUserInfo().user_info.id;
        tService.getAllTestsByTeacher(id).subscribe(res => {
            setSources(res);
        })
    }

  return (
    <div>
      <Dialog maxWidth='xl' open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Thêm bài thi vào lớp
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {sources ? sources.map((x:any)=><div><ListItem button>
            <ListItemText onClick={()=>{
                props.onAddToTable(x._id, x.tieu_de)
                }} primary={x.tieu_de} secondary={new Date(x.ngay_thi).toLocaleDateString()} />
          </ListItem>
          <Divider /></div>): 'Không có thông tin'}
        </List>
      </Dialog>
    </div>
  );
}
