var sqlite = require('node-sqlite-purejs');
var SqlString = require('sqlstring');
var validator = require('validator');
exports.findById = function(id, cb) {
    process.nextTick(function() {
        id = removeBlacklistedCharacters(id);
        if(id){
            sqlite.open('authdb.sqlite',{},function(err,db){
                var sql    = 'SELECT * FROM users WHERE id = ' + SqlString.escape(id) + ';';
                db.exec(sql, function(err, results){
                    if(err){
                        console.error(err);
                        return cb(err, null)
                    }else{
                        console.log('findById');
                        console.log(results);
                        if(results.length === 1){
                            cb(null, results[0]);
                        }else{
                            cb(new Error('User ' + id + ' does not exist'));
                        }
                    }
                });
            });
        }else{
            cb(new Error('Invalid characters in identifier'));
        }
    });
};

exports.findByUsername = function(username, cb){
    process.nextTick(function() {
        username = removeBlacklistedCharacters(username);
        if(username){
            sqlite.open('authdb.sqlite',{},function(err,db){
                var sql = 'SELECT * FROM users WHERE username = ' + SqlString.escape(username) + ';';
                db.exec(sql, function(err, results){
                    if(err){
                        console.error(err);
                        return cb(err, null)
                    }else{
                        console.log('findByUsername');
                        console.log(results);
                        if(results && results.length === 1){
                            return cb(null, results[0]);
                        }else{
                            return cb(null, results[0]);
                            //return cb(new Error('User ' + username + ' does not exist'));
                        }
                    }
                });
            });
        }else{
            return cb(new Error('Invalid characters in User Name or Password'));
        }
    });
};

exports.registerNewUser = function(req, res, cb){
    process.nextTick(function() {
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        username = removeBlacklistedCharacters(username);
        // password should be a hash by now anyway
        password = removeBlacklistedCharacters(password);
        email = removeBlacklistedCharacters(email);
        if(username && password && email){
            console.log('all good');
            sqlite.open('authdb.sqlite',{},function(err,db){
                var sql = 'INSERT INTO "users" ("username","password","email")VALUES('+ SqlString.escape(username)  + ',' + SqlString.escape(password) + ',' + SqlString.escape(email) + ');';
                db.exec(sql, function(err, results){
                    console.log(results);
                    if(err){
                        console.error(err);
                        cb(err)
                    }else{
                        cb();
                    }
                });
            });
        }else{
            cb(new Error('Invalid characters in /register field'));
        }
    });
};
function removeBlacklistedCharacters(input){
    // remove all character that could be used in
    // sql injection or regex exploitation
    var temp = validator.blacklist(input, '\\\'\"\[\}\=\/\:\{\}\;\,\)\(\|\+\^');
    if(temp === input){
        return temp;
    }else{
        return false;
    }
}