const nodeMailer = require('nodemailer');

// this is another way of exporting a method
exports.newComment = (comment) => {

    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comments.ejs');

    nodeMailer.transporter.sendMail({

        from: 'choudharyshashank35@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published!",
        html: htmlString
    }, (err, info) => {
          if(err){
            console.log('Error in sending mail', err);
            return;
          }
          console.log('Message sent!', info);
          return;
    });
}