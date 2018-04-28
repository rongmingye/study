import React from 'react';
import { connect } from 'react-redux';
import $ from "jquery";

import Student from '../components/Student';
import Side from '../components/Side';
import Top from '../components/Top';
import Choose from '../components/Choose';
import { getStudent } from '../reducers/action';
import { setDefaultCla } from '../reducers/action';
import './css/page.css';

class PageCla extends React.Component {

    // 获取初始的学生
    componentDidMount(){
    	console.log(this.props.history.location);
        $.ajax({
            url: "/getInit",
            type: "post",
            contentType: "application/x-www-form-urlencoded;", 
            dataType: "json", 
            data: null,
            success: function(result){
                this.props.getInit(result);  // 触发dispatch改变state.students
            }.bind(this),
            fail: function(err, status){
                console.log(err)
            }
        }); 
    }

	render(){
		let students = this.props.students;
		let flagNo = [], flagYes = [];

		// 遍历学生，分成两组，第一组是有标志位的学生
		students.map((item, i) => {
			if(item.flag==="no"){
				flagNo.push(<Student key={i} name={item.student_name} id={item.student_id} flag={item.flag} />);
			}else if(item.flag==="yes"){
				flagYes.push(<Student key={i} name={item.student_name} id={item.student_id} flag={item.flag}/>);
			}
			return null;
		});
		let studentsList = flagYes.concat(flagNo); // 合并数组

		return (
			<div className="page">
				<Side /> 
				<div className="main">
					<Top />
					<Choose page="cla"/>
					<div className="article">
						{studentsList}
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
		students: studentsFilter(state.students, state.lesson, state.cla),
	}; 
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInit: (val) => {
                            dispatch( getStudent(val) );  
                            dispatch(setDefaultCla(true)); 
                           }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PageCla);

