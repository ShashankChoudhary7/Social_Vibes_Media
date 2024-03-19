const User = require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
          
        return res.render('users_profile', {
            title: "User Profile",
            profile_user : user
    }); 
 });
}

//To update the users profile page
module.exports.update = function(req, res){
    if(req.user.id == profile_user.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){

            return res.redirect('back');
        });    
    } else{
        return res.status(401).send('unauthorized');
    }
}

//render the sign up page
module.exports.signUp = function(req, res){

    return res.render('user_sign_up',{
        title : "Social Vibes | Sign up"
    });
}

//render the sign in page
module.exports.signIn = function(req, res){

    return res.render('user_sign_in',{
        title: "Social Vibes | Sign in"
    });
}

//get the sign up data
module.exports.create = function(req, res){

    if(req.body.password != req.body.confirm_password){
        return res.render('back'); 
    }

    User.findOne({email: req.body.email}, function(err, user){

        if(err){
            console.log('error in finding the user in signing up');
            return
        }

        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating the user while signing up');
                    return
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}


//sign in and create session for user
module.exports.createSession = function(req, res){

    //steps to authenticate and establish the identity of the user
    //find the user was exist or not
    User.findOne({email: req.body.email}, function(err, user){
                 if(err){
                  console.log('error in finding the user in signing in');
                   return
                 }
                 //handle user found
                 if(user){

                    //handle password which doesn't match
                    if(user.password != req.body.password){
                        return res.redirect('back');
                    }

                    //handle the session creation
                    res.cookie('user_id', user.id);
                    return res.redirect('/users/profile');
                 }
                 else{
                    //handle user not found
                    return res.redirect('back');
                 }
        });
}


//now we verify the user_id that was inside cookies 
//render the profile page
const User = require('./models/user');

module.exports.profile = function(req, res){

       if(req.cookies.user_id){

        User.findById(req.cookies.user_id, function(err, user){
            
            if(user){
                return res.render('users_profile',{
                        title: "User Profile",
                        user: user
                     });
              }
              else{
                return res.redirect('/users/sign-in');
              }
          });    
       }
       else{
              return res.redirect('/users/sign-in');
       }
    }
    
// For sign out
module.exports.destroySession = function(req, res){

    req.logout();
    return res.redirect('/');
}

//sign in and create session for user and display the flash messages
module.exports.createSession = function(req, res){
    req.flash('Success', 'logged in successfully');
   return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('Success', 'You have logged out !!');
    return res.redirect('/');
}
