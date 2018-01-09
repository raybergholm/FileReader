import { ReadModes, LocalFileReader } from "./LocalFileReader.v3"

var fileInput, outputDiv, readModeDropdown, localFileReader;

window.onload = function (evt) {
    fileInput = document.getElementById("fileInput");
    if (fileInput !== null) {
        fileInput.addEventListener("change", handleFileInputChange);
    }

    outputDiv = document.getElementById("outputDiv");

    InitializeDropdown();
}

function handleFileInputChange(evt) {
    var readMode = readModeDropdown.value;

    if (evt.srcElement.files.length > 0) {
        clearUIElements();

        LocalFileReader(evt.srcElement.files, readMode)
            .then(onReadComplete);
    }
}

function onReadComplete(files) {
    console.log(files);
    for (var i = 0; i < files.length; i++) {
        var newDiv = createNewUIElement(files[i].file.name, files[i].content);
        outputDiv.appendChild(newDiv);
    }
}

function InitializeDropdown() {
    readModeDropdown = document.getElementById("readModeDropdown");
    if (readModeDropdown) {
        var newOption;

        for (mode in ReadModes) {
            newOption = document.createElement("option");
            newOption.value = ReadModes[mode];
            newOption.innerHTML = mode.replace(/([a-z])([A-Z])/g, '$1 $2').trim();

            readModeDropdown.appendChild(newOption);
            if (ReadModes[mode] === ReadModes.Text) {
                readModeDropdown.selectedIndex = readModeDropdown.length - 1;
            }
        }
    }
}

function createNewUIElement(header, content) {
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

function clearUIElements() {
    while (outputDiv.hasChildNodes()) {
        outputDiv.removeChild(outputDiv.lastChild);
    }
}