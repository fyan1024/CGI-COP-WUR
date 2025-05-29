import './kafka.js';

// Simulate sending a geospatial event to Kafka
async function sendLocationToKafka() {
  const message = {
    vehicleId: 'truck1',
    lat: 52.25,
    lng: 13.37,
    action: 'update'  // or 'query'
  };
  await producer.send({
    topic: 'vehicle-locations',
    messages: [{ value: JSON.stringify(message) }]
  });
  console.log('📨 Sent to Kafka:', message);
}

sendLocationToKafka();

