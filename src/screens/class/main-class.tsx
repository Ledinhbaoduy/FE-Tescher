import React, { Component } from 'react';
import MyTab from '../../shared/components/my-tab';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AuthorizedService from '../../service/authorized.service';
import ClassService from '../../service/class.service';
import SpeedDial from '../../shared/components/my-speed-dial';
import Student from './components/students';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { RouteComponentProps } from 'react-router-dom';
import Exam from './components/exams';
import history from '../../navigation/App.history';
import Test from './components/tests';
import MarkList from './components/marks_list';
import Mark from './components/marks';
import MarkTest from './components/marks-test';
interface IMainClassRender {
    exams: any,
    tests: any,
    students: any,
    marks_list: any,
    marks:any,
    icon: any,
    suffix: string,
}

interface IMainClassProps extends RouteComponentProps<{ id: string }> {

}

class MainClass extends Component<IMainClassProps, IMainClassRender>{
    private author = new AuthorizedService();
    private cService = new ClassService();
    constructor(props: IMainClassProps) {
        super(props);
        this.state = {
            exams: '',
            tests: '',
            students: '',
            marks_list: '',
            marks: '',
            // markTest: '',
            icon: <AddCircleIcon />,
            suffix: ' bài tập',
        }
        this.getValue = this.getValue.bind(this);
    }
    componentDidMount() {
    }
    componentWillMount() {
        this.cService.getInfoById(this.props.match.params.id).subscribe(res => {
            if (!(res && res._id)) {
                history.push('/class');
            }
            else {
                document.title = res.tieu_de;
                this.setState({ exams: <Exam c_id={this.props.match.params.id} /> });
            }

        })
    }
    componentDidUpdate() {

    }
    getValue = (i: number) => {
        switch (i) {
            case 0:
                this.setState({icon: <AddCircleIcon />, students: '', exams:<Exam c_id={this.props.match.params.id} />, tests:'', marks_list: '', suffix: ' bài tập'});
                break;
            // case 1:
            //     this.setState({icon: <AddCircleIcon />, students: '', exams:'', tests:<Test c_id={this.props.match.params.id} />, marks_list: '', suffix: ' bài kiểm tra'});
                break;
            case 1:
                    this.setState({icon: <PersonAddIcon />, students: <Student c_id={this.props.match.params.id}/>, exams:'', tests:'', marks_list: '', suffix: ' sinh viên'});
                break;
            case 2:
                this.setState({icon: '', students: '', exams:'', tests:'', marks_list: <MarkList c_id={this.props.match.params.id} />, suffix: ''});
                break;
            default:
                this.setState({
                    icon:'',  students:'', exams:'', tests: '', marks_list: '',
                    marks: <MarkTest c_id={this.props.match.params.id}/>, suffix: ''
                })
                break;
        }
    }
    render() {
        return (

            <div className='container-fluid'>
                {/* <SpeedDial pic={this.state.icon} suffix={this.state.suffix}/> */}
                <MyTab exams={<div className='text-center'>{this.state.exams}</div>} 
                tests={this.state.tests} 
                students={<div className='text-center'>{this.state.students}</div>} 
                marks_list={this.state.marks_list}
                marks={this.state.marks}
                onValueChange={this.getValue}
                />

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
    const actionCreator = {};
    const action = bindActionCreators(actionCreator, dispatch);
    return { ...action };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainClass)