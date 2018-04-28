import React from 'react';
import Progress from './Progress';

class Question extends React.Component {

	render(){
		let question = {
			width: "100%",
			height: "50px",
			lineHeight: "50px",
			marginTop: "10px",
			padding: "0 10px",
			background: "#fff"
		}
		let left = {
			width: "60%",
			height: "30px",
			lineHeight: "30px",
			margin: "10px 0",
			
		}
		let right = {
			width: "40%",
			height: "30px",
			lineHeight: "30px",
			margin: "10px 0",
			borderLeft: "2px solid #999"
		}
		let oSpan = {
			display: "inline-block",
			width: "20%",
			heihgt: "30px",
			textAlign: "center"
		}
		let pSpan = {
			display: "inline-block",
			width: "60%",
			heihgt: "30px"
		}

		let yes = this.props.yes;
		let sum = this.props.sum;
		let per = parseInt(yes/sum*100, 10);

		return (
			<div style={question} className="clearfix">
				<div className="f-left" style={left}>
					{this.props.content}
				</div>

				<div className="f-right" style={right}>
					<span style={oSpan}> {yes} </span>
					<span style={oSpan}> {`${per}%`} </span>
					<span style={pSpan}> <Progress val={`${per}%`} /> </span>
				</div>
			</div>
		);
	}
}

export default Question;

