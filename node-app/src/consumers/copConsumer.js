const { kafka } = require('../utils/kafkaConfig')
const consumer = kafka.consumer({ groupId: 'cop-consumer' })

const startCOPConsumer = async () => {
  await consumer.connect()
  await consumer.subscribe({ topics: ['accident-events', 'repair-teams'] })

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const data = JSON.parse(message.value.toString())
      console.log(`[COP系统接收] 主题:${topic}`, data)
      
      // 这里添加COP系统的逻辑处理（如可视化、警报触发等）
      if (topic === 'accident-events' && data.severity === 'high') {
        triggerEmergencyProtocol(data.location)
      }
    }
  })
}

const triggerEmergencyProtocol = (location) => {
  // 联动Tile38进行地理围栏分析
  console.log(`! 紧急协议触发：派遣救援至 ${JSON.stringify(location)}`)
}

module.exports = { startCOPConsumer }