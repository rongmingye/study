import React from 'react';
import {connect} from 'react-redux';
import './css/stuCondition.css';
import $ from "jquery";
import { setTargetStudentProjects } from '../reducers/action';
import { getCurProjects } from '../reducers/action';


class Project extends React.Component{

	// 重新获取目标学生的项目, 表reltation
	// lesson: 目标的课程，cla: 目标班级，student: 目标学生
	getTargetStudentProjects(lesson, cla, student){
		$.ajax({
	        url: "/getTargetStudentProjects",
	        type: "post",
	        contentType: "application/x-www-form-urlencoded;charset=utf8", 
	        dataType: "json", 
	        data: "lesson="+lesson+"&cla="+cla+"&student_name="+student,
	        success: function(result){
	            this.props.setTargetStudentProjects(result);
	        }.bind(this),
	        fail: function(err, status){
	            console.log(err);
	    	}
	    });

	}

	// 重新获取当前课程班级的项目数据, 表relation
	getCurProjects(lesson, cla){
		$.ajax({
            url: "/getCurProjects",
            type: "post",
            contentType: "application/x-www-form-urlencoded;charset=utf8", 
            dataType: "json", 
            data: "lesson="+lesson+"&cla="+cla,
            success: function(result){
                this.props.getCurProjects(result);
            }.bind(this),
            fail: function(err, status){
                console.log(err)
            }
        }); 
	}

	// 处理问题：正确，错误的处理, 表relation
	// resolve: 解决方式 "yes" "no"
	// id: 问题的id
	handleResolve(resolve, id){
		$.ajax({
            url: "/submitQuestionHandle",
            type: "post",
            contentType: "application/x-www-form-urlencoded;charset=utf8", 
            dataType: "text", 
            data: "resolve="+resolve+"&id="+id,
            success: function(result){
            	this.getTargetStudentProjects(this.props.lesson, this.props.cla, this.props.targetStudent);
            	this.getCurProjects(this.props.lesson, this.props.cla);
            }.bind(this),
            fail: function(err, status){
                console.log(err)
            }
        }); 
	}

	// 删除问题, 表relation
	// id: 问题的id
	handleDelete(id){
		$.ajax({
            url: "/submitQuestionDelete",
            type: "post",
            contentType: "application/x-www-form-urlencoded;charset=utf8", 
            dataType: "text", 
            data: "id="+id,
            success: function(result){
            	this.getTargetStudentProjects(this.props.lesson, this.props.cla, this.props.targetStudent);
            	this.getCurProjects(this.props.lesson, this.props.cla);
            }.bind(this),
            fail: function(err, status){
                console.log(err)
            }
        }); 
	}

	render(){
		let questions = this.props.questions;

		let questionsList = questions.map((item, i) => {
			if(item.resolve==="a"){
				return (
					<li className="item " key={i}>  
						<div className="left">
							<span className="itemId none">item.id</span>
						    <p>{item.question_name}</p>
						</div>

						<div className="right">
						    <span className="right-item" onClick={() =>{ this.handleResolve("yes", item.id) }}>
						    	<img src="./static/img/selected.png" alt=""/><br/>正确解决
						    </span>
						    <span className="error-item" onClick={() => this.handleResolve("no", item.id) }>
						       <img src="./static/img/close.png" alt=""/><br/>出错
						     </span>
						 	<span className="del-item"  onClick={() => this.handleDelete(item.id) }>
						 	    <img src="./static/img/delete.png" alt=""/><br/>删除条目
						 	</span>
					    </div>								  
					</li>
				);
			}
			if(item.resolve==="no"){
				return (
					<li className="item " key={i}>  
						<div className="left">
							<span className="itemId none">item.id</span>
						    <p>{item.question_name}</p>
						</div>

						<div className="right">
						    <span className="right-item" onClick={() =>{ this.handleResolve("yes", item.id) }}>
						    	<img src="./static/img/selected.png" alt=""/><br/>正确解决
						    </span>
						    <span className="error-item" onClick={() => this.handleResolve("no", item.id) }>
						       <img src="./static/img/close.png" alt=""/><br/>再次出错
						     </span>
						 	<span className="del-item"  onClick={() => this.handleDelete(item.id) }>
						 	    <img src="./static/img/delete.png" alt=""/><br/>删除条目
						 	</span>
					    </div>								  
					</li>
				);
			}
			return null;
		});

		return(
			<div className="lessonTime">
				<h5>{questions[0].project_name}</h5>
				<ul>
					{questionsList}
				</ul>
			</div>			
		);
	}
}

const mapStateToProps = (state) => {
	return{
		lesson: state.lesson,
		cla: state.cla,
		targetStudent: state.targetStudent
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setTargetStudentProjects: (val) => { dispatch(setTargetStudentProjects(val)); },
		getCurProjects: (val) => { dispatch(getCurProjects(val)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);