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
  clientId: 'subscriber',
  username:'asasdas',
  password:'wwwww'
}

// client connection
var client = mqtt.connect(settings);

client.subscribe("asasdas");

client.on('message', function(topic, message) {
  console.log('Received message'+message);
});