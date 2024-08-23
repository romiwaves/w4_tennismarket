let server = require('./server');
let router = require('./router');
let requestHandler = require('./requestHandler');

const mariadb = require('./database/connect/mariadb')
mariadb.connect();
//모듈을 불러와서 내가 실행하고 싶을 때만 실행시키고 싶음
server.start(router.route, requestHandler.handle);