import React from 'react';
import './css/stuHistory.css';
import Progress from './Progress';

class StuHistory extends React.Component{
	render(){

		let lessonArr = [
							{lesson: '单片机', teacher: '黄老师', rank: '10', score: '85'},
							{lesson: 'web前端', teacher: '万老师', rank: '3', score: '95'},
							{lesson: 'JavaWeb', teacher: '林老师', rank: '3', score: '80'},
							{lesson: 'pcb', teacher: '万老师', rank: '3', score: '70'}
						];

		let historyLessonList = lessonArr.map((item, i)=>{
				return (
					<HistoryLesson  key={i}
						lesson={item.lesson} teacher={item.teacher}
						rank={item.rank} score={item.score} />
				);
		});

		return(
			<div className="stu-history clearfix">
				<h3>已完结的相关课程</h3>
				<div className="history-list">
					{historyLessonList}
				</div>
			</div>
		);
	}
}

class HistoryLesson extends React.Component{
	render(){
		return(
			<div className="history-lesson">
				<div className="f-left">
					<h5>{this.props.lesson}</h5>
					<p>授课老师: <span>{this.props.teacher}</span></p>
				</div>
				<div className="f-right">
					<p>排名：<span>{this.props.rank}</span></p>
					<p>成绩：<span>{this.props.score}</span></p>
					<div><Progress  val={ `${this.props.score}%`}/></div>
				</div>
			</div>
		);
	}
}

export default StuHistory;