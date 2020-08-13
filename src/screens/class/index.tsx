import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import history from '../../navigation/App.history';
import MyCard from '../../shared/components/my-card';
import AuthorService from '../../service/authorized.service';
import ClassService from '../../service/class.service';
import './class.scss';
//import {MultiSkeleton} from './components/class-skeleton';
import {onLoading} from '../../redux/actionCreator/actionCreator';
import { APP_ROUTER } from '../../constants/router.constants';
import { Button } from '@material-ui/core';
import ClassDialog from './create-class-dialog';
import EditDialog from './components/edit-class-dialog';
import BoxContainer from '../../shared/components/box-container/box-container';

interface IClassProps {
    logged?:boolean;
    isLoading?: boolean;
    onLoading?:any;
}
interface IClassState {
    items: any,
    isShow: boolean,
    isEShow: boolean,
    c_id: string,
    title: string,
}

class ClassScreen extends Component<IClassProps, IClassState> {
    private author = new AuthorService();
    private cService = new ClassService();
    constructor(props: IClassProps){
        super(props);
        this.state = {
            items: [],
            isShow: false,
            isEShow: false,
            c_id: '',
            title: '',
        }
        this.editInfo = this.editInfo.bind(this);
    }

    componentDidMount(){
        this.props.onLoading(true)
        const id = this.author.getUserInfo().user_info.id;
        this.cService.getAllClassesByTeacher(id).subscribe(res=>{
            console.log(res);
            this.setState({items: res, });
            this.props.onLoading(false);
            document.title= 'Lớp học'
        })
    }

    componentDidUpdate(){
        if(!this.author.getUserInfo().user_info.id){
            history.push(APP_ROUTER.LOGIN.HOME)
        }
        else{
            
        }
    }

    onClose = () => {
        this.setState({isShow: false});
    }

    onEClose = () => {
        this.setState({isEShow: false});
    }

    onRefresh = () => {
        this.props.onLoading(true)
        this.cService.getAllClassesByTeacher(this.author.getIdUsers()).subscribe(res => {
            this.setState({items: res})
            this.props.onLoading(false)
        })
    }

    editInfo = (id:any, title:any) => {
        this.setState({isEShow: true, c_id: id, title: title})
    }

    render(){ 
        return (
            <div className='container'>
                <Button variant='contained' color='primary' onClick={()=> this.setState({isShow: true})}>Tạo lớp</Button>
                <div className='contain'>
                {
                !this.props.isLoading 
                ? this.state.items ? this.state.items
                .map((x:any)=><MyCard editInfo={this.editInfo} id={x._id} title={x.value} description={x.des ? x.des : ''}/> ) : ''
                : ''}
                </div>
                
                <ClassDialog onRefreshTable={this.onRefresh} handleClose={this.onClose} open={this.state.isShow} typeName='Tạo lớp học' />
                <EditDialog id={this.state.c_id} title={this.state.title} onRefreshTable={this.onRefresh} handleClose={this.onEClose} open={this.state.isEShow} typeName='Sửa thông tin' />
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
    const actionCreator = { onLoading };
    const action = bindActionCreators(actionCreator, dispatch);
    return {...action};
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassScreen);