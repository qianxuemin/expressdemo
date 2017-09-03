//加载第三方模块
var express = require('express');
var app = express();
var mysql = require('mysql');

//配置swig
swig = require('swig');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use(express.static('public'));

//设置mysql
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'myexpress'
});

connection.connect();

//配置路由
app.get('/', function (req, res,next) {
    console.log('准备渲染');
    next();
  },function (req, res,next) {
  //res.send('Hello World!');
  //后台向前台传数据
  res.render('index',{
    title:"首页",
    data:"提交"
  });
});

app.get('/receive',function(req, res,next){
  var uname=req.query.username;
  // 无数据库时模拟直接返回数据
  // res.json({
  //  code:123,
  //  defaultuser:'qianxuemin',
  //  username:uname
  // });

//写到数据库
  var post  = {username:uname};
  var query = connection.query('INSERT INTO userinfo SET ?', post, function (error, results, fields) {
    if (error) {
      res.json({
       success:'no',
       defaultuser:'qianxuemin',
       msg:'username插入失败'
      });
    }else{
      res.json({
       success:'ok',
       defaultuser:'qianxuemin',
       msg:'username插入成功'
      });
    }
    
  });
})

/*容错机制*/
app.get('*',function(req, res,next){
	res.status(404);
	res.end('404')
});

app.use(function(err,req,res,next){
	res.status(500);
	res.end('error')
})

//启动服务
var server = app.listen(8089, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});