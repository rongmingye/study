import React from 'react';
import { connect } from 'react-redux';

import Side from '../components/Side';
import Top from '../components/Top';
import Choose from '../components/Choose';
import Question from '../components/Question';
import './css/page.css';
import './css/anlyseArticle.css';

class PageAnlyse extends React.Component {

	constructor(){
		super();
		this.state = {
			items:  [],
		}
	}

	// 获取所有的项目名
    projectsName(data){
		let projects = [];
			let isHave;
			data.map((item, i)=>{
				isHave = false;
				for(let i=0; i<projects.length; i++){
					if(projects[i] === item.project_name){
						isHave = true;
					}
				}
				if(!isHave){
					projects.push(item.project_name);
				}
				return null;
			});

	    return projects;
	};

	// 根据项目名获取该问题列表
	filterProject(projects, name){
		let items = [];
		let isHave = false;
		projects.map( (item, i) => {
			if(item.project_name === name){
				isHave = false;
				for(var j=0; j<items.length; j++){
					if(items[j].question_name === item.question_name){
						items[j].sum += 1;
						if(item.resolve === "yes"){
							items[j].yes += 1;
						}
						isHave = true;
					}
				}
				if(!isHave){
					item.sum = 1; // 统计班级总人数
					if(item.resolve === "yes"){
						item.yes = 1;  // 统计问题正确的人数
					}else{
						item.yes = 0;
					}
					items.push(item);
				}
			}
			return null;
		});
		return items;
	}

	
	render(){
		let projects = this.props.projects;
		let projectsName = this.projectsName(projects);

		// 下拉菜单
		let selectList = projectsName.map((item, i)=>{
			return ( <option value = {item} > 
					{item}
				 </option> );	
		});

		// 问题列表
		let questionList = this.state.items.map( (item, i) => {
			return ( <Question content={item.question_name} success={item.success} yes={item.yes} sum={item.sum}/> );
		});


		return (
			<div className="page">
				<Side /> 
				<div className="main">
					<Top />
					<Choose page="anlyse"/>
					<div className="article">
						<div className="article-title">
							<h4>学情重要数据分析 </h4>
							<p>本次本次课上的学情，按出现的次数递减排列，如下所示 </p>
							<select  className="select" onChange={ (e)=> {
									this.setState({ items: this.filterProject(projects, e.target.value) }); 
							}}>
								<option selected>请选择项目</option>
								{selectList}
							</select>
						</div>
						<div>{questionList}</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => { 
	return {
		projects: state.curProjects
	}
}

export default connect(mapStateToProps, undefined)(PageAnlyse);

