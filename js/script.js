window.addEventListener('DOMContentLoaded', () => {
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let categories, //Themes
    choseCategory,
    word,
    guesses = [], // array of user's attempts
    lives,
    counter, // amount of guessed letters
    space, // Space in word
    letter,
    letters;
  let context = null

  let showCategory = document.querySelector('#categoryName'),
    showLives = document.querySelector('#mylives'),
    showClue = document.querySelector('#clue'),
    hint = document.querySelector('#hint'),
    reset = document.querySelector('#reset');
  
  document.addEventListener('mousedown', event => {
    event.preventDefault();
  });

  function createButtons() {
    let alphabetButtons = document.querySelector('#buttons');
    letters = document.createElement('ul');
    letters.id = 'alphabet';
    letters.addEventListener('click', checkHandleClick);
   
    alphabetButtons.appendChild(letters);

    for (let prop of alphabet) {
      letter = document.createElement('li');
      letter.innerHTML = prop;
      letter.className = 'letter'
      letters.appendChild(letter);

    }
  }

  // choose category
  function selectCat() {
    if (choseCategory === categories[0]) {
      showCategory.textContent = 'Your category: Countries';
    } else if (choseCategory === categories[1]) {
      showCategory.textContent =
        'Your category: Programming language and Frameworks';
    } else if (choseCategory === categories[2]) {
      showCategory.textContent = 'Your category: Animals';
    }
  }

  function result() {
    let wordHolder = document.querySelector('#hold');
    correct = document.createElement('ul');
    correct.id = 'my-word'
    wordHolder.appendChild(correct);

    for (let prop of word) {

      let guess = document.createElement('li');
      guess.classList.add('guess')
      if (prop === '-') {
        guess.innerHTML = '-';
        space = 1;
      } else {
        guess.innerHTML = '_';
      }

      guesses.push(guess);
      correct.appendChild(guess);
    }

  }

  // show current state
  function comments() {
    showLives.innerHTML = `Lives left: ${lives}`;
    if (lives < 1) {
      showLives.innerHTML = 'Game over';
      gameFinished()

    }

    if (counter + space === guesses.length) {
      showLives.innerHTML = 'Done!';
      gameFinished()

    }
  }

  function gameFinished() {

    letters.removeEventListener('click', checkHandleClick);
    setTimeout(() => startAgain(), 3000)
  }

  // draw Man
  function animate() {
    let drawMe = lives;
    drawArray[drawMe]();
  }

  // Hangman
  canvas = () => {
    myStickman = document.getElementById('stickman');
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = '#fff';
    context.lineWidth = 2;
  };

  head = () => {
    myStickman = document.getElementById('stickman');
    context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  draw = ($pathFromx, $pathFromy, $pathTox, $pathToy) => {
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  };

  frame1 = () => { draw(0, 150, 150, 150); };
  frame2 = () => { draw(10, 0, 10, 600); };
  frame3 = () => { draw(0, 5, 70, 5); };
  frame4 = () => { draw(60, 5, 60, 15); };
  torso = () => { draw(60, 36, 60, 70); };
  rightArm = () => { draw(60, 46, 100, 50); };
  leftArm = () => { draw(60, 46, 20, 50); };
  rightLeg = () => { draw(60, 70, 100, 100); };
  leftLeg = () => { draw(60, 70, 20, 100); };

  drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];

  function checkHandleClick(event) {
    let letter = event.target
    if (letter.className.includes('active') || letter.className === '') return

    // get pressed letter
    let pressedLetter = letter.innerHTML;
    letter.classList.add('active')


    let regexp = new RegExp(pressedLetter, 'g'), result
    while (result = regexp.exec(word)) {
      guesses[result.index].innerHTML = result[0]
      counter += 1
    }

    let j = word.indexOf(pressedLetter);
    // check if letter includes
    if (j === -1) {
      lives -= 1;
      comments();
      animate();
    } else {
      comments();
    }
  }

  // func for running program
  function play() {
    categories = [// Countries
      ['singapure', 'malaysia', 'china', 'japan', 'south korea'], 
      ['ruby on rails', 'javascript', 'c plus plus', 'python', 'golang', 'react', 'vue'], 
      // Animals // Programming language and Frameworks
      ['cangaroo', 'bear', 'doggy', 'kitty', 'dragon']];

    choseCategory = categories[Math.floor(Math.random() * categories.length)];
    word = choseCategory[Math.floor(Math.random() * choseCategory.length)];
    word = word.replace(/\s/g, '-');
    console.log(word);

    lives = 10;
    counter = 0;
    space = 0;
    guesses = [];

    createButtons();
    selectCat();
    result();
    comments();
    canvas();
  }

  play();

  // Hint
  hint.addEventListener('click', getHint);
  
  function getHint() {
    hints = [
      ['singapure', 'malaysia', 'china', 'japan', 'south korea'],
      ['ruby on rails', 'javascript', 'c plus plus', 'python', 'golang', 'react', 'vue'],
      ['cangaroo', 'bear', 'doggy', 'kitty', 'dragon']
    ];
    let categoryIndex = categories.indexOf(choseCategory);
    let hintIndex = choseCategory.indexOf(word.replace(/-/g, ' '));
    showClue.innerHTML = 'Hint: ' + hints[categoryIndex][hintIndex];

  }

  // Reset
  reset.addEventListener('click', startAgain);
  
  function startAgain() {
    letters.parentNode.removeChild(letters);
    correct.parentNode.removeChild(correct);
    showClue.innerHTML = '';
    context.clearRect(0, 0, 400, 400);
    play();

  }

});
