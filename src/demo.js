
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
            allFilesReady: handleFileContents
        }
    });
}

function handleFileInputChange(evt){
    var readMode = readModeDropdown.value;

    if(evt.srcElement.files.length > 0){
        clearUIElements();
        localFileReader.readFiles(evt.srcElement.files, readMode);
    }
}

function handleFileContents(files)
{
    for(var i = 0; i < files.length; i++)
    {
        var newDiv = createNewUIElement(files[i].file.name, files[i].content);
        outputDiv.appendChild(newDiv);
    }
}

function createNewUIElement(header, content){
    var newDiv = document.createElement("div");
    newDiv.classList.add("col-md-4");

    var headerElement = document.createElement("h3");
    headerElement.innerHTML = header;

    var paragraphElement = document.createElement("p");
    paragraphElement.innerHTML = content;

    newDiv.appendChild(headerElement);
    newDiv.appendChild(paragraphElement);

    return newDiv;
}

function clearUIElements(){
    while(outputDiv.hasChildNodes()){
        outputDiv.removeChild(outputDiv.lastChild);
    }
}
