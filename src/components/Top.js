import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { setTargetStudentProjects } from '../reducers/action';
import { setTargetStudent } from '../reducers/action';
import './css/top.css';
import $ from "jquery";

class Top extends React.Component {

	// 搜索按钮
	searchLink(){
		let val = this.refs.input.value;
		this.props.setTargetStudent(val);
		$.ajax({
	        url: "/getTargetStudentProjects",
	        type: "post",
	        contentType: "application/x-www-form-urlencoded;charset=utf8", 
	        dataType: "json", 
	        data: "lesson="+this.props.lesson+"&cla="+this.props.cla+"&student_name="+val,
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
			<div className="top clearfix">
				<div className="top-search f-left">
					<Link to="/PageStudent" onClick={()=>this.searchLink()}>搜索</Link>
					<input type="text" ref="input" />
				</div>
				
				<div className="top-teach f-right">
					<span className="ling"><img src='./static/img/ling.png' alt="ling" /></span>
					<span>{/*this.props.teacher*/}rmy</span>
					<Link to="/"><span className='logout'>注销</span></Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return{
		lesson: state.lesson,
		cla: state.cla,
		teacher: state.teacher,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setTargetStudentProjects: (val) => { dispatch(setTargetStudentProjects(val)); },
		setTargetStudent: (val) => { dispatch(setTargetStudent(val)); }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Top);