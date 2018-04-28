import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import Side from '../components/Side';
import Top from '../components/Top';
import Choose from '../components/Choose';
import { getCurProjects } from '../reducers/action';
import './css/page.css';
import './css/setProjectArticle.css';

class PageSetProject extends React.Component {

	constructor(){
		super();
		this.state= {
			items: [], // 保存临时项目的问题列表
			project: null  // 记录点击了哪一个项目
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
						isHave = true;
					}
				}
				if(!isHave){
					items.push(item);
				}
			}
			return null;
		});
		return items;
	}

	// 添加项目, 根据目标课程、班级
	addProject(lesson, cla, text){
		let cla_id;
		this.props.projects.map((item, i)=>{
			if(item.lesson_name === lesson && item.cla_name === cla){
				cla_id = item.cla_id
			}
			return null;
		});

		if(text !== ""){
			$.ajax({
	            url: "/addProject",
	            type: "post",
	            contentType: "application/x-www-form-urlencoded;charset=utf8", 
	            dataType: "json", 
	            data: "cla_id="+cla_id+"&text="+text,
	            success: function(result){
	            	this.getNewProjects(lesson, cla);
	            }.bind(this),
	            fail: function(err, status){
	                console.log(err)
	            }
       		 }); 
			return true;
		}else{
			return false;
		}
	}

	// 添加问题 根据目标课程、班级和项目,
	addQuestion(lesson, cla, project, text){
		let cla_id;
		this.props.projects.map((item, i)=>{
			if(item.lesson_name === lesson && item.cla_name === cla){
				cla_id = item.cla_id
			}
			return null;
		});

		if(text !== ""){
			$.ajax({
	            url: "/addQuestion",
	            type: "post",
	            contentType: "application/x-www-form-urlencoded;charset=utf8", 
	            dataType: "json", 
	            data: "cla_id="+cla_id+"&project="+project+"&text="+text,
	            success: function(result){
	            	this.getNewProjects(lesson, cla);
	            }.bind(this),
	            fail: function(err, status){
	                console.log(err)
	            }
       		 }); 
			return true;
		}else{
			return false;
		}
	}

	// 添加项目或者添加问题后, 重新获取所有项目
	getNewProjects(lesson, cla){
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

	render(){
		// let lesson = this.props.lesson;
		// let cla = this.props.cla;
		let projects = this.props.projects;

		let projectsName = this.projectsName(projects);
		this.filterProject(projects, projectsName[0]);
		
		// 项目列表
		let projectList =  projectsName.map((item, i) => {
			return (
				<li key={i} 
					onClick={() => { 
						this.setState({
			      			items: this.filterProject(projects, item),
			      			project: item
						});
						// this.refs.addQuestion.style.display = "block";
					}} > 
					{item}
				</li>);
		});
		
		// 问题列表
		let questionList = this.state.items.map( (item, i) => {
			return (<li key={i}> {item.question_name} </li>);
		});

		return (
			<div className="page">
				<Side /> 
				<div className="main">
					<Top />
					<Choose page="anlyse"/>

					{/* 主内容 */}
					<div className="article">

						<div className="setPorject-left f-left">
							<ul>
								{projectList}
							{/*
								<div className="addForm" ref="addProForm" >
									<input type="text"  ref="addProText" name="text" />
									<input type="button"  ref="addProBtn" value="提交"  
										onClick={ ()=>{
											let text =  this.refs.addProText;
											this.addProject(lesson, cla, text.value);
											text.value = "";
										}} />
								</div>
							*/}

							</ul>
							
							{/*
							<button className="add-project-btn" 
									ref="addProject" onClick={()=>{
									let addProForm = this.refs.addProForm;
									addProForm.style.display = addProForm.style.display=="block"?"none":"block";
								}}>
								添加项目
							</button>
							*/}

						</div>

						<div className = "setProject-right f-right">
							<ul>
								{questionList}
							{/*
								<div className="addForm" ref="addQueForm" >
									<input type="text"  ref="addQueText" name="text" />
									<input type="button"  ref="addQueBtn" value="提交"  
										onClick={ ()=>{
											let text =  this.refs.addQueText;
											this.addQuestion(lesson, cla, this.state.project, text.value);
											text.value = "";
										}} />
								</div>
							*/}
							
							</ul>
							{/*
							<button className="add-question-btn" 
								ref="addQuestion" onClick={()=>{
									let addQueForm = this.refs.addQueForm;
									addQueForm.style.display = addQueForm.style.display=="block"?"none":"block";
								}}> 
								添加问题
							</button>
							*/}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => { 
	return {
		projects: state.setProjects,
		lesson: state.lesson,
		cla: state.cla
	}
}

const mapDispatchToProps = (dispatch) =>{
	return {
	    getCurProjects: (val) => dispatch(getCurProjects(val))
	};	
}

export default connect(mapStateToProps, mapDispatchToProps)(PageSetProject);



