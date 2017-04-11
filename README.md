# LocalFileReader

A JavaScript file reader, extends functionality of the built-in JS FileReader. The use case for this script is when you upload files on the browser to be send to the backend, however you still need to be able to read the file locally (e.g. for data validation purposes).

This reads the contents of a FileList into an internal array which contains the File object and its contents as read by FileReader.

Use demo.html for a demo.

TODO LIST:
- fix logic for reading files directly from the constructor
- more callbacks?
- usage examples
