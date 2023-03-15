var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const http = require('http');

http.createServer((req, res) => {
  // 여기에 어떻게 응답할 지 적어줍니다.
});

const DBString = {
  server: "localhost",
  database: "db_mps_sns",
  user: "mpssns",
  password: "mpssns1243!@",
  port: 5432
};

const { Pool } = require('pg');
const mybatisMapper = require('mybatis-mapper');  //매핑할 마이바티스

mybatisMapper.createMapper(['./mapper/testMapper.xml']);

//조회할 파라미터
let param = {
	test_id : 1
}

const pool = new Pool(DBString);

//질의문 형식
let format = { language: 'sql', indent: '  ' };
let query = mybatisMapper.getStatement('testMapper', 'testBasic', param, format);
//첫번째는 xml의 name값, 두번째는 해당 xml의 id값, 세번째는 파라미터, 마지막은 포맷 입니다.

console.log(query);  //해당쿼리가 조합된 것을 볼 수 있습니다.

const getTbTest = async (test_id) => {
	const client = await pool.connect();

	try {
		const test = await mybatisMapper.get('testMapper', 'testBasic', { test_id }, { connection: client });

		return test;
	} catch (error) {
		throw error;
	} finally {
		client.release();
	}
};

getTbTest(1)
	.then((test) => console.log(test))
	.catch((error) => console.error(error));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var serverRouter1 = require('./routes/server1');
var serverRouter2 = require('./routes/server2');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/server1', serverRouter1);
app.use('/server2', serverRouter2);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
