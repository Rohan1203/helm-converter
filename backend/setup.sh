#!/usr/bin/env sh

export FLASK_APP=app

if [ -z ${GUNICORN_DEBUG+x} ]
then
	GUNICORN_WORKERS=4 gunicorn -c gunicorn_conf.py "app:app"
else
	GUNICORN_WORKERS=4 gunicorn -c gunicorn_conf.py "app:app" --reload
fi

# flask run
