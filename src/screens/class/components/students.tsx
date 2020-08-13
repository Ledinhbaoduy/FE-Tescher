import React, { Component } from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Button, Typography } from '@material-ui/core';
import SimpleTable from '../../../shared/components/simple-table';
import ClassService from '../../../service/class.service';
import { bindActionCreators } from 'redux';
import {onLoading} from '../../../redux/actionCreator/actionCreator';
import { connect } from 'react-redux';
import Promt from '../../../shared/components/my-dialog/promt';
import FormDialog from '../../../shared/components/my-dialog/form-dialog';
interface IStudentProps{
    c_id: string;
    logged?:boolean;
    onLoading?: any;
}
class StudentScreen extends Component<IStudentProps,{res: any, isShow: boolean, index: string, isFormShow: boolean}>{

    constructor(props: IStudentProps){
        super(props);
        this.state = {
            res: [],
            isShow: false,
            index: '',
            isFormShow: false,
        }
        this.openPrompt = this.openPrompt.bind(this);
    }
    componentDidMount(){
        document.title= 'Sinh Viên';
        this.props.onLoading(true);
        this.cService.getAllStudentsByClass(this.props.c_id).subscribe(res =>{
            console.log(res);
            this.setState({res: res.ds_sinh_vien});
            this.props.onLoading(false);
        })
    }
    componentDidUpdate(){

    }
    removed = () =>{
        this.props.onLoading(true);
        const index = this.state.res.indexOf(this.state.index)
        this.setState({res: this.state.res, isShow: false});
        this.state.res.splice(index,1);
        this.cService.removeStudent(this.props.c_id, this.state.index).subscribe(res => {
            console.log(res);
            this.props.onLoading(false);
        })
    }
    close = ()=> {
        this.setState({isShow: false});
    }

    closeForm = () => {
        this.setState({isFormShow: false})
    }

    openPrompt = (id: string)=>{
        this.setState({isShow: true, index: id})
    }
    
    openIForm = () => {
        this.setState({isFormShow: true});
    }
    private cService = new ClassService();

    render(){
        return (
            <div>
            <div className="row justify-content-md-center">
            <div className="col col-lg-2">
            </div>
            <div className="col-md-auto">
                <Typography variant='h3'>DANH SÁCH SINH VIÊN</Typography>
              
              <table className="table">
                  <tr>
                      <td></td>
                      <td></td>
                      <td className="text-right"><Button variant="contained" color="primary" startIcon={<PersonAddIcon />} onClick={this.openIForm}>Mời</Button></td>
                  </tr>
              </table>
              {/* <Button variant="contained" color="primary" startIcon={<PersonAddIcon />} onClick={this.openIForm}>Mời</Button> */}
                <SimpleTable row={this.state.res} callOpen={this.openPrompt}/>
                <Promt id={this.state.index} open={this.state.isShow} handleClose={this.close}  title={'Xóa người dùng'} content={'Bạn có chắc chắn muốn xóa sinh viên này?'} removed={this.removed}/>
                <FormDialog c_id={this.props.c_id} open={this.state.isFormShow} title={'Mời sinh viên'} handleClose={this.closeForm}/>  
            </div>
            <div className="col col-lg-2">
            </div>
          </div>
          
            </div>
           
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        logged: state.data.logged,
        isLoading: state.data.isLoading,
    }
}
const mapDispatchToProps = (dispatch: any) => {
    const actionCreator = {onLoading};
    const action = bindActionCreators(actionCreator, dispatch);
    return {...action}
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentScreen);