var mosca = require('mosca');
var mongoose = require('mongoose');

//var url = 'mongodb://localhost:27017/aqua-test';
var url = 'mongodb://localhost:27017/aqua';

var Device = require('./Device');
var Data = require('./Data');

var settings = {
	host : '103.253.147.227',
  port: 9999,
};

//Setup the Mosca server
var server = new mosca.Server(settings);

mongoose.Promise = global.Promise;
mongoose.connect(url);

//Wire up authentication & authorization to mosca
// topic and key
server.authenticate = function(client, username, password, callback){
    var authorized = false;
    
 	 // Use connect method to connect to the Server
	Device.findOne({username: username,password:password}, function(err, device) {
	  if (err) throw err;

	  // object of all the users
	  if(device)
	  {
	  	console.log('authenticate connection: ', client.id );

	  	if (device.username == username && device.password == password) 
		{
			client.topic = device.topic;
			authorized = true;			
		}
	  }

	  callback(null, authorized);
	}); 
}

server.authorizePublish = function(client, topic, payload, callback) {
  console.log('authorizePublish connection: ', topic );
  callback(null, client.topic === topic);
}

server.authorizeSubscribe =  function(client, topic, callback) {
  console.log('authorizeSubscribe connection: ', topic );
  callback(null, client.topic === topic);
}

server.on('ready', setup);

// Fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}

server.on('clientConnected', function(client) {
  console.log('New connection: ', client.id );
});

server.on('published', function(packet,client) {
  	if(client)
  	{
  	  const message = packet.payload.toString();

	  console.log('Topic: ', client.topic );
	  console.log('New message: ',message );
	  Device.findOne({topic: client.topic}, function(err, device) {
	    if (err) throw err;

	    // object of all the users
	    if(device)
	    {
	      
	      var newData = Data({
	        device_id: device._id,
	        topic: client.topic,
	        param: '',
	        value: message
	      })

	      newData.save(function(err) {
	        if (err) throw err;
	        console.log('Data created!');
	      });
	    }

	  });
	}
});