一、关于构建:
mkdir expressdemo           //新建文件夹
npm init                    //初始化package.json
npm install --save express  //安装express
type nul>app.js             //新建app.js
npm install --save swig     //安装模板引擎

模板必须放在views文件夹下

npm install --save mysql    //安装mysql


二、关于使用:
1、在项目目录下执行 npm install安装依赖
2、参照readme_mysql配置数据库
3、执行node app.js运行


三、关于核心：
express核心：中间件  next()  类似踩一个个小石头过河 串联起来达到终点