const { kafka } = require('../utils/kafkaConfig')
const producer = kafka.producer()

const sendAccidentEvent = async (location, severity, trainIds) => {
  await producer.connect()
  await producer.send({
    topic: 'accident-events',
    messages: [{
      value: JSON.stringify({
        timestamp: new Date().toISOString(),
        location: { lat: location.lat, lon: location.lon },
        severity, // 'high'/'medium'/'low'
        trainIds,
        status: 'pending' // pending/repairing/resolved
      })
    }]
  })
}

module.exports = { sendAccidentEvent }