//file sync 모듈 받아오기 -> 만들어둔 html을 가져올 수 있음
const fs = require('fs');
//fs야, 파일을 읽어줘. 내 파일은 main.html이고 utf-8로 작성했어
const main_view = fs.readFileSync('./main.html', 'utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8');

const mariadb = require('./database/connect/mariadb');

function main(response) {
    console.log('main');

    mariadb.query("SELECT * FROM product", function(err, rows) {
        console.log(rows);
    })
    response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(main_view);
        response.end();
}

function orderlist(response) {
    console.log('orderlist');

    response.writeHead(200, {'Content-Type' : 'text-html'});

    mariadb.query("SELECT * FROM orderlist", function(err, rows) {
        response.write(orderlist_view);

        rows.forEach(element => {
            response.write("<tr>"
                        + "<td>"+element.product_id+"</td>"
                        + "<td>"+element.order_date+"</td>"
                        + "</tr>");
            
        });
        response.write("</table>");
        response.end();
    })
}

function redRacket(response) {
    fs.readFile('./img/redRacket.png', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'img/png'});
        response.write(data);
        response.end();
    })
}

function blueRacket(response) {
    fs.readFile('./img/blueRacket.png', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'img/png'});
        response.write(data);
        response.end();
    })
}

function blackRacket(response) {
    fs.readFile('./img/blackRacket.png', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'img/png'});
        response.write(data);
        response.end();
    })
}

function order(response, productId) {
    response.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query("INSERT INTO orderlist VALUES (" +productId+ ", '"+new Date().toLocaleDateString()+ "');", function(err, rows) {
        console.log(rows);
    })
        response.write('Thank you for your order! <br> You can check your order on the order list page.');
        response.end();
}

/*
function favicon(response) {
    console.log('favicon');

    response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write('Stop Making Error');
        response.end();
}
*/

let handle = {}; //key:value쌍으로 이루어진 변수 상자
//말하자면 사전처럼 사용됨
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;
//handle['/favicon.ico'] = favicon;
/* 이미지 경로 image directory */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;


exports.handle = handle;