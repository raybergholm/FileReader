# LocalFileReader

A JavaScript file reader, extends functionality of the built-in JS FileReader. The use case for this script is when you upload files on the browser to be send to the backend, however you still need to be able to read the file locally (e.g. for data validation purposes).

This reads the contents of a FileList into an internal array which contains the File object and its contents as read by FileReader.

Use demo.html for a basic demonstration.

### Quick use guide

When instantiating the LocalFileReader, pass in the callbacks to the constructor:

```javascript
    localFileReader = new LocalFileReader({
        callbacks: {
            load: onLoad,
            error: onError,
            readComplete: onReadComplete
        }
    });
```

Afterwards, when you need to read file contents call `readFiles()` and pass in the fileList and read mode:

```javascript
    var files = document.getElementById("multipleFileInput").files; // substitute in your file list source
    var readMode = LocalFileReader.TEXT;    // use whichever mode you need
    localFileReader.readFiles(files, readMode);
```

The callbacks will be called where applicable.

### Callbacks

This callback comes with the contents of `_fileBuffer` in the callback's first argument.
* readComplete: fired when the read operation has been completed for all the input files.

All of these callbacks have the corresponding file in the callback's first argument.
* loadstart: fired when the read operation starts.
* progress: fired when the read operation is in progress.
* load: fired when the read operation finished successfully.
* error: fired when the read operation fails.
* abort: fired when the read operation was aborted.
