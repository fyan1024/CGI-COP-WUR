const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'railway-cop-system',
  brokers: ['kafka:9092']
})

module.exports = { kafka }