const pageBody = document.querySelector("body")
const url = "https://game-of-thrones-quotes.herokuapp.com/v1/characters"

const post = () => {
  fetch(url)
    .then(resp => resp.json())
    .then(character => {
      const characterArray = [character[0], character[1], character[2], character[3], character[4]]
      characterArray.forEach(person => {
        createCharacterPost(person)
      })
    })
}

const createCharacterPost = (character) => {
  const charArticle = document.createElement("article")
  const articleHeader = document.createElement("header")
  const charName = document.createElement("h2")
  const charQuote = document.createElement("p")
  const like = document.createElement("span")
  const articleFooter = document.createElement("footer")
  const commentsUl = document.createElement("ul")
  const commentBox = document.createElement("input")
  const commentPost = document.createElement("input")
  charArticle.classList = "media-post"
  like.id = character.slug
  like.classList = "like-glyph"
  like.innerHTML = "&#x2661"
  commentBox.id = "comment-box"
  commentBox.type = "text"
  commentPost.id = "postBtn"
  commentPost.type = "submit"
  commentPost.value = "Post"
  charName.innerHTML = character.name
  charQuote.innerHTML = character.quotes[0]
  articleHeader.append(charName)
  charQuote.append(like)
  articleFooter.append(commentsUl, commentBox, commentPost)
  charArticle.append(articleHeader, charQuote, articleFooter)
  pageBody.append(charArticle)
}

const init = () => {
  post()
}

document.addEventListener("DOMContentLoaded", init)
