FROM python:3.10-slim-buster

ENV PYTHONUNBUFFERED=1

RUN apt-get update \
    && apt-get -y install libpq-dev gcc

RUN pip3 install --no-cache --upgrade pip

WORKDIR /app
COPY requirements.txt .
RUN pip3 install --no-cache -r requirements.txt
COPY . .

EXPOSE 8000

CMD python3 manage.py migrate && python3 manage.py runserver 0.0.0.0:8000
