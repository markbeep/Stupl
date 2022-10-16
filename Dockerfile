FROM python:3.10-slim-buster

ENV PYTHONUNBUFFERED=1

RUN apt-get update \
    && apt-get -y install libpq-dev gcc

RUN pip3 install --no-cache --upgrade pip

WORKDIR /app
COPY backend/requirements.txt .
RUN python -m pip install --no-cache -r requirements.txt
COPY backend/ .

ENV DJANGO_SETTINGS_MODULE backend.settings

EXPOSE 8000

RUN python3 manage.py migrate
CMD python3 manage.py loaddata data/db.json && python3 manage.py runserver 0.0.0.0:8000
