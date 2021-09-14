const express = require('express');
const route = new express.Router();
const path = require('path');
const passport = require('passport');

const connection = require( path.join(__dirname, '..', 'src', 'database.js') );
const User = connection.models.User;
const utils = require( path.join(__dirname, '..', 'src', 'utils.js'));


//==================
// Get Methods
//==================
route.get('/', (req,res)=> {
    if (req.user)
        return res.redirect('/profile');

    res.render('homepage', { message: req.flash('message').pop() });
});

route.get('/login', (req,res)=> {
    if (req.user)
        return res.redirect('/profile');

    res.render('login', { message: (req.flash('message').pop() || req.flash('error').pop() ) });
});

route.get('/register', (req,res)=> {
    if (req.user)
        return res.redirect('/profile');

    res.render('register', { message: req.flash('message').pop() });
});

route.get('/profile', (req,res)=> {
    if (!req.user) {
        req.flash('message', 'Please login first!');
        return res.redirect('/login');
    }

    res.render('profile', {
        username: req.user.username,
        status: req.user.status,
        message: req.flash('message').pop()
    });
});

route.get('/change_status', (req,res)=> {
    if (!req.user) {
        req.flash('message', 'Please login first!');
        return res.redirect('/login');
    }

    res.render('change_status', {
        status: req.user.status,
        message: req.flash('message').pop()
    });
});

route.get('/logout', (req,res)=> {
    // PassportJS attaches a logout function to req, which removes req.user and clears session data if any
    req.logout();
    req.flash('message', 'Successfully Logged Out');
    res.redirect('/');
});


//======================
// POST methods
//======================
route.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,                 
}));

route.post('/register', async (req,res)=> {
    if (req.user)
        return res.redirect('/profile');

    if (!req.body.username) {
        req.flash('message', 'Please provide your username!');
        return res.redirect('/register');
    }
    if (!req.body.password) {
        req.flash('message', 'Please provide a password!');
        return res.redirect('/register');
    }
    if (!req.body.confirm_password) {
        req.flash('message', 'Please confirm your password!');
        return res.redirect('/register');
    }
    if (req.body.password !== req.body.confirm_password) {
        req.flash('message', 'Password does not match!');
        return res.redirect('/register');
    }

    // Check if the user already exists
    try {
        if( await User.findOne({ username: req.body.username }).exec() ) {
            req.flash('message', 'Username is taken');
            return res.redirect('/register');
        }
    } catch (e) {
        req.flash('message', e);
        return res.redirect(`/register`);
    }

    // Registers the user.
    const passwordHash = utils.generateHashFromPassword(req.body.password);
    const newUser = new User({
        username: req.body.username,
        passwordHash,
        status: ''
    });
    // PassportJS gives us req.login() to assign this user to session and req object!
    await newUser.save();
    req.login(newUser, (err)=> {
        if (err) throw err;
        return res.redirect('/profile');
    });
});

route.post('/change_status', async (req,res)=> {
    if (!req.user) {
        req.flash('message', 'Please login first!');
        return res.redirect('/login');
    }

    if (!req.body.new_status) {
        req.flash('message', 'Please provide new status!');
        return res.redirect('/profile');
    }

    await User.findByIdAndUpdate(req.user.id, { status: req.body.new_status} );
    req.flash('message', 'Status updated');
    return res.redirect('/change_status');
});

module.exports = route;