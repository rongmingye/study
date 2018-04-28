import React from 'react';
import {connect} from 'react-redux';
import {selectLesson} from '../reducers/action';
import {setDefaultCla} from '../reducers/action';
import {setDefaultLessson} from '../reducers/action';


class Lesson extends React.Component {

	render(){

		// 默认第一个课程
		if(this.props.defaultLesson){
			this.props.slt(this.props.lessons[0]);
		}

		let lessons = this.props.lessons.map((item, i) => {
				return (
					<li key={i} 
						onClick={ (e)=>{ this.props.slt(item); }}
						className= {`${this.props.lesson===item?'active':null}`}>
					{item}</li>
				);
			});

		return (
			<div>
				<h4 className="side-title">课程名称</h4>
				<ul>
					{lessons}
				</ul>
			</div>
		);
	}
}

// 获取所有课程
function lessonFilter(students){
	let lens=[];
	let isHave;
	students.map((item, i)=>{
		isHave = false;
		for(let i=0; i<lens.length; i++){
			if(lens[i] === item.lesson_name){
				isHave = true;
			}
		}
		if(!isHave){
			lens.push(item.lesson_name);
		}
		return null;
	});

    return lens;
};

// 获取store.state的课程名称
const mapStatToProps = (state) => {
	return {
		lessons: lessonFilter(state.students),
		defaultLesson: state.defaultLesson,
		lesson: state.lesson
	};
}

// 发布store.dispatch事件selectLesson，选中目标课程
const mapDispatchToProps = (dispatch) =>{
	return {
		slt: (val) =>{
			dispatch(selectLesson(val)); 
			dispatch(setDefaultCla(true)); 
			dispatch(setDefaultLessson(false));
		}
	};	
}

export default connect(mapStatToProps, mapDispatchToProps)(Lesson);