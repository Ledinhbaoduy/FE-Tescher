import React, {Component} from 'react';
import { Typography } from '@material-ui/core';

interface IMarkProps{
    c_id?:any,
}

interface IMarkState{

}

class MarkScreen extends Component <IMarkProps,IMarkState>{
    render(){
        return(
        <div>Phần chấm  điểm nha</div>
        )
    }
}

export default MarkScreen;