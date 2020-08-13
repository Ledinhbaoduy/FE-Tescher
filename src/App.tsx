import React, { Component } from 'react';
import { Router } from "react-router-dom";
import AppNavigation from './navigation/App.navigation';
import history from './navigation/App.history';
import AppMenu from './shared/components/app-menu/app-menu';
import { withStyles } from '@material-ui/core';
import { AppStyleMainLinear } from './shared/material-styles/styles';
import AppData from './redux/app.data';
import TopBarComponent from './screens/top-bar/top-bar';
import Skeleton from '@material-ui/lab/Skeleton';
import { LOCAL_STORAGE } from './constants/common.constants';

class App extends Component<{ classes: any }, { isOpen: boolean }> {

  constructor(props: any) {
    super(props);
    this.state = {
      isOpen: false,
    }
  };

  toggleDrawer = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { classes } = this.props;
    return (
      <Router history={history}>
        <TopBarComponent onClickMenu={this.toggleDrawer} />
        <AppData />
        <AppMenu isOpen={this.state.isOpen} closeDrawer={this.toggleDrawer} />
        <div className={classes.appContainer}>
          <AppNavigation />
        </div>
        
      </Router >
      
    );
  }
}

const styles = (theme: any) => ({
  appContainer: {
    padding: 20,
  }
})

export default withStyles(styles)(App);
