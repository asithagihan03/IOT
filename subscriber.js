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
  clientId: 'subscriber',
  username:'firsttopic',
  password:'1qaz2wsx'
}

// client connection
var client = mqtt.connect(settings);

client.subscribe("firsttopic");

client.on('message', function(topic, message) {
  console.log('Received message'+message);
});