import React from 'react';
import {connect} from 'react-redux';
import './css/stuCondition.css';
import Project from './Project';

class StuCondition extends React.Component{

	// 分布好项目
	// 将所有项目整合成一个项目里有问题的数组，该数组projectList的一项就是一个项目
	peojectsFilter(projects){
		let lens=[];
		let projectList = [];
		let isHave;
		projects.map((item, i)=>{
			isHave = false;
			for(let i=0; i<lens.length; i++){
				if(lens[i] === item.project_name){
					isHave = true;
					projectList[i].push(item);
				}
			}
			if(!isHave){
				lens.push(item.project_name);
				projectList.push([item]);
			}
			return null;
		});
		return projectList;
	};

	render(){
		let projects = this.peojectsFilter(this.props.projects);

		// 项目列表
		let projectList = projects.map((item, i) => {
			return 	( <Project questions={item}/> );
		});

		return(
			<div className="stu-condition clearfix">
				<h3>学情跟踪</h3>
				<div className="condition">
					{projectList}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return{
		projects: state.targetStudentProjects,
	}
}


export default connect(mapStateToProps, undefined)(StuCondition);