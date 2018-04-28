import React from 'react';
import Side from '../components/Side';
import Top from '../components/Top';
import Choose from '../components/Choose';

import StuInfo from '../components/StuInfo';
import StuHistory from '../components/StuHistory';
import StuCondition from '../components/StuCondition';
import './css/page.css';
import './css/stuArticle.css';

class PageStudent extends React.Component {

	render(){

		return (
			<div className="page">
				<Side /> 
				<div className="main">
					<Top />
					<Choose page="student" />

					<div className="article clearfix">
						<div className="article-left f-left">
							<StuInfo />
							<StuHistory />
						</div>
						<div className="article-right f-left">
							<StuCondition />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PageStudent;

