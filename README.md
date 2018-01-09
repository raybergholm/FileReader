# LocalFileReader

Dealing with file uploads, but you want to do some read the file content and do checks on the frontend before sending it to the backend? Or maybe you need to read a bunch of files together, but the built-in JS [FileReader] object reads asynchronously and you just want to handle the results once everything is done.

This is a really simple JavaScript file reader extension which wraps around the built-in FileReader. No dependencies required other than a browser that's sufficiently up to date.

Feed in a [FileList] with an optional read mode, and it will return the results of a [Promise.All] which can be handled with a `.then()`. I'm assuming that if any promise rejects, then there's some major issue going on so you probably want to sort it out first.

No dependencies required.

Check out the demo files for a basic demonstration.

## Quick use guide (v2)

Include the LocalFileReader source code however you want.

Then, when you need to read files:

```javascript
    LocalFileReader.read(files, readMode)
        .then((result) => {
            // do whatever
        })
        .catch((err) => {
            // oh dear
        });
```
You can skip `readMode`, if not given then it will default to reading as text:

```javascript
    LocalFileReader.read(files) // inside the function, readmode = text mode
        .then((result) => {
            // do whatever
        })
        .catch((err) => {
            // oh dear
        });
```

The results will be in the following format:

```javascript
    result = [
        {
            file: File, // this will be a File object
            content: "lorem ipsum" // whatever was read from the file
        },
        ...
    ];
```

If there was an error:

```javascript
    result = [
        {
            file: File, // this will be a File object
            error: DOMException // the error which was thrown
        },
        ...
    ];
```

## History

**v3:** WIP at the moment. Meant for use with a module system. Aiming to move away from promises to async/await style instead.

**v2:** Threw away most of the old v1 code and rewrote everything to use a Promise.All instead.

**v1:** Really old hacky callback style, don't use this

[FileReader]: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
[FileList]: https://developer.mozilla.org/en-US/docs/Web/API/FileList
[Promise.All]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all