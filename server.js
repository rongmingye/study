// 项目创建时间 2018/04/22

var express = require('express'); // 快速构建服务器
var app = express();

var router = require('./serve/router.js');
var query = require('./mysql.js');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser({extended: false});

var developState = "/public"; //开发时是"/public", 打包后用"/build"

app.use(express.static(__dirname + developState)); //views路径

router(app);

//获取默认页面
app.get('*', function(req, res){
    res.sendFile(__dirname+developState+'/index.html');
});

var server = app.listen(3001, '0.0.0.0', function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log("http://%s:%s", host, port);
});

// 定时连接mysql， 解决8小时断开连接mysql问题
let count = 0;
setInterval(function(){
    let sql = "SHOW TABLES FROM study1;";
    query(sql, function(err, result){
        if(err) {
            console.log(err.message);
            return null;
        }
        count++;
        if(count == 100){
            count = 1;
        }
        console.log("mysql+request"+ count);
  });
}, 1000*60*60*7);