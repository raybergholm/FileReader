var fileInput, outputDiv, readModeDropdown, localFileReader;

window.onload = function(evt){
    fileInput = document.getElementById("fileInput");
    if(fileInput !== null){
        fileInput.addEventListener("change", handleFileInputChange);
    }

    outputDiv = document.getElementById("outputDiv");

    InitializeDropdown();

    localFileReader = new LocalFileReader({
        callbacks: {
            load: onLoad,
            error: onError,
            readComplete: onReadComplete
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

function onLoad(file){
    console.log("Read operation successful for file " + file.file.name);
}

function onError(file){
    console.log("Read operation error for file " + file.file.name);
}

function onReadComplete(files){
    for(var i = 0; i < files.length; i++)
    {
        var newDiv = createNewUIElement(files[i].file.name, files[i].content);
        outputDiv.appendChild(newDiv);
    }
}

function InitializeDropdown(){
    readModeDropdown = document.getElementById("readModeDropdown");
    if(readModeDropdown){
        var newOption;

        for(mode in LocalFileReader.ReadMode){
            newOption = document.createElement("option");
            newOption.value = LocalFileReader.ReadMode[mode];
            newOption.innerHTML = mode.replace(/([a-z])([A-Z])/g, '$1 $2').trim();

            readModeDropdown.appendChild(newOption);
            if(LocalFileReader.ReadMode[mode] === LocalFileReader.ReadMode.Text){
                readModeDropdown.selectedIndex = readModeDropdown.length - 1;
            }
        }
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
