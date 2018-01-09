// JS FileReader extension. Reads the contents of a FileList into an internal array which contains the File object and its contents as read by FileReader.
// Copyright 2018 Raymond Bergholm - https://github.com/raybergholm - MIT licence.

// JS FileReader extension. Reads the contents of a FileList into an internal array which contains the File object and its contents as read by FileReader.
// Copyright 2018 Raymond Bergholm - https://github.com/raybergholm - MIT licence.

class LocalFileReader {

	static ReadMode = {

	};

	constructor(){

	}
	read()
}

var LocalFileReader = (inputFiles, inputReadMode) => {
	const errorTexts = {
		FILE_API_UNSUPPORTED: "File APIs unsupported: File, FileReader, FileList or Blob is missing",
		UNEXPECTED_READ_MODE: "Unexpected read mode: check if the input value matches the ReadMode enumeration",
		MISSING_CALLBACKS: "No callbacks supplied to read method",
		UNKNOWN_ERROR: "Unknown error"
	};

	const defaultParams = {
		readMode: "TEXT"
	};

	if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
		// Missing some support for the file APIs, throw an error.
		throw new Error(errorTexts.FILE_API_UNSUPPORTED);
	}

	const readMode = Array.isArray(inputReadMode) ? inputReadMode : ;

	
}

LocalFileReader.ReadMode = {

};