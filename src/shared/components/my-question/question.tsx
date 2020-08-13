import React, { Component } from 'react';
import BoxContainer from '../box-container/box-container';
import { RadioGroup, FormControlLabel, Radio, IconButton, Typography } from '@material-ui/core';
import { IMyQuestion } from '../../models/question.model';
import { MyInput } from '../my-input/my-input';
import MyButton from '../my-button/my-button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import './question.scss';
export default class MyQuestion extends Component<IMyQuestion, {}>{

    handleChange = () => {

    }
    // hàm map radio cho phép lựa chọn đáp án 
    renderOptions = () => {
        return (
            <RadioGroup onChange={this.handleChange}>
                {this.props.lua_chon?.map(option => (
                    <FormControlLabel
                        value={option.id} control={<Radio />}
                        label={option.value}
                        disabled={true}
                    />
                ))}
            </RadioGroup>
        )

    }

    clickEdit = (item: any) => {

    }

    render() {
        const questionType = this.props.loai === 'TracNghiem';
        const disableAdd = this.props.disableAdd;
        return (
            <BoxContainer>
                <div className="question-header">
                    <div className="content-question">
                        {this.props.index ?
                            <Typography variant="h6" gutterBottom>
                                câu hỏi {this.props.index}:
                        </Typography> : null}
                        {this.props.noi_dung}
                    </div>

                    {
                        this.props.canDelete &&
                        <div className="btn-add-question">
                            <IconButton onClick={() => this.props.onDelete(this.props._id)}>
                                <DeleteIcon color="secondary" />
                            </IconButton>
                        </div>
                    }

                    {
                        this.props.canAdd &&
                        <div className="btn-add-question">
                            <MyButton
                                label="Thêm"
                                onClick={(e: any) => this.props.clickAdd(this.props)}
                                variant="text"
                                startIcon={<AddCircleIcon />}
                                disabled={disableAdd}
                            />
                        </div>
                    }
                  
                </div>
                {/* khi q_type = 1 (câu hỏi trắc nghiệm) thì sẽ sử dùng hàm cho phép lựa chọn đáp án 
                ngược lại thì cho một cái TextField được dụng cho câu hỏi tự luân */}
                {
                    questionType ?
                        this.renderOptions()
                        :
                        <MyInput
                            onChange={() => null}
                            value={this.props.answer}
                            multiline
                            rowsMax={3}
                            label="Đáp án"
                            disabled={true}
                            fullWidth
                            variant="outlined"
                        />
                }
                  {/* <MyInput
                        label = "Điểm câu hỏi bài thi"
                        onChange={() => null}
                        value={this.props.diem}
                        multiline
                        rowsMax={3}
                        fullWidth
                        variant="outlined"
                    /> */}
            </BoxContainer >
        )
    }
}