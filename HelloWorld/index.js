"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = function (context, req) {
    if (req.query.name == null) {
        context.res = {
            body: 'Please send your name as a query parameter!',
            status: 401
        };
    }
    else {
        context.res = {
            body: 'Hello ' + req.query.name
        };
    }
    context.done();
};
//# sourceMappingURL=index.js.map