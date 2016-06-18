# Express-with-Passport-Local-Strategy-Login
https://github.com/timtocci/Express-with-Passport-Local-Strategy-Login

Basic Express application with Passport Local Strategy login that uses sqlite (pure js) for data storage.

Also adds a very basic websocket server provided by node-simple-router for real time push. The websocket server 
has no fallback or transport schema - write your own. If you want to remove the socket server erase: the last 
eight lines in bin/www; bin/socks.js; public/js/client.js. 

---
Uses:
*  express    http://expressjs.com/
*  express-session    https://www.npmjs.com/package/express-session
*  body-parser    https://www.npmjs.com/package/body-parser
*  connect-ensure-login    https://www.npmjs.com/package/connect-ensure-login
*  cookie-parser    https://www.npmjs.com/package/cookie-parser
*  hbs    https://www.npmjs.com/package/hbs
*  debug    https://www.npmjs.com/package/debug
*  helmet    https://www.npmjs.com/package/helmet
*  morgan    https://www.npmjs.com/package/morgan
*  node-simple-router    https://www.npmjs.com/package/node-simple-router
*  node-sqlite-purejs    https://www.npmjs.com/package/node-sqlite-purejs
*  passport    http://passportjs.org/
*  passport-local     https://www.npmjs.com/package/passport-local
*  serve-favicon     https://www.npmjs.com/package/serve-favicon
*  sqlstring     https://www.npmjs.com/package/sqlstring
*  validator     https://www.npmjs.com/package/validator
*  xss-filters     https://www.npmjs.com/package/xss-filters
*  csurf     https://www.npmjs.com/package/csurf

---
To start just type npm start

Hack n go version - NOT NEARLY READY FOR PRODUCTION!