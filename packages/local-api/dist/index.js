"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const serve = (port, filename, dir) => {
    console.log("serving trafic on port", port);
    console.log("saving, fetching files from", filename);
    console.log("that file in directory: ", dir);
};
exports.serve = serve;
