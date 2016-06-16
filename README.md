# Express-with-Passport-Local-Strategy-Login
https://github.com/timtocci/Express-with-Passport-Local-Strategy-Login

Basic Express application with Passport Local Strategy login that uses sqlite (pure js) for data storage.

Also adds a very basic websocket server provided by node-simple-router for real time push. The websocket server 
has no fallback or transport schema - write your own. If you want to remove the socket server erase: the last 
eight lines in bin/www; bin/socks.js; public/js/client.js. 

Hack n go version - NOT NEARLY READY FOR PRODUCTION!