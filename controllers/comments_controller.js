const Post = require('../models/post');
const Comment = require('../models/comment');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

//Action to create comments for user
module.exports.create = async function(req, res){

  try{
    let post = await Post.findById(req.body.post);

    if(post){
      let comment = await Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id 
      });
      post.comments.push(comment);
      post.save();

// we have to call the nodemailer file to send email notifications to the user 
      comment = await comment.populate('user', 'name email').execPopulate();
      // commentsMailer.newComment(comment);
    
      let job = queue.create('emails', comment).save(function(err){
        if(err){
          console.log('error in sending to the queue', err);
          return;
        }
        console.log('job enqueued', job.id);         
      });
      if(req.xhr){
         
          return res.status(200).json({
            data:{
              comment: comment
            },
            message: "Post created!"
          });
      }
        req.flash('success', 'comment published!');
        res.redirect('/');
    }
  }catch(err){
      req.flash('Error', err);
      return;
  }
}    

// Action controller to delete a comment of user
module.exports.destroy = async function(req, res){

  try{
      let comment = await Comment.findById(req.params.id);

      if (comment.user == req.user.id){

          let postId = comment.post;

          comment.remove();

          let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

          // send the comment id which was deleted back to the views
          if (req.xhr){
              return res.status(200).json({
                  data: {
                      comment_id: req.params.id
                  },
                  message: "Post deleted"
              });
          }


          req.flash('success', 'Comment deleted!');

          return res.redirect('back');
      }else{
          req.flash('error', 'Unauthorized');
          return res.redirect('back');
      }
  }catch(err){
      req.flash('error', err);
      return;
  }
}
