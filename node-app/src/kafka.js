// import { Kafka } from 'kafkajs';

// const kafka = new Kafka({
//   clientId: 'node-app',
//   brokers: ['kafka:9092']  // Matches Docker service name
// });

// const producer = kafka.producer();
// await producer.connect();
// console.log("✅ Connected to Kafka!");

import { Kafka } from 'kafkajs';
const kafka = new Kafka({ brokers: ['kafka:9092'] });
export const producer = kafka.producer();
await producer.connect();
