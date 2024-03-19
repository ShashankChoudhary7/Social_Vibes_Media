const Post = require('../models/post');
const User = require('../models/user');

//Asynchornously we are populating the user with for their post using async await() 
module.exports.home = async function(req, res){

     try{
          // populate the user of each post
          let posts = await Post.find({})
          .populate('user')
          .populate({
               path: 'comments',
               populate:{
                    path: 'user'
               }
          });

          let users = await User.find({});

          return res.render('home',{
               title: "Social_Vibes | Home",
               posts: posts,
               all_users: users
          });
     } 
     catch(err){
          console.log('Error', err);
          return;
     }
}

