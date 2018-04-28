import React from 'react';

class Progress extends React.Component {
	render(){
		let val = this.props.val;

		let progress = {
			width: '100%',
			height: '12px',
			lineHeight: '12px',
			background: '#ddd',
			borderRadius: '5px',
		}
		let bar = {
			display: 'inline-block',
			width: val,
			height: '12px',
			lineHeight: '12px',

			color: '#fff',
			fontSize: '12px',
			textAlign: 'center',
			background: '#5cb85c',
			borderRadius: '5px'
		}
		return (
			<div style={progress} >
				<p style={bar}>{val}</p>
			</div>
		);
	}
}

export default Progress;
