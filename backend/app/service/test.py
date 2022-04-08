from flask import Response # Changed line
import io
import zipfile
import time

def download():
    
    FILEPATH = r"C:\Users\JD\Downloads\trydownload.zip"
    fileobj = io.BytesIO()
    with zipfile.ZipFile(fileobj, 'w') as zip_file:
        zip_info = zipfile.ZipInfo(FILEPATH)
        zip_info.date_time = time.localtime(time.time())[:6]
        zip_info.compress_type = zipfile.ZIP_DEFLATED
        with open(FILEPATH, 'rb') as fd:
            zip_file.writestr(zip_info, fd.read())
    fileobj.seek(0)

    # Changed line below
    return Response(fileobj.getvalue(),
                    mimetype='application/zip',
                    headers={'Content-Disposition': 'attachment;filename=your_filename.zip'})


'''
pep8 validation

'''
 