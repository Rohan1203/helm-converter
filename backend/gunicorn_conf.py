import os

reload = bool(os.environ.get('GUNICORN_RELOAD', False))
bind = os.environ.get('GUNICORN_BIND', '0.0.0.0:5000')

sendfile = False
timeout = 6000
workers = int(os.environ.get('GUNICORN_WORKERS', '1'))
worker_connections = 1000
limit_request_line = 32000
limit_request_field_size = 32000

loglevel = (os.environ.get('GUNICORN_LOGLEVEL', 'info')).lower()
accesslog = 'gunicorn.log'
# access_log_format = (
#     '{"@timestamp": "%({@timestamp}a)s", '
#     '"@version": "%({version}a)s" ,'
#     '"message": "%(r)s", '
#     '"@source_host": "%({@source_host}a)s", '
#     '"level": "%({level}a)s", '
#     '"clientVersion": "%({client_version}a)s", '
#     '"logger": "%({logger}a)s", '
#     '"container": "%({container}a)s", '
#     '"client_id": "%({http_x_client_id}e)s", '
#     '"request_id": "%({http_x_request_id}e)s"}')