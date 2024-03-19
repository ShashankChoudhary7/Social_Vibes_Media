{
//Method to submit the form using Ajax to create a new post
let createPost = function(){

    let newPostForm = $('#new-post-form');

    newPostForm.submit(function(e){
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/posts/create',
            data: newPostForm.serialize(),
            success: function(data){
                console.log(data);
            },
            error: function(err){
                console.log(error.responseText);
            }
        });
    });
}
       createPost();

//method to create post in DOM
let newPostDom = function(post){
    return $(`<li id = "post-${post._id}">
       <p>
            <Small>
               <a class ="delete-post-button" href ="/posts/destroy/${post._id}">
                         Delete the post
               </a>
            </small>
                ${post.content}
               <br>
              <small>
                ${post.user.name}
              </small>
       </p>

       <div class ="post-comments">

             <form action ="/comments/create" method ="POST">
               <input type ="text" name ="content" placeholder ="Type here to add comment.." required>
               <input type ="hidden" name = "post" value ="${post._id}">
               <input type ="submit" vlaue ="Add Comment">
             </form>

         </div class = "post-comments-list">
           <ul id ="post-comments-${post._id}">

           </ul>
       </div>
     </div>    
  </li>`)
}

//Ajax req for deleting the link of post from DOM
let deletePost = function(deleteLink){

  $(deleteLink).click(function(e){
         e.preventDefault();
         
      $.ajax({
          type: 'get',
          url: $(deleteLink).prop('href'),

          success: function(data){
            $(`#post-${data.data.post_id}`).remove();
          },
          error: function(error){
            console.log(error.responseText);
          }
      });
   });
}
     
}