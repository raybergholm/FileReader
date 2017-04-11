
var fileInput, outputDiv, readModeDropdown, localFileReader;

window.onload = function(evt){
    fileInput = document.getElementById("fileInput");
    if(fileInput !== null){
        fileInput.addEventListener("change", handleFileInputChange);
    }

    outputDiv = document.getElementById("outputDiv");
    readModeDropdown = document.getElementById("readModeDropdown");

    localFileReader = new LocalFileReader({
        callbacks: {
            loadend: function(files){
                for(var i = 0; i < files.length; i++)
                {
                    console.log(files[i].value);
                }
            }
        }
    });
}

function handleFileInputChange(evt){
    var readMode = readModeDropdown.value;
    
    if(evt.srcElement.files.length > 0){
        localFileReader.readFiles(evt.srcElement.files, readMode);
    }

}
