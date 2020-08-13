import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
interface IMyPager {
    children?: any;
    className?: string; 
}
export default class MyPaper extends Component<IMyPager, {}>{
    render() {
        return (
            <Box width="30%" height='10%'>
                <Paper elevation={3} className={this.props.className}>
                    <Box width="auto" p={1} my={0.5}>
                        {this.props.children}
                    </Box>
                </Paper>
            </Box>
        );
    }

}