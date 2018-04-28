import React from 'react';
import './css/choose.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Student from './Student';

class Choose extends React.Component {
	render(){
		// 是否显示返回标签
		let link = this.props.page==="cla"?"": (<Link to="/PageCla"><span>返回学生列表</span></Link>);

		let students = this.props.students;
		let flagNo = [], flagYes = [];

		// 学生分组，第一组有标志位，第二组没有标志位
		students.map((item, i) => {
			if(item.flag==="no"){
				flagNo.push(<Student key={i} name={item.student_name} id={item.student_id} flag={item.flag} />);
			}else if(item.flag==="yes"){
				flagYes.push(<Student key={i} name={item.student_name} id={item.student_id} flag={item.flag}/>);
			}
			return null;
		});

		return (
			<div className="choose clearfix">
				<div className="choose-back f-left">
					{link}
				</div>

				<div className="choose-students f-right">
					<div className="f-left">学生人数：
						<span className="students-number">{this.props.students.length}</span>
					</div>
					<div className="f-left choose-follow">筛选:
						<span className="follow-true">有跟踪信息{flagYes.length}人</span>
						<span className="follow-false">无跟踪信息{flagNo.length}人</span>
					</div>
				</div>
			</div>
		);
	}
}

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

const mapStateToProps = (state) => { 
	return { 
		students: studentsFilter(state.students, state.lesson, state.cla)
	}; 
}

export default connect(mapStateToProps, undefined)(Choose);