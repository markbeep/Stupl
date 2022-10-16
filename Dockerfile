FROM python:3.10-slim-buster

ENV PYTHONUNBUFFERED=1

RUN apt-get update \
    && apt-get -y install libpq-dev gcc

RUN pip install --no-cache --upgrade pip

WORKDIR /app
RUN python -m pip install --no-cache gunicorn
COPY backend/requirements.txt .
RUN python -m pip install --no-cache -r requirements.txt
COPY backend/ .

ENV DJANGO_SETTINGS_MODULE backend.settings

EXPOSE 8000

CMD gunicorn backend.wsgi:application --bind 0.0.0.0:8000
