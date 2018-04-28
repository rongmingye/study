var express = require('express'); // 快速构建服务器
var app = express();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser({extended: false});

var  query = require('./mysql.js');

app.use(express.static('build'));
//获取默认页面

app.get('/', function(req, res){
    res.sendFile(__dirname+'/build/'+'index.html');
});

// 登陆验证
app.post('/userCheck', urlencodedParser, function(req, res){
	var sql = "select * from login";
    query(sql, function(err, result){
		if(err) {
			console.log(err.message);
			return;
		}
		console.log("userCheck success");

        let p = new Promise( (resolve,reject)=>{
        	let login = "no";
			result.map((item, i)=>{
		    	if(item.user === req.body.user && item.pwd===req.body.pwd){
		    			login = "yes";	
		    			resolve(login);
		        }
	        });
	        resolve(login);
		 })
	  	.then( function(login){ console.log(login); res.end(login); })
	  	.catch(function(err){ console.log(err); return;} );	
    });
});

// 获取所有学生
app.post('/getInit', urlencodedParser, function(req, res){
	var sql = "select * from student inner join cla on student.cla_id = cla.cla_id";
    query(sql, function(err, result){
		if(err) {
			console.log(err.message);
			return;
		}
		console.log("getInit success");
		res.send(result);
        res.end(); // 使服务器停止处理脚本，返回当前结果  	
    });
});

// 获取目标课程班级的项目
app.post('/getCurProjects', urlencodedParser, function(req, res){
	var sql = "select * from relation  where lesson_name like '"
	     +req.body.lesson +"' and cla_name like '"+req.body.cla+"'";
    query(sql, function(err, result){
		if(err) {
			console.log(err.message);
			return;
		}
		console.log("getCurProjects success"+req.body.lesson +" "+ req.body.cla);
		res.send(result);
        res.end(); // 使服务器停止处理脚本，返回当前结果  	
    });
});

// 获取目标课程班级的设置项目
app.post('/getSetProjects', urlencodedParser, function(req, res){
	var sql = "select * from project inner join cla on project.cla_id = cla.cla_id where lesson_name like '"
	     +req.body.lesson +"' and cla_name like '"+req.body.cla+"'";
    query(sql, function(err, result){
		if(err) {
			console.log(err.message);
			return;
		}
		console.log("getSetProjects success"+req.body.lesson +" "+ req.body.cla);
		res.send(result);
        res.end(); // 使服务器停止处理脚本，返回当前结果  	
    });
});


// 获取目标课程班级学生的所有项目
app.post('/getTargetStudentProjects', urlencodedParser, function(req, res){
	var sql = "select * from relation where lesson_name='"+req.body.lesson
	+"' and cla_name='"+req.body.cla+"' and student_name='"+req.body.student_name+"'";
    query(sql, function(err, result){
		if(err) {
			console.log(err.message);
			return;
		}
		console.log("getTargetStudentProjects success"+req.body.lesson+req.body.cla+req.body.student_name);
		res.send(result);
        res.end(); // 使服务器停止处理脚本，返回当前结果  	
    });
});

// 问题处理
app.post('/submitQuestionHandle', urlencodedParser, function(req, res){
	var sql = "update relation set resolve ='"+req.body.resolve+"' where id="+req.body.id;
    query(sql, function(err, result){
		if(err) {
			console.log(err.message);
			return;
		}
		console.log("submitQuestionHandle success "+ req.body.resolve + req.body.id);
		res.send('yes');
        res.end(); // 使服务器停止处理脚本，返回当前结果  	
    });
});

// 问题删除
app.post('/submitQuestionDelete', urlencodedParser, function(req, res){
	var sql = "delete from relation where id="+req.body.id;
    query(sql, function(err, result){
		if(err) {
			console.log(err.message);
			return;
		}
		console.log("submitQuestionDelete success"+ req.body.id);
		res.send('yes');
        res.end(); // 使服务器停止处理脚本，返回当前结果  	
    });
});


// 添加项目
app.post('/addProject', urlencodedParser, function(req, res){
	var sql = "INSERT into project(cla_id, project_name, question_name) VALUE('"
		+ req.body.cla_id+"','"+ req.body.text+"', null, null)";
    query(sql, function(err, result){
		if(err) {
			console.log(err.message);
			return;
		}
		console.log("addProject success");
		res.send(null);
        res.end(); // 使服务器停止处理脚本，返回当前结果  	
    });
});

// 添加问题
app.post('/addQuestion', urlencodedParser, function(req, res){
	var sql = "INSERT into project(cla_id, project_name, question_name) VALUE('"
		+ req.body.cla_id+"','"+ req.body.project+"','"+  req.body.text+"', null)";
    query(sql, function(err, result){
		if(err) {
			console.log(err.message);
			return;
		}
		console.log("addQuestion success");
		res.send(null);
        res.end(); // 使服务器停止处理脚本，返回当前结果  	
    });
});

// 改变标志
app.post('/changeFlag', urlencodedParser, function(req, res){
	var sql = "update student set flag='"+req.body.flag+"' where nid="+req.body.nid;
    query(sql, function(err, result){
		if(err) {
			console.log(err.message);
			return;
		}
		console.log("changeFlag success");
		res.send(null);
        res.end(); // 使服务器停止处理脚本，返回当前结果  	
    });
});


var server = app.listen(3001, '192.168.123.163', function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log("http://%s:%s", host, port);
});