FROM python:3.10-slim-buster
WORKDIR /app

RUN pip3 install --no-cache --upgrade pip

COPY requirements.txt .
RUN pip3 install --no-cache -r requirements.txt

COPY . .

EXPOSE 8080

CMD python3 server.py
