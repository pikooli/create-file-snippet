"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeComment = void 0;
// in progress
const removeComment = (str) => {
    str = str.replace(/\/\/.+/g, "");
    return str;
};
exports.removeComment = removeComment;
//# sourceMappingURL=removeComment.js.map