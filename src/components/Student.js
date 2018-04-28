import React from 'react';
import {connect} from 'react-redux';
import { Link} from 'react-router-dom';
import "./css/student.css";
import { setTargetStudentProjects } from '../reducers/action';
import { setTargetStudent } from '../reducers/action';
import $ from "jquery";

class Student extends React.Component {

	// 点击一个学生， 根据目标课程，目标班级，学生的名字获取项目数据
	getTargetStudentProjects(lesson, cla, student){
		this.props.setTargetStudent(student);
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

	render(){
		return (
			<Link to="/PageStudent" onClick={()=> { this.getTargetStudentProjects(this.props.lesson, this.props.cla, this.props.name) }}>
				<div className="student clearfix">
                    <img src="./static/img/user.png" className="f-left" alt=""/>
                    <div className="inline f-left">
                    	<p>{this.props.name}</p>
                    	<p>{this.props.id}</p>
                    </div>
                    <strong className= {`f-right ${this.props.flag === 'yes'?'active':null}`}></strong>
                    <div className='del-font'></div>
				</div>
			</Link>
		);
	}
}

const mapStateToProps = (state) => {
	return{
		lesson: state.lesson,
		cla: state.cla,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setTargetStudentProjects: (val) => { dispatch(setTargetStudentProjects(val)); },
		setTargetStudent: (val) => { dispatch(setTargetStudent(val)); }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);