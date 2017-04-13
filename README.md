# LocalFileReader

A JavaScript file reader which extends the functionality of the standard FileReader. This class adds an extra abstraction layer to the basic FileReader to simplify usage and keep the read results linked to its respective file.

Check out the demo files for a basic demonstration.

### Quick use guide

First, instantiate the LocalFileReader by passing in the callbacks to the constructor:

```javascript
    localFileReader = new LocalFileReader({
        callbacks: {
            load: onLoad,
            error: onError,
            readComplete: onReadComplete
        }
    });
```

Alternatively, you can also add/change callbacks using the `registerCallbacks()` function:

```javascript
    localFileReader.registerCallbacks({
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

### Callbacks

This callback comes with the contents of `_fileBuffer` in the callback's first argument.
* readComplete: fired when the read operation has been completed for all the input files.

All of these callbacks have the corresponding file in the callback's first argument.
* loadstart: fired when the read operation starts.
* progress: fired when the read operation is in progress.
* load: fired when the read operation finished successfully.
* error: fired when the read operation fails.
* abort: fired when the read operation was aborted.

### File data structure
```javascript
    file = {
        file:
        content:
        status:
        readMode:
    };
```
