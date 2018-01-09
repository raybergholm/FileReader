// JS FileReader extension. Reads the contents of a FileList into an internal array which contains the File object and its contents as read by FileReader.
// Copyright 2018 Raymond Bergholm - https://github.com/raybergholm - MIT licence.

export const ReadModes = Object.freeze({
	ArrayBuffer: "A",
	Binary: "B",
	DataURL: "D",
	Text: "T"
});

export const LocalFileReader = (inputFiles, inputReadMode = "T") => {
	const errorTexts = {
		UNKNOWN_ENVIRONMENT: "No Window object, what environment are you running on?",
		FILE_API_UNSUPPORTED: "File APIs unsupported: File, FileReader, FileList or Blob is missing",
		NO_FILELIST: "No file list given",
		INVALID_FILELIST: "File list input was invalid  (not a FileList object)",
		UNEXPECTED_READ_MODE: "Unexpected read mode: check if the input value matches the ReadMode enumeration",
	};

	// Sanity checks
	if (!window) {
		throw new Error(errorTexts.UNKNOWN_ENVIRONMENT);
	} else if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
		throw new Error(errorTexts.FILE_API_UNSUPPORTED);
	} else if (!inputFiles) {
		throw new Error(errorTexts.NO_FILELIST);
	} else if (!inputFiles instanceof FileList) {
		throw new Error(errorTexts.INVALID_FILELIST);
	} else if (Object.values(ReadModes).indexOf(inputReadMode) === -1) {
		throw new Error(errorTexts.UNEXPECTED_READ_MODE);
	}

	return Promise.all(Array.from(inputFiles).map((file) => {
		return new Promise((resolve, reject) => {
			let fileReader = new FileReader();

			fileReader.addEventListener("load", (evt) => {
				resolve({
					file: file,
					content: evt.target.result
				});
			});

			fileReader.addEventListener("error", (evt) => {
				reject({
					file: file,
					error: fileReader.error
				});
			});

			switch (inputReadMode) {
				case ReadModes.ArrayBuffer:
					fileReader.readAsArrayBuffer(file);
					break;
				case ReadModes.Binary:
					fileReader.readAsBinaryString(file);
					break;
				case ReadModes.DataURL:
					fileReader.readAsDataURL(file);
					break;
				case ReadModes.Text:
					fileReader.readAsText(file);
					break;
			}
		});
	}));
}