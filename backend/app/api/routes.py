from flask import jsonify
from flask import request
from flask import Blueprint
from flask import send_file
from flask import make_response
from flask import Response
import os
import json
from  app.service.operation import *
import re
import logging as log
import io
import zipfile
import time
import shutil


api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/helm', methods=['POST'])
def getData():
    request_json = request.get_json(force=True)
    ## sample json => {helmChartName:test, imageName=test, port:1000}
    helmChartName = request_json["helmChartName"]
    imageName = request_json["imageName"]
    port = request_json["port"]
    
    #return jsonify(jsonTest["image"])
    # output = stream.read()
    byte_res = createHelmChart(helmChartName, imageName, port)
    string_res = re.findall(r"'(.*?)'", byte_res , re.DOTALL)

    if(os.path.isdir('{}'.format(helmChartName))):
        # creating the zip
        makeZip('{}'.format(helmChartName))
    else:
        log.warning("Helm-Chart directory is not existing in server")
    
        
    if(string_res is not None and os.path.isfile('{}.zip'.format(helmChartName))):
        # log.warning("if getting called")
        # return Response(zipfile.ZipFile('{}.zip'.format(helmChartName).content), mimetype='application/zip', headers={'Content-Disposition':'attachment;"{}.zip".format(helmChartName)'})
        FILEPATH = r"{}.zip".format(helmChartName)
        fileobj = io.BytesIO()
        with zipfile.ZipFile(fileobj, 'w') as zip_file:
            zip_info = zipfile.ZipInfo(FILEPATH)
            zip_info.date_time = time.localtime(time.time())[:6]
            zip_info.compress_type = zipfile.ZIP_DEFLATED
            with open(FILEPATH, 'rb') as fd:
                zip_file.writestr(zip_info, fd.read())
        fileobj.seek(0)

        # delete the helm-chart
        print('Cleaning the workspace!')
        print('removing all content!')
        shutil.rmtree(helmChartName)
        os.remove('{}.zip'.format(helmChartName))

        return Response(fileobj.getvalue(),
                        mimetype='application/zip',
                        headers={'Content-Disposition': 'attachment;filename={}.zip'.format(helmChartName)})
        
    else:
        # log.warning("else getting called")
        return jsonify({"status":503})

#put validation of name in the client shoundn't contain space, make it like - separated or anything else

@api.route('/test', methods=['GET'])
def get():
    return "hi"

