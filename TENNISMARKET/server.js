let http = require('http');
let url = require('url');

//start 함수 생성
function start(route, handle) {
  function onRequest(request, response) { 
    let pathname = url.parse(request.url).pathname;
    let queryData = url.parse(request.url, true).query; //??

    route(pathname, handle, response, queryData.productId);

  }

  http.createServer(onRequest).listen(8888);
}

exports.start = start; //start 함수 다른 파일에서도 사용할 수 있도록 내보내기