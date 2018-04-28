import React from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import {setTeacher} from '../reducers/action'
import $ from "jquery";
import './css/login.css';

class PageLogin extends React.Component {

	// 验证登陆信息，正确了调到班级页面， 错误了重新登陆
	handleLogin(user, pwd){
		$.ajax({
            url: "/userCheck",
            type: "post",
            contentType: "application/x-www-form-urlencoded;charser=utf8", 
            dataType: "text", 
            data: "user="+user+"&pwd="+pwd,
            success: function(result){      	
            	if(result==="yes"){     
            		this.props.setTeacher(user);
            		const location = {
            			pathname: "PageCla",
            			state: "user",
            		}
            		// this.props.history.push('/PageCla');
            		this.props.history.push(location);
            	}else if(result==="no"){
            		alert("密码错误！")
            		this.props.history.push('/');
            	}
            }.bind(this),
            fail: function(err, status){
                console.log(err)
            }
        }); 
	}

	render(){

		// 获取文档的的宽高
		let ostyle = {
			width: document.querySelector('body').offsetWidth,
			height: document.querySelector('body').offsetHeight
		}
		
		return (
			<div className="page"  style={ostyle} >
				<div className="login">
					<h3>教师登陆</h3>
					<p>
			         	<span className="btn">用户名:</span> 
			          	<input type="text" name="username" id="username" className="form-control" ref="user" />
			      	</p>
			  		<p className="form-group">
			          	<span>密码:</span>
			          	<input type="password" name="password" id="password" ref="pwd" />
			      	</p>
			  		<p className="row" id="pass"> 
			  			<span></span>
			          	<input type="button" value="登录" onClick={ ()=> {
			          		let user = this.refs.user;
			          		let pwd = this.refs.pwd;
			          		this.handleLogin(user.value, pwd.value); 
			          		user.value=""; pwd.value="";
			          	}}/>
	    			</p>
	    		</div>	     	
			</div>
		);
	}
}

const mapStateToDispatch = (dispatch) => { 
	return { 
		setTeacher: (val) => dispatch(setTeacher(val)),
	}; 
}

export default connect(undefined, mapStateToDispatch)(PageLogin);

