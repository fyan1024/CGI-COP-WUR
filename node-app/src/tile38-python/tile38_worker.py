import asyncio
from pyle38 import Tile38
from kafka import KafkaConsumer
import os

async def handle_tile38_operations():
    # Connect to Tile38 leader (from Docker)
    tile38 = Tile38(url="redis://tile38-leader:9851")

    # Kafka consumer
    consumer = KafkaConsumer(
        'vehicle-locations',
        bootstrap_servers=['kafka:9092'],
        value_deserializer=lambda x: json.loads(x.decode('utf-8'))
    )

    for message in consumer:
        data = message.value
        if data['action'] == 'update':
            # Update Tile38 with new coordinates
            await tile38.set("fleet", data['vehicleId']).point(data['lat'], data['lng']).exec()
            print(f"📍 Updated Tile38: {data['vehicleId']} at ({data['lat']}, {data['lng']})")

        elif data['action'] == 'query':
            # Query nearby vehicles (example: 1km radius)
            response = await tile38.within("fleet").circle(data['lat'], data['lng'], 1000).asObjects()
            print("🔍 Nearby vehicles:", response.dict())

if __name__ == "__main__":
    asyncio.run(handle_tile38_operations())
