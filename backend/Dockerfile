FROM python:3.12-alpine

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# всё остальное монтируем томом, поэтому COPY не нужен
# CMD задаёт compose; здесь оставляем пусто

