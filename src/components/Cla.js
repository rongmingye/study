import React from 'react';
import {connect} from 'react-redux';

import {selectCla} from '../reducers/action';
import {setDefaultCla} from '../reducers/action';
import { setCurStudents } from '../reducers/action';
import { getCurProjects } from '../reducers/action';
import { getSetProjects } from '../reducers/action';
import $ from "jquery";

class Cla extends React.Component {

	// 点击班级触发的事件函数
	handleClick(lesson, cla, students){
		this.props.slt(cla);  // 选择目标班级
		this.props.setCurStus(students, lesson, cla); // 筛选班级的学生

		// 获取当前课程班级的项目，表relation
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

        // 获取当前课程班级的设置项目，表project
		$.ajax({
            url: "/getSetProjects",
            type: "post",
            contentType: "application/x-www-form-urlencoded;charset=utf8", 
            dataType: "json", 
            data: "lesson="+lesson+"&cla="+cla,
            success: function(result){
                this.props.getSetProjects(result);
            }.bind(this),
            fail: function(err, status){
                console.log(err)
            }
        }); 
	}

	render(){
		let students = this.props.students;
		let lesson = this.props.lesson;
		let firstCla = this.props.clas[0];

		// 当点击课程时， 都会回到第一个班
		if(this.props.defaultCla){
			this.handleClick(lesson, firstCla, students);
		}
		// 展示所有班级
		let clas = this.props.clas.map((item, i) => {
			return (
				<li key={i}
					className= {`${this.props.cla===item?'active':null}`} 
					onClick={ (e)=>{ 
						this.handleClick(lesson, item, students);
						 }}> 
					{item} 
				</li>
			);
		});

		return (
			<div>
				<h4 className="side-title">班级名称</h4>
				<ul>
					{clas}
				</ul>
			</div>
		);
	}
}

//获取目标课程的所有班级名称
function claFilter(students, lesson){
	let stus=[];
	let clas=[];
	let isHave;
	students.map((item, i)=>{
		if(lesson === item.lesson_name){
			stus.push(item);
		}
		return null;
	});

	stus.map((item, i)=>{
			isHave = false;
			for(let i=0; i<clas.length; i++){
				if(clas[i] === item.cla_name){
					isHave = true;
				}
			}
			if(!isHave){
				clas.push(item.cla_name);
			}
			return null;
	});
    return clas;
};

// 根据目标课程 和 目标班级筛选出 学生
function studentsFilter(students, lesson, cla){
	let stus=[];
	students.map((item, i)=>{
		if(cla === item.cla_name && lesson === item.lesson_name){
			stus.push(item);
		}
		return null;
	});
    return stus;
};

const mapStatToProps = (state) => {
	return {
		clas: claFilter(state.students, state.lesson),
		students: state.students,
		lesson: state.lesson,
		cla: state.cla,
		defaultCla: state.defaultCla
	}
}

const mapDispatchToProps = (dispatch) =>{
	return {
		slt: (val) => {
			 dispatch(selectCla(val));
			 dispatch(setDefaultCla(false));
	    },
	    setCurStus: (stu, len, val) => {
	    	let stus = studentsFilter(stu, len, val);
			dispatch(setCurStudents(stus));
	    },
	    getCurProjects: (val) => { dispatch(getCurProjects(val)) },
	    getSetProjects: (val) => { dispatch(getSetProjects(val)) } 
	};	
}

export default connect(mapStatToProps, mapDispatchToProps)(Cla);