// 1. node index.js 입력 후 첫번째로 실행됨
let server = require('./server');
let router = require('./router');
let requestHandler = require('./requestHandler');

const mariadb = require('./database/connect/mariadb');
mariadb.connect(); //데이터베이스 연결

server.start(router.route, requestHandler.handle); //start 함수에 route 모듈에 있는 route 함수 전달