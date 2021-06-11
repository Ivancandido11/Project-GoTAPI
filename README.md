Project Game of Thrones API

This app is going to use the Game of Thrones Quotes API and create posts for the characters using their quotes.
User will be able to like the posts and also leave comments on it.

# Deliverables
  - On page load 5 characters will be loaded on the page.
    Using the fetch url "https://game-of-thrones-quotes.herokuapp.com/v1/characters".
    The post will be an "article" element with the class of "media-post"
    The post will include a "header" that includes a "h2" element with the character name. 
    A "p" element with the character quote and a "span" element with class "like-glyph" and an innerHTML of &#x2661.
    A "footer" that will house a "ul" for the comments. and it will also house a "form"
    which will have two "inputs" the first with the id "comment-box" for the user to comment,
    the second with the id "postBtn" for the user to submit their comment.

  - User will be able to like each "post" from the characters.
  - User will be able to leave a comment on each characters post.

## Advanced Deliverables
  - Have the menu list every single character from the API, once a character is clicked,
    all of that characters quotes will be displayed on the DOM through "posts".
  - Randomize feature that displays random "posts" from the characters.
  - Create my own Database and add persistence to user input.
