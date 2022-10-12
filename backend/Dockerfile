FROM python:3.10-alpine3.16

WORKDIR /app

RUN pip3 install --no-cache --upgrade pip

COPY requirements.txt .
RUN pip3 install --no-cache -r requirements.txt

COPY . .

EXPOSE 5000

CMD python3 server.py
