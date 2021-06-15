const container = document.querySelector("#mediaPostContainer")
const EMPTY_HEART = "♡"
const FULL_HEART = "♥"
const url = "https://game-of-thrones-quotes.herokuapp.com/v1/characters"
const randomUrl = "https://game-of-thrones-quotes.herokuapp.com/v1/random/5"
const persistUrl = "http://localhost:3000/interaction/"
const charactersMenu = document.querySelector("#characters")
const random = document.querySelector("#random")

const post = () => {
  fetch(url)
    .then(resp => resp.json())
    .then(character => {
      addMenuToDom(character)
      const characterArray = [character[0], character[1], character[2], character[3], character[4]]
      characterArray.forEach(person => {
        createCharacterPost(person, person.quotes[0])
      })
    })
}

const randomize = () => {
  random.addEventListener("click", () => {
    container.innerHTML = ""
    fetch(randomUrl)
      .then(resp => resp.json())
      .then(character => {
        character.forEach(person => {
          createCharacterPost(person.character, person.sentence)
        })
      })
  })
}

const addMenuToDom = (characters) => {
  characters.forEach(character => {
    const characterP = document.createElement("p")
    const characterBtn = document.createElement("button")
    characterBtn.innerHTML = character.name
    characterBtn.classList = "navBtn"
    characterP.append(characterBtn)
    charactersMenu.append(characterP)
    characterBtn.addEventListener("click", () => {
      container.innerHTML = ""
      character.quotes.forEach(quote => {
        createCharacterPost(character, quote)
      })
    })
  })
}

const postIntereaction = (userComment, quote) => {
  const commentData = {
    content: quote,
    comment: [userComment],
    likes: "♡"
  }
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(commentData)
  }
  fetch(persistUrl, configObj)
}

const patchInteraction = (commentArray, id) => {
  const commentData = {
    comment: commentArray
  }
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(commentData)
  }
  fetch(`${persistUrl}${id}`, configObj)
}

const likePost = (button) => {
  if (button.innerHTML === EMPTY_HEART) {
    button.classList = "activatedHeart"
    button.innerHTML = FULL_HEART
  } else {
    button.classList = "likeGlyph"
    button.innerHTML = EMPTY_HEART
  }
}

const userComment = (footer, form, quote) => {
  const comment = form.comment.value
  const commentLi = document.createElement("li")
  commentLi.classList = "userComment"
  commentLi.innerHTML = comment
  const commentUl = footer.firstChild
  commentUl.append(commentLi)
  form.comment.value = ""
  fetch(persistUrl)
    .then(resp => resp.json())
    .then(interaction => {
      const contentExists = interaction.find(action => action.content === quote)
      if (contentExists === undefined) {
        postIntereaction(comment, quote)
      } else {
        const updatedComments = [...contentExists.comment, comment]
        patchInteraction(updatedComments, contentExists.id)
      }
    })
}

const createCharacterPost = (character, quote) => {
  const charArticle = document.createElement("article")
  const articleHeader = document.createElement("header")
  const charName = document.createElement("h2")
  const charQuote = document.createElement("p")
  const like = document.createElement("button")
  const articleFooter = document.createElement("footer")
  const commentForm = document.createElement("form")
  const commentsUl = document.createElement("ul")
  const commentBox = document.createElement("input")
  const commentPost = document.createElement("input")
  const commentsh = document.createElement("h5")
  charArticle.classList = "mediaPost"
  like.classList = "likeGlyph"
  like.innerHTML = EMPTY_HEART
  commentBox.id = "commentBox"
  commentBox.name = "comment"
  commentBox.type = "text"
  commentPost.classList = "postBtn"
  commentPost.type = "submit"
  commentPost.value = "Post"
  commentsUl.name = "ul"
  commentsh.innerText = "Comments"
  like.id = character.slug
  charName.innerHTML = character.name
  charQuote.innerHTML = quote
  articleHeader.append(charName)
  charQuote.append(like)
  commentForm.append(commentBox, commentPost)
  commentsUl.append(commentsh)
  articleFooter.append(commentsUl, commentForm)
  charArticle.append(articleHeader, charQuote, articleFooter)
  container.append(charArticle)
  like.addEventListener("click", () => {
    likePost(like)
  })
  commentForm.addEventListener("submit", (event) => {
    event.preventDefault()
    userComment(articleFooter, commentForm, quote)
  })
}

const init = () => {
  post()
  randomize()
}

document.addEventListener("DOMContentLoaded", init)
