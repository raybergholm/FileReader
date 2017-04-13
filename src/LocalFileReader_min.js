function LocalFileReader(a){var b={FILE_API_UNSUPPORTED:"File APIs unsupported: File, FileReader, FileList or Blob is missing",UNEXPECTED_READ_MODE:"Unexpected read mode: check if the input value matches the ReadMode enumeration",MISSING_CALLBACKS:"No callbacks supplied to read method",UNKNOWN_ERROR:"Unknown error"};this._fileBuffer=[],this._filesInQueue=0,this._callbacks={};var c=function(){if(!(window.File&&window.FileReader&&window.FileList&&window.Blob))throw new Error(errorTexts.FILE_API_UNSUPPORTED);null!=a&&a.hasOwnProperty("callbacks")&&this.registerCallbacks(a.callbacks)}.bind(this);this.getFiles=function(){return this._fileBuffer}.bind(this),this.getFile=function(a){return this._fileBuffer[a]||null}.bind(this),this.readFiles=function(a,c){var e,f;this.clear(),this._filesInQueue=a.length;for(var h=0;h<a.length;h++){switch(e={file:a[h],content:"",status:"NOT_READ",readMode:Array.isArray(c)&&c[h]?c[h]:void 0},f=new FileReader,d(f,e),e.readMode||c||LocalFileReader.ReadMode.TEXT){case LocalFileReader.ReadMode.ARRAY_BUFFER:f.readAsArrayBuffer(e.file);break;case LocalFileReader.ReadMode.BINARY:f.readAsBinaryString(e.file);break;case LocalFileReader.ReadMode.DATA_URL:f.readAsDataURL(e.file);break;case LocalFileReader.ReadMode.TEXT:f.readAsText(e.file);break;default:throw new Error(b.UNEXPECTED_READ_MODE)}this._fileBuffer.push(e)}}.bind(this),this.clear=function(){for(;this._fileBuffer.length>0;)this._fileBuffer.pop();this._filesInQueue=0}.bind(this),this.registerCallbacks=function(a){if(null==a)throw new Error(b.MISSING_CALLBACKS);this._callbacks=a}.bind(this);var d=function(a,c){if(null==a)throw new Error(b.UNKNOWN_ERROR);a.addEventListener("loadend",function(a){a.target.readyState===FileReader.DONE&&(c.content=a.target.result,this._filesInQueue--,this._callbacks&&this._callbacks.loadend&&this._callbacks.loadend(c),0===this._filesInQueue&&this._callbacks&&this._callbacks.readComplete&&this._callbacks.readComplete(this._fileBuffer))}.bind(this)),a.addEventListener("load",function(a){c.status="SUCCESS",this._callbacks&&this._callbacks.load&&this._callbacks.load(c)}.bind(this)),a.addEventListener("error",function(a){c.status="ERROR",this._callbacks&&this._callbacks.error&&this._callbacks.error(c)}.bind(this)),this._callbacks&&(this._callbacks.loadstart&&a.addEventListener("loadstart",function(a){this._callbacks.loadstart&&this._callbacks.loadstart(c)}.bind(this)),this._callbacks.progress&&a.addEventListener("progress",function(a){this._callbacks.progress&&this._callbacks.progress(c)}.bind(this)),this._callbacks.abort&&a.addEventListener("abort",function(a){this._callbacks.abort&&this._callbacks.abort(c)}.bind(this)))}.bind(this);c()}LocalFileReader.ReadMode={ARRAY_BUFFER:"A",BINARY:"B",DATA_URL:"D",TEXT:"T"};
