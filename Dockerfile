FROM python:3.10-alpine

ENV PYTHONUNBUFFERED=1

RUN pip3 install --no-cache --upgrade pip

WORKDIR /app
COPY backend/requirements.txt .
RUN python -m pip install --no-cache -r requirements.txt
COPY backend/ .

ENV DJANGO_SETTINGS_MODULE backend.settings

EXPOSE 8000

RUN python3 manage.py migrate

COPY entrypoint.sh .
ENTRYPOINT [ "sh", "./entrypoint.sh" ]
