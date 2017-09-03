var express = require('express');
var app = express();
//配置swig
swig = require('swig');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use(express.static('public'));

//配置路由
app.get('/', function (req, res,next) {
  //res.send('Hello World!');
  res.render('index',{
  	title:"首页",
  	data:"提交"
  });
});

app.get('/receive',function(req, res,next){
  var uname=req.query.username
  console.log(req.query)
  res.json({
   code:123,
   defaultuser:'qianxuemin',
   username:uname
  })
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