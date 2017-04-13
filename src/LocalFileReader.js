// JS FileReader extension. Reads the contents of a FileList into an internal array which contains the File object and its contents as read by FileReader.
// Copyright 2016 Raymond Bergholm - https://github.com/raybergholm - MIT licence.

function LocalFileReader(params){
	var _errorTexts = {
		FILE_API_UNSUPPORTED: "File APIs unsupported: File, FileReader, FileList or Blob is missing",
		UNEXPECTED_READ_MODE: "Unexpected read mode: check if the input value matches the ReadMode enumeration",
		MISSING_CALLBACKS: "No callbacks supplied to read method",
		UNKNOWN_ERROR: "Unknown error"
	};

	this._fileBuffer = [];
	this._filesInQueue = 0;
	this._callbacks = {};

	var init = function(){
		if(!window.File || !window.FileReader || !window.FileList || !window.Blob){
			// Missing some support for the file APIs, throw an error.
			throw new Error(errorTexts.FILE_API_UNSUPPORTED);
		}

		if(params != null){
			if(params.hasOwnProperty("callbacks")){
				this.registerCallbacks(params.callbacks);
			}
		}
	}.bind(this);

	/**
	 *	Getter for the file buffer, usable e.g. if the loadend callback was not defined.
	 */
	this.getFiles = function(){
		return this._fileBuffer;
	}.bind(this);

	/**
	 *	Get a single file from the file buffer.
	 */
	this.getFile = function(i){
		return this._fileBuffer[i] || null;
	}.bind(this);

	/**
	 *	Main function: gets a FileList input. For each one, reads the File using FileReader's read methods (read as array/binary/dataURL/text).
	 *
	 *	Params:
	 *		inputFiles: a FileList
	 *		inputMode: attempt to read all the files in the FileList using this mode (see LocalFileReader.ReadMode for enumeration). Alternatively, supply an array of read modes if each file needs a different mode
	 */
	this.readFiles = function(inputFiles, inputReadMode){
		var currentFile, reader, mode;

		this.clear();

		this._filesInQueue = inputFiles.length;

		for(var i = 0; i < inputFiles.length; i++){
			currentFile = {
				file: inputFiles[i],
				content: "",
				status: "NOT_READ",
				readMode: (Array.isArray(inputReadMode) && inputReadMode[i]) ? inputReadMode[i] : undefined
			};

			reader = new FileReader();
			attachCallbacks(reader, currentFile);

			mode = currentFile.readMode || inputReadMode || LocalFileReader.ReadMode.TEXT; // order of priority: fileBuffer entry's readMode, the general mode supplied to the readFiles method, or Text as a fallback

			switch(mode){
				case LocalFileReader.ReadMode.ARRAY_BUFFER:
					reader.readAsArrayBuffer(currentFile.file);
					break;
				case LocalFileReader.ReadMode.BINARY:
					reader.readAsBinaryString(currentFile.file);
					break;
				case LocalFileReader.ReadMode.DATA_URL:
					reader.readAsDataURL(currentFile.file);
					break;
				case LocalFileReader.ReadMode.TEXT:
					reader.readAsText(currentFile.file);
					break;
				default:
					throw new Error(_errorTexts.UNEXPECTED_READ_MODE); // occurs if an invalid read mode is supplied
			}

			this._fileBuffer.push(currentFile);
		}
	}.bind(this);

	/**
	 *	Clear the file buffer and read marker
	 */
	this.clear = function(){
		while(this._fileBuffer.length > 0){
			this._fileBuffer.pop();
		}
		this._filesInQueue = 0;
	}.bind(this);

	this.registerCallbacks = function(callbacks){
		if(callbacks == null){
			throw new Error(_errorTexts.MISSING_CALLBACKS); // no callbacks supplied
		}

		this._callbacks = callbacks;
	}.bind(this);

	var attachCallbacks = function(fileReader, currentFile)
	{
		if(fileReader == null)
		{
			throw new Error(_errorTexts.UNKNOWN_ERROR); // this should never happen...
		}

		// Mandatory callbacks
		fileReader.addEventListener("loadend", function(evt){ // track when files have been read (whether success or failure)
			if (evt.target.readyState === FileReader.DONE) { // DONE === 2
				currentFile.content = evt.target.result;
				this._filesInQueue--;

				this._callbacks && this._callbacks.loadend && this._callbacks.loadend(currentFile);

				if(this._filesInQueue === 0){
					this._callbacks && this._callbacks.readComplete && this._callbacks.readComplete(this._fileBuffer);
				}
			}
		}.bind(this));

		fileReader.addEventListener("load", function(evt){ // marks file as successfully read
			currentFile.status = "SUCCESS";
			this._callbacks && this._callbacks.load && this._callbacks.load(currentFile);
		}.bind(this));

		fileReader.addEventListener("error", function(evt){ // marks read operation as unsuccessful
			currentFile.status = "ERROR";
			this._callbacks && this._callbacks.error && this._callbacks.error(currentFile);
		}.bind(this));

		// Optional callbacks for extra handling
		if(this._callbacks){
			if(this._callbacks.loadstart){
				fileReader.addEventListener("loadstart", function(evt){
					this._callbacks.loadstart && this._callbacks.loadstart(currentFile);
				}.bind(this));
			}

			if(this._callbacks.progress){
				fileReader.addEventListener("progress", function(evt){
					this._callbacks.progress && this._callbacks.progress(currentFile);
				}.bind(this));
			}

			if(this._callbacks.abort){
				fileReader.addEventListener("abort", function(evt){
					this._callbacks.abort && this._callbacks.abort(currentFile);
				}.bind(this));
			}
		}
	}.bind(this);

	init();
}

LocalFileReader.ReadMode = {
	ARRAY_BUFFER: 'A',
	BINARY: 'B',
	DATA_URL: 'D',
	TEXT: 'T'
};
