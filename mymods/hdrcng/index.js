/**
 * Created by Timothy Tocci on 019, Jun 19, 2016.
 */
module.exports = function (header, headerval, boolRem) {
    if (boolRem === undefined) {
        boolRem = false;
    }
    return function (req, res, next) {
        if (boolRem) {
            res.removeHeader(header);
        } else {
            res.set(header, headerval);
        }

        next();
    };
}