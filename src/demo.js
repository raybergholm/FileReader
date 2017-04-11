
var fileInput, outputDiv, localFileReader;

window.onload = function(evt){
    fileInput = document.getElementById("fileInput");
    if(fileInput !== null){
        fileInput.addEventListener("change", handleFileInputChange);
    }

    outputDiv = document.getElementById("outputDiv");
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
    console.log(evt);
}
