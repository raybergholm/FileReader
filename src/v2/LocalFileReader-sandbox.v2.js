// JS FileReader extension. Reads the contents of a FileList into an internal array which contains the File object and its contents as read by FileReader.
// Copyright 2018 Raymond Bergholm - https://github.com/raybergholm - MIT licence.

const LocalFileReader = Object.freeze({
    ReadModes: Object.freeze({
        ArrayBuffer: "readAsArrayBuffer",
        Binary: "readAsBinaryString",
        DataURL: "readAsDataURL",
        Text: "readAsText"
    }),
    read: (input, inputReadMode = LocalFileReader.ReadModes.Text) => {
        const readSingle = (file) => {
            return new Promise((resolve, reject) => {
                let reader = new FileReader();

                reader.onloadend = () => {
                    resolve({
                        file: file,
                        content: reader.result
                    });
                };

                reader.onerror = () => {
                    reject({
                        file: file,
                        error: reader.error
                    });
                };

                reader[readMethod](file);
            });
        };

        return input instanceof FileList ? Promise.all(Array.from(input).map(readSingle)) : readSingle(input);
    }
});