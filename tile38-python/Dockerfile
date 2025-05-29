FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY tile38_worker.py .
CMD ["python", "tile38_worker.py"]
