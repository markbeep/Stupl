FROM python:3.10-slim-buster

ENV PYTHONUNBUFFERED=1

RUN apt-get update \
    && apt-get -y install libpq-dev gcc

RUN pip3 install --no-cache --upgrade pip

WORKDIR /app
COPY requirements.txt .
RUN python -m pip install --no-cache -r requirements.txt
COPY . .

ENV DJANGO_SETTINGS_MODULE backend.settings

EXPOSE 8000

CMD python manage.py migrate --no-input && python manage.py runserver 0.0.0.0:8000
