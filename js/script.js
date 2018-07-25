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

}
play()

});
