"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetPagination = void 0;
var react_1 = require("react");
// Returns the pages available in the data set
// The get pagination component should be fired whenever the pages should be calculated.
function useGetPagination() {
    var _a = (0, react_1.useState)(0), pages = _a[0], setPages = _a[1];
    function getPagination(dataCount, rows) {
        var value = dataCount / rows;
        var paginatedVal = Math.ceil(value);
        setPages(paginatedVal);
    }
    return { pages: pages, getPagination: getPagination };
}
exports.useGetPagination = useGetPagination;
