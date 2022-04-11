export FLASK_APP=app
gunicorn -w 2 --reload -b localhost:5000 "app:app"
# flask run
