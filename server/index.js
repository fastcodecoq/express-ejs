var express = require("express");
var app = express();
var conf = require("./conf.json");

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

app.configure(function(){
	
	app.use("views", __dirname.replace("server", "client") + "/views/");
	app.use("view engine","ejs");
	app.use(express.bodyParser());
  	app.use(express.methodOverride());
  	app.use(express.cookieParser());
 
 });

app.listen(conf.client_port);
console.log("cliente en: ", conf.client_port);

app.get("/", function(req, res){

	res.render("home.ejs",{ 		
		locals: 
	  	 { 
			message : "Hello world"  // aqui colocas todas las variables que usará el view
	     }
	   });

});


app.get("/login", function(req, res){

	res.render("login.ejs",{ 
		layout:false  // esto indica a ejs que no habrá contenido dinámico
	   });

 });


app.post("/login", function(req, res){

	res.render("login_res.ejs",{ 		
		locals: 
	  	 { 
			errorMsg : "Usuario o clave incorrecto!"  // aqui colocas todas las variables que usará el view
			, password : req.password
			, username : req.username
	     }
	   });

 });