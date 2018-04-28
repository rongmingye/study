import React from 'react';
import { Link } from 'react-router-dom';

import Lesson from './Lesson';
import Cla from './Cla';
import './css/side.css'

class Side extends React.Component {
	render(){
		return (
			<div className="side">
				<h3 className="project-title">PTDP学情跟踪</h3>
				<div className="lesson"> <Lesson /> </div>
				<div className="cla"> <Cla /> </div>
				<div className="anlyse"> <Anlyse /> </div>
				<Link to="/pageSetProject"><div className="set">  设置项目 </div> </Link>
			</div>
		);
	}
}

class Anlyse extends React.Component {
	render(){
		return (
			<div>
				<h4 className="side-title">分析</h4>
				<ul>
					<li><Link to="/PageAnlyse">数据分析</Link></li>
				</ul>
			</div>
		);
	}
}

export default Side;