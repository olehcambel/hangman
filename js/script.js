window.addEventListener('DOMContentLoaded', () => {
  const alphabet = [
    'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'
  ];

  let categories, //Themes
    chosenCategory, 
    word, 
    guesses = [], // array of user's attempts
    lives,
    counter, // amount of guesses letters
    space // Space in word

  let showLives = document.querySelector('#mylives'),
    showCategory = document.querySelector('#categoryName'),
    getHint = document.querySelector('#hint'),
    showClue = document.querySelector('#clue'),
    reset = document.querySelector('#reset')

  function createButtons() {
    let myButtons = document.querySelector('#buttons'),
    letters = document.createElement('ul')

    for (let i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet'
      let list = document.createElement('li')
      list.innerHTML = alphabet[i]
      myButtons.appendChild(letters)
      letters.appendChild(list)

    }
  }

  // choose category
  function selectCat() {
    if (chosenCategory === categories[0]) {
      showCategory.textContent = 'Your category: Countries';
    } else if (chosenCategory === categories[1]) {
      showCategory.textContent = 'Your category: Programming language and Frameworks';
    } else if (chosenCategory === categories[2]) {
      showCategory.textContent = 'Your category: Animals';
    }
  }

  function result() {
    let wordHolder = document.querySelector('#hold'),
      correct = document.createElement('ul')

    for (let i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word')
      let guess = document.createElement('li')
      guess.setAttribute('class', 'guess')

      if (word[i] === '-') {
        guess.innerHTML = '-'
        space = 1
      } else {
        guess.innerHTML = '_'
      }

      guesses.push(guess)
      wordHolder.appendChild(correct)
      correct.appendChild(guess)
    }
  }

  // show current state
  function comments() {
    showLives = `Lives left: ${lives}`
    if (lives < 1) {
      showLives.innerHTML = 'Game over'
    }

    for (let i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        showLives.innerHTML = 'Done!'

      }
    }
  }

  // func for running program
  function play() {
    categories = [
      // Countries
      ["Singapure", "Malaysia", "China", "Japan", "South Korea"],
      // Programming language and Frameworks
      ["Ruby on Rails", "Javascript", "Cplusplus", "Python", "Golang", "React", "Vue"],
      // Animals
      ["Cangaroo", "Bear", "Doggy", "Kitty", "Dragon"],
    ]

    chosenCategory = categories[Math.floor(Math.random() * categories.length)]
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)]
    word = word.replace(/\s/gi, '-')

  console.log(word)
  createButtons()
  selectCat()
  result()
  comments()

}

play()

});
