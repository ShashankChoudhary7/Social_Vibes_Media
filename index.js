const express = require('express');
const port = 8000;
const app = express();

// require environment variable
const env = require('./config/environment');
const logger = require('morgan');

//require cookie-parser library
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//connect project data to Mongo database using mongoose
const db = require('./config/mongoose');

//used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJwt = require('./config/passport-jwt-stategy');
const MongoStore = require('connect-mongo')(session);


//require sass middleware to convert scss into css
const sassMiddleware = require('node-sass-middleware');

//use for flash messages
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

if (env.name == 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css' 
}));

//connect to database schema model
const User = require('./models/user');
const Post = require('./models/post');

// set layout for web page
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//set the css % js static files
app.use(express.static('./assets'));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set ejs as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//use passport as middleware to authenticate user using express session
app.use(session({
    name: 'Social_Vibes',
    // TODO change the secret before deployment in production mode
    secret: 'addictedMedia',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    //setup the Mongo Store for our session cookies
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup is ok');
        }
    )
}));

app.use(logger(env.morgan.mode, env.morgan.options));

app.use(passport.initailaize());
app.use(passport.session());

//To check if user is authenticated or not & then set for views
app.use(passport.checkAuthenticated);
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/', require('./routes'));

app.listen(port, function(err){

    if(err){
        console.log('Error in running the server: ${err}');
    }

    console.log('Server is running successfully on port: ${port}');
  });


