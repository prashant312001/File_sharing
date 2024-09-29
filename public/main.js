var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

socket.on('connected', function(data) {
    document.getElementById('status').innerText = data.message;
});

function sendFile() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            socket.emit('send_file', { 
                filename: file.name, 
                filedata: e.target.result 
            });
            alert('File sent: ' + file.name);
        };
        reader.readAsDataURL(file);
    }
}

socket.on('receive_file', function(data) {
    var receivedFiles = document.getElementById('receivedFiles');
    var link = document.createElement('a');
    link.href = data.filedata;
    link.download = data.filename;
    link.innerText = 'Download ' + data.filename;
    receivedFiles.appendChild(link);
    receivedFiles.appendChild(document.createElement('br'));
});
