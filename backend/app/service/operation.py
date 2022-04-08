from flask import jsonify
import os
import subprocess
import os
import zipfile



def createHelmChart(helmChartName, imageName, port):
    cmd = ['helm', 'create', '{}'.format(helmChartName)]
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    out, err = p.communicate()
    print(out)
    return out.decode("utf-8")


def makeZip(helmChartName):
    zf = zipfile.ZipFile("{}.zip".format(helmChartName), "w")
    for dirname, subdirs, files in os.walk(helmChartName):
        zf.write(dirname)
        for filename in files:
            zf.write(os.path.join(dirname, filename))
    zf.close()




'''
logic for CaaS standard
'''