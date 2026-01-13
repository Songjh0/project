const fs = require('fs');
const main_view = fs.readFileSync('./main.html');
const orderlist_view = fs.readFileSync('./orderlist.html');

const mariadb = require('./database/connect/mariadb');

function main(response) {
    console.log("main");

    mariadb.query('SELECT * FROM product', function(err, rows) {
        console.log(rows);
    })

    response.writeHead(200, { 'Content-Type': 'text/html' }); 
    response.write(main_view); 
    response.end(); 
}

function redRacket (response) {
  fs.readFile('./img/redRacket.png', function(err, data) {
    response.writeHead(200, { 'Content-Type': 'image/png' }); 
    response.write(data); 
    response.end(); 
  })  
}

function blueRacket (response) {
  fs.readFile('./img/blueRacket.png', function(err, data) {
    response.writeHead(200, { 'Content-Type': 'image/png' }); 
    response.write(data); 
    response.end(); 
  })  
}

function blackRacket (response) {
  fs.readFile('./img/blackRacket.png', function(err, data) {
    response.writeHead(200, { 'Content-Type': 'image/png' }); 
    response.write(data); 
    response.end(); 
  })  
}

function order(response, productId) {
  response.writeHead(200, { 'Content-Type': 'text/html' });

  // mariadb 연결 후 쿼리문 실행
  mariadb.query("INSERT INTO orderlist VALUES (" + productId + ", '" + new Date().toLocaleDateString() + "');", function(err, rows) {
        console.log("연결");
        console.log(rows);
    })

    response.write('Thank you for your order! <br> you can check the result on the orderlist page.');
    response.end();
}

function orderlist(response) {
  console.log("orderlist");
  response.writeHead(200, { 'Content-Type': 'text/html' });

  //mariadb 연결 후 쿼리문 실행
  mariadb.query("SELECT * FROM orderlist;", function(err, rows) {
    response.write(orderlist_view);

    rows.forEach(element => {
      console.log("출력결과 : " + element.product_id, element.order_date);
      response.write("<tr>" 
                  + "<td>"+element.product_id+"</td>"
                  + "<td>"+element.order_date+"</td>" 
                  + "</tr>");
    });

    response.write("</table>");
    response.end();
  })
}

let handle = {}; // key:value 쌍으로 이루어진 변수 상자
handle["/"] = main; // "/" 뜻은 main이다.
handle['/order'] = order; // order page 이동
handle['/orderlist'] = orderlist;

/* img directory */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;


exports.handle = handle;