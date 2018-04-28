import React from 'react';
import {connect} from 'react-redux';
import './css/stuInfo.css';
import Progress from './Progress';
import $ from "jquery";
import { getStudent } from '../reducers/action';
import { setDefaultCla } from '../reducers/action';

class StuInfo extends React.Component{

	// 处理是否标志学生
	handleFlagPoint(nid){
		let flag = this.props.flag === "no"?"yes":"no";
		$.ajax({
	        url: "/changeFlag",
	        type: "post",
	        contentType: "application/x-www-form-urlencoded;charset=utf8", 
	        dataType: "text", 
	        data: "nid="+nid+"&flag="+flag,
	        success: function(result){
	        	alert("change");
	        	this.getInit();
	        }.bind(this),
	        fail: function(err, status){
	            console.log(err);
        	}
        });
	}

	// 重新获取所有学生
	getInit(){
		 $.ajax({
            url: "/getInit",
            type: "post",
            contentType: "application/x-www-form-urlencoded;", 
            dataType: "json", 
            data: null,
            success: function(result){
                this.props.getInit(result);
            }.bind(this),
            fail: function(err, status){
                console.log(err)
            }
        }); 
	}

	render(){
		return(
			<div className="stu-info clearfix">
				<div className="info-left">
					<p>姓名：<span>{this.props.name}</span></p>
					<p>学号：<span>{this.props.id}</span></p>
					<p>课程：<span>{this.props.lesson}</span></p>
				</div>	
				<div className="info-progress">
					<p className='info-desc'>本课程进度:</p>
					<p className='info-bar'><Progress  val='85%' /></p>
					<p>是否要标志该学生：<strong className={`${this.props.flag === 'yes'?'active':null}`} 
						onClick={()=>this.handleFlagPoint(this.props.nid) }></strong>
					</p>
				</div>
			</div>
		);
	}
}

// 根据学生名字获取他的id
function filterId(students, targetStudent){
	let studentId;
	students.map((item, i)=>{
		if(item.student_name === targetStudent){
			studentId = item.student_id;
		}
		return null;
	});
	return studentId;
}

// 根据学生名字获取他的nid
function filterNid(students, targetStudent, lesson){
	let studentNid;
	students.map((item, i)=>{
		if(item.student_name === targetStudent){
			if(item.lesson_name === lesson){
				studentNid = item.nid;
			}
		}
		return null;
	});
	return studentNid;
}

// 根据学生名字获取他的flag
function filterFlag(students, targetStudent, lesson){
	let studentFlag;
	students.map((item, i)=>{
		if(item.student_name === targetStudent){
			if(item.lesson_name === lesson){
				studentFlag = item.flag;
			}
		}
		return null;
	});

	return studentFlag;
}

const mapStatToProps = (state) => {
	return {
		lesson: state.lesson,
		name: state.targetStudent,
		id: filterId(state.students, state.targetStudent),
		nid: filterNid(state.students, state.targetStudent, state.lesson),
		flag: filterFlag(state.students, state.targetStudent, state.lesson),
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInit: (val) => { dispatch( getStudent(val) );  dispatch(setDefaultCla(false)); }
    }
}

export default connect(mapStatToProps, mapDispatchToProps)(StuInfo);