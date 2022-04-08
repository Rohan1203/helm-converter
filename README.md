# Steps to run the server and UI
## Run the server
- Install the virtual envrionment packege: pip install virtualenv
- Create a folder to create your virtualenv within it
- Create a virtual environment: python3 -m virtualenv [virtual env-name]
- Activate virtual-environment: source [virtualenv name]/bin/activate
- Run the script to export the module and run: ./setup.sh

<!-- - export app module -> export FLASK_APP="app" -->
<!--     - by gunicorn: 
        - gunicorn -w 4 --reload -b localhost:5000 "app:app"
    - by flask: 
        - flask run -->

## RUN the UI (Using local server)
- Install browser-sync: npm install -g browser-sync
- Start the browser-sync: browser-sync start --server --files "**/*"
  

 ### Note: The Flask server is not a production WSGI server. So, GUNICORN is taking the responsibility of server management. You can have look into the setup.sh file; If want to run with flask just uncomment the flask line and commen out the gunicorn one.
