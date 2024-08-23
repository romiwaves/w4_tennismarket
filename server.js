let http = require('http'); //node.js가 갖고 있는 모듈을 부르는 함수
let url = require('url');

//자바스크립트 함수는 함수가 작성된 파일 안에서만 사용 가능
//밖으로 빼내겠다고 알려줘야 다른 파일에서도 사용 가능
function start(route, handle) {
    //request, response 변수는 node.js가 알아서 넣어줌
    function onRequest(request, response) {
        let pathname = url.parse(request.url).pathname;
        let queryData = url.parse(request.url, true).query;

        route(pathname, handle, response, queryData.productId);
    }

    //서버를 만들어주는 함수 createServer
    http.createServer(onRequest).listen(8888);
}

//바깥에서 start를 사용할 수 있도록 할게~!
exports.start = start;