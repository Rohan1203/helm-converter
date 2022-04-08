// $(document).ready(function() {
//     $('#Create').prop('disabled', true);
  
//     function validateNextButton() {
//       var buttonDisabled = $('#Helm-ChartName').val().trim() === '' || $('#ImageName').val().trim() === '' || $('#Port').val().trim() === '';
//       $('#Create').prop('disabled', buttonDisabled);
//     }
    
//     $('#Helm-ChartName').on('keyup', validateNextButton);
//     $('#ImageName').on('keyup', validateNextButton);
//     $('#Port').on('keyup', validateNextButton);

// });



function ready(){
    $('#Create').prop('disabled', true);

    $('#Deploy').attr('disabled',true);
        $('#Helm-File').change(
            function(){
                if ($(this).val()){
                    $('#Deploy').removeAttr('disabled'); 
                }
                else {
                    $('#Deploy').attr('disabled',true);
                }
            });
  
    function validateNextButton() {
      var buttonDisabled = $('#Helm-ChartName').val().trim() === '' || $('#ImageName').val().trim() === '' || $('#Port').val().trim() === '';
      $('#Create').prop('disabled', buttonDisabled);
    }
    
    $('#Helm-ChartName').on('keyup', validateNextButton);
    $('#ImageName').on('keyup', validateNextButton);
    $('#Port').on('keyup', validateNextButton);
}

function alert_func(header, description, color){
    var close = document.getElementsByClassName("closebtn");
    var alert = document.getElementById('alert');
    var head = document.getElementById('alertHead');
    var desc = document.getElementById('alertDesc');
    var i;

    head.innerHTML = header;
    desc.innerHTML = description;
    alert.style.background = color;

    alert.style.visibility = 'visible';
    
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function(){
        var div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(function(){ div.style.display = "none"; }, 600);
        }
    
        setTimeout(()=>{
        // alert.style.opacity = "0";
        // alert.style.display = "none";
        alert.style.opacity = "0";
    
        alert.style.transition = 'all 1s';
        }, 3000)
    } 
}

$(document).ready(function() {
    ready();
});

function createHelmChart(){
    var helmChartName = document.getElementById("Helm-ChartName").value;
    var imageName = document.getElementById("ImageName").value;
    var port = document.getElementById("Port").value;
    var download_sec = document.getElementById('a_d');
    // var download_btn = document.getElementById("a_d");

    // close and clear all fields
    // $('#exampleModal').modal('hide');
    $('#Helm-ChartName').val('');
    $('#ImageName').val('');
    $('#Port').val('');

    const root = 'http://localhost:5000/api/';
    const uri = root + 'helm';

    var payload = {
        "helmChartName": helmChartName,
        "imageName": imageName,
        "port": port
    }

    axios({
        url: 'http://localhost:5000/api/helm',
        method: 'POST',
        data: JSON.stringify(payload),
        responseType: 'blob', // important
      })
      .then((response) => {
          console.log(response)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            // const link = document.createElement('a');
            link = document.getElementById('a_d');
            link.href = url;
            link.setAttribute('download', `${helmChartName}.zip`);
            document.body.appendChild(link);

            if(link.href != ""){
                
                var header = 'Success!';
                var description = 'Helm chart created successfully & ready for download.';
                var color = '#28A744';

                alert_func(header, description, color);

                download_sec.scrollTop = download_sec.scrollHeight - download_sec.clientHeight;

                setTimeout(()=>{
                    download_sec.style.visibility = 'visible';
                    $('#Helm-ChartName').val('');
                    $('#ImageName').val('');
                    $('#Port').val('');

                    ready();
                    
                },1000);

                // setTimeout(()=>{
                //     location.reload();
                // }, 5000);
            }
            
            link[0].click();
        }).catch((error) =>{
            console.log(error.message);
            if(error.message == "Network Error"){
                ready();
                var header = 'Error!';
                var description = 'Server is not responding to the request.';
                var color = '#f44336';

                alert_func(header, description, color);

                setTimeout(()=>{
                    location.reload();
                }, 5000);
            }
        })
    

    
    return false;
    
}


//working code 1
// let options = {
//     method: 'POST',
//     mode: 'cors',
//     body: JSON.stringify(payload)
// }

// let req = new Request(uri, options);

// fetch(req)
//     .then((response)=>{
//         if(response.ok){
//             div_console.innerHTML += " ➜  [INFO]" + " Status:" + response["status"] + "<br>";
//             console.log(response)
//             return response;
//         }else{
//             throw new Error('Server is not responding to the request')
//         }
//     })
//     .then((response) =>{
//         if(response["status"] == 201){
//             div_console.innerHTML += " ➜  [SUCCESS]" + `  Successfully created <b style="color=red">[${helmChartName}]</b> Helm-Chart` + "<br>";
//         } else {
//         div_console.innerHTML += " ➜  [FAILURE]" + " " + `  Server couldn't procces the <b style="color:red">[${helmChartName}]</b> Helm-Chart request` + "<br>";
//         }
//         console.log(response);
//     })
//     .catch((err) =>{
//         div_console.innerHTML += " ➜  [Failure]" + " " + err.message + "<br>";
//     });



// working code 2
// $.ajax({
//     type: "POST",
//     url: 'http://localhost:5000/api/helm',
//     data: JSON.stringify(payload),
//     xhrFields: {
//         responseType: 'blob' // to avoid binary data being mangled on charset conversion
//     },
//     success: function(blob, status, xhr) {
//         // check for a filename
//         var filename = "";
//         var disposition = xhr.getResponseHeader('Content-Disposition');
//         if (disposition && disposition.indexOf('attachment') !== -1) {
//             var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
//             var matches = filenameRegex.exec(disposition);
//             if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
//         }

//         if (typeof window.navigator.msSaveBlob !== 'undefined') {
//             // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
//             window.navigator.msSaveBlob(blob, filename);
//         } else {
//             var URL = window.URL || window.webkitURL;
//             var downloadUrl = URL.createObjectURL(blob);

//             if (filename) {
//                 // use HTML5 a[download] attribute to specify filename
//                 var a = document.createElement("a");
//                 // safari doesn't support this yet
//                 if (typeof a.download === 'undefined') {
//                     window.location.href = downloadUrl;
//                 } else {
//                     a.href = downloadUrl;
//                     a.download = filename;
//                     document.body.appendChild(a);
//                     // download_btn.body.appendChild(a);
//                     a.click();
//                 }
//             } else {
//                 window.location.href = downloadUrl;
//             }

//             setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 1000); // cleanup
//         }
//     }
// });