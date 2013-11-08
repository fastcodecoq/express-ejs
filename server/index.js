var express = require("express");
var app = express();
var conf = require("./conf.json");
var engine = require('ejs-locals');

/* 

var server = app.createServer().listen(conf.server_port); 
var io = require("socket.io").listen(server); 

io.set('transports', [
    'websocket',
    'htmlfile',
    'xhr-polling',
    'jsonp-polling',
]);

 io.sockets.on("connection", function(socket){
	
	   //.... todos los .on || .emit de acuerdo a tu app
	   // generalmente en la carpeta controllers meto todo estos metodos y hago 
	   // var io_controllers = require("./controllers/io_controllers.js");
	   // y dentro de ese archivo incluyo todos los .on y .emit
	
 });


//en caso de que quieras usar socket io en tu app descomenta esto

*/

app.engine('ejs', engine);

app.configure(function(){
	
	app.set('template_engine', 'ejs');
	app.use('views', __dirname.replace("server", "client") + '/views');
	app.use('view engine','ejs');
	app.use(express.bodyParser());
  	app.use(express.methodOverride());
  	app.use(express.cookieParser());
  	app.use(app.router);
 
 });

app.listen(conf.client_port);
console.log("cliente en: ", conf.client_port);
console.log(__dirname.replace("server", "client") + "/views/");

app.get("/", function(req, res){

	res.render("home",{ 		
		locals: 
	  	 { 
			message : "Hello world"  // aqui colocas todas las variables que usará el view
	     }
	   });

});


app.get("/login", function(req, res){

	res.render("login");

 });


app.post("/login", function(req, res){

	res.render("login",{ 		
		locals: 
	  	 { 
			  errorMsg : "Usuario o clave incorrecto!"  // aqui colocas todas las variables que usará el view
			, password : req.password
			, username : req.username
	     }
	   });

 });