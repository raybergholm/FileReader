
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
            loadend: handleFileContents
        }
    });
}

function handleFileInputChange(evt){
    var readMode = readModeDropdown.value;

    if(evt.srcElement.files.length > 0){
        localFileReader.readFiles(evt.srcElement.files, readMode);
    }

}

function handleFileContents(files)
{
    for(var i = 0; i < files.length; i++)
    {
        var newDiv = document.createElement("div");
        newDiv.classList.add("col-md-4");

        var paragraphElement = document.createElement("p");
        paragraphElement.innerHTML = files[i].content;

        newDiv.appendChild(paragraphElement);
        outputDiv.appendChild(newDiv);
    }
}
