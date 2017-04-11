// JS FileReader extension. Reads the contents of a FileList into an internal array which contains the File object and its contents as read by FileReader.
// Copyright 2016 Raymond Bergholm - https://github.com/raybergholm - MIT licence.

function LocalFileReader(params){
	var errorTexts = {
		FILE_API_UNSUPPORTED: "File APIs unsupported: File, FileReader, FileList or Blob is missing",
		UNEXPECTED_READ_MODE: "Unexpected read mode: check if the input value matches the ReadMode enumeration"
	};

	if(!window.File || !window.FileReader || !window.FileList || !window.Blob){
		// Missing some support for the file APIs, throw an error.
		throw new Error(errorTexts.FILE_API_UNSUPPORTED);
	}

	this._fileBuffer = [];
	this._filesInQueue = 0;

	this._callbacks = {
		onReadCompleted: params.readCompleted || null
		// TODO 2: extra callbacks where applicable
	};

	/**
	 *	Getter for the file buffer, usable e.g. if the onReadCompleted callback was not defined.
	 */
	this.getFiles = function(){
		return this._fileBuffer;
	};

	/**
	 *	Get a single file from the file buffer.
	 */
	this.getFile = function(i){
		return this._fileBuffer[i] || null;
	};

	/**
	 *	Main function: gets a FileList input. For each one, reads the File using FileReader's read methods (read as array/binary/dataURL/text).
	 *
	 *	Params:
	 *		inputFiles: FileList
	 *		inputMode: attempt to read all the files in the FileList using this mode (see this.ReadMode for enumeration)
	 */
	this.read = function(inputFiles, inputMode){
		var currentFile, reader, mode;

		this._filesInQueue = inputFiles.length;

		for(var i = 0; i < inputFiles.length; i++){
			currentFile = {
				file: inputFiles[i],
				content: "",
				readMode: (Array.isArray(inputMode) && inputMode[i]) ? inputMode[i] : undefined
			};

			reader = new FileReader();
			reader.addEventListener("loadend", function(currentFile, evt){
				if (evt.target.readyState === FileReader.DONE) { // DONE === 2
					currentFile.content = evt.target.result;
					this._filesInQueue--;
					if(this._filesInQueue === 0){
						this._callbacks.onReadCompleted && this._callbacks.onReadCompleted(this._fileBuffer);
					}
				}
			}.bind(this, currentFile));

			mode = currentFile.readMode || inputMode || this.ReadMode.TEXT; // order of priority: fileBuffer entry's readMode, the general mode supplied to the read method, or Text as a fallback

			switch(mode){
				case this.ReadMode.ARRAY_BUFFER:
					reader.readAsArrayBuffer(currentFile.file);
					break;
				case this.ReadMode.BINARY:
					reader.readAsBinaryString(currentFile.file);
					break;
				case this.ReadMode.DATA_URL:
					reader.readAsDataURL(currentFile.file);
					break;
				case this.ReadMode.TEXT:
					reader.readAsText(currentFile.file);
					break;
				default:
					throw new Error(errorTexts.UNEXPECTED_READ_MODE); // occurs if an invalid read mode is supplied
			}

			this._fileBuffer.push(currentFile);
		}
	};

	/**
	 *	Clear the file buffer and read marker, call this if reusing the file reader for other file sets.
	 */
	this.clear = function(){
		while(this._fileBuffer.length > 0){
			this._fileBuffer.pop();
		}
		this._filesInQueue = 0;
	};

	/**
	 *	Wrapper function for this.read() in ArrayBuffer read mode.
	 */
	this.readAsArrayBuffer = function(inputFiles){
		this.read(inputFiles, this.ReadMode.ARRAY_BUFFER);
	};

	/**
	 *	Wrapper function for this.read() in Binary read mode.
	 */
	this.readAsBinary = function(inputFiles){
		this.read(inputFiles, this.ReadMode.BINARY);
	};

	/**
	 *	Wrapper function for this.read() in DataURL read mode.
	 */
	this.readAsDataURL = function(inputFiles){
		this.read(inputFiles, this.ReadMode.DATA_URL);
	};

	/**
	 *	Wrapper function for this.read() in Text read mode.
	 */
	this.readAsText = function(inputFiles){
		this.read(inputFiles, this.ReadMode.TEXT);
	};

	// This is at the end as this should only run when everything else has been set. If some files were passed into the constructor, read them immediately.
	if(params.files && params.files.length > 0){
		this.read(params.files, params.readMode); // TODO 1.2: currently this relies on being able to read RtwFileReader.ReadMode without instantiation
	}
}

LocalFileReader.ReadMode = {
	ARRAY_BUFFER: 'a',
	BINARY: 'b',
	DATA_URL: 'd',
	TEXT: 't'
};
