var mqtt = require('mqtt')
  , host = 'localhost'
  , port = 9999;

var settings = {
  keepalive: 1000,
  protocolId: 'MQIsdp',
  protocol: 'mqtt',
  host: host,
  port:port,
  protocolVersion: 3,
  clientId: 'publisher',
  username:'asasdas',
  password:'wwwww'
}

// client connection
var client = mqtt.connect(settings);

setInterval(sendTemperature, 2000, client);

function sendTemperature(client){
  var t = {
    T: Math.random() * 100,
    Units: "C"
  };

  client.publish('asasdas', JSON.stringify(t));
}