/**
 * Created by Timothy Tocci on 019, Jun 19, 2016.
 */
module.exports = function (header, headerval) {
    return function (req, res, next) {
        res.set(header, headerval);
        next();
    };
}