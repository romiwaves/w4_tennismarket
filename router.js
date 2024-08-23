function route(pathname, handle, response, productId) {
    console.log('pathname : ' + pathname);

    //handle[pathname]이 있는지 확인
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, productId); //함수가 존재하면 호출
    } else {
        response.writeHead(404, {'Content-Type' : 'text-html'})
        response.write('Not Found')
        response.end();
    }

    //handle[pathname](response);
}

exports.route = route;