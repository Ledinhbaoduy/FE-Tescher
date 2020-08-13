import React, { useState } from 'react';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    width: 350,
    height:350,
    marginRight:'1%',
  },
  media: {
    height: 140,
  },
  content: {
      height:120,
  }
});

export default function MediaCard(props: any) {
  const classes = useStyles();
  const [isRaised, setRaised] = useState(false);
    const onRaise = () =>{
        setRaised(true);
    }
    const offRaise = () => {
        setRaised(false);
    }

    
  return (
    <Card className={classes.root} raised={isRaised} onMouseEnter={onRaise} onMouseLeave={offRaise}>
      <CardActionArea>
        
        <CardMedia
          className={classes.media}
          image="/uploads/images/demo.jpg"
          title="Contemplative Reptile"
        />
        
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
        <Divider />
      </CardActionArea>
      <CardActions>
      <Link to={'/class/'+props.id}><Button variant='contained' size="medium" color="primary" startIcon={<ExitToAppIcon />}>Vào lớp</Button></Link>
        <Button variant='contained' size="medium" color="primary"
        startIcon={<EditIcon />} onClick={() => {props.editInfo(props.id, props.title)}}>
          Sửa thông tin
        </Button>
      </CardActions>
    </Card>
  );
}
