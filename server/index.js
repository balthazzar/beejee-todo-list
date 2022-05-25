const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const todosRouter = require('./routes/todos.js');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'top_secret',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.resolve(__dirname, '../dist')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/todos', todosRouter);

passport.use(
    new LocalStrategy(function(user, password, done) {
        if (user !== 'admin' || password !== '123') {
            return done(null, false);
        }

        return done(null, { name: 'admin' })
    })
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.post(
    '/auth/login',
    passport.authenticate('local'),
    (req, res) => {
        if (req.user) {
            res.send(req.user);
        }
    }
);

app.post(
    '/auth/check',
    (req, res) => {
        if (req.user) {
            res.send(req.user);
        }
    }
);

app.post('/auth/logout', (req, res) => {
    req.logout(() => {
        res.end();
    });
});

app.get('/', (req, res, next) => {
    res.sendFile('index.html', {
        root: path.resolve(__dirname, '../dist')
    });
});

app.all('*', (req, res, next) => {
    res.sendFile('index.html', {
        root: path.resolve(__dirname, '../dist')
    });
});


app.listen(3000, console.info.bind(null, 'Server started'));
