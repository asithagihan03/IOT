var mqtt = require('mqtt')
  , host = '103.253.147.227'
  , port = 9999;

var settings = {
  keepalive: 1000,
  protocolId: 'MQIsdp',
  protocol: 'mqtt',
  host: host,
  port:port,
  protocolVersion: 3,
  clientId: 'publisher',
  username:'firsttopic',
  password:'1qaz2wsx'
}

// client connection
var client = mqtt.connect(settings);

setInterval(sendTemperature, 2000, client);

function sendTemperature(client){
  console.log('send temperature');
  var t = {
    T: Math.random() * 100,
    Units: "C"
  };

  client.publish('firsttopic', JSON.stringify(t));
}