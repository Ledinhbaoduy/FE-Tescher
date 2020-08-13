import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    text:{
        color: 'red',
        width: '100%'
    }
  }),
);

export default function SimpleAlerts(props: any) {
  const classes = useStyles();

  return (
    <div style={{display: props.display}} className={classes.root}>
      <Alert classes={{
          message: classes.text
      }}  variant="outlined" severity="error" action>
        {props.text}
      </Alert>
      {/* <Alert variant="filled" severity="warning">
        This is a warning alert — check it out!
      </Alert>
      <Alert variant="filled" severity="info">
        This is an info alert — check it out!
      </Alert>
      <Alert variant="filled" severity="success">
        This is a success alert — check it out!
      </Alert> */}
    </div>
  );
}
