window.addEventListener('DOMContentLoaded', () => {
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  let categories, //Themes
    chosenCategory,
    word,
    guesses = [], // array of user's attempts
    lives,
    counter, // amount of guesses letters
    space, // Space in word
    list, letters
  // let context = null, correct


  let showLives = document.querySelector('#mylives'),
    showCategory = document.querySelector('#categoryName'),
    getHint = document.querySelector('#hint'),
    showClue = document.querySelector('#clue'),
    reset = document.querySelector('#reset');

  // debugger
  function createButtons() {
    let myButtons = document.querySelector('#buttons')
      letters = document.createElement('ul');

    for (let i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
       list = document.createElement('li');
      list.innerHTML = alphabet[i];
      check()
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }

  // choose category
  function selectCat() {
    if (chosenCategory === categories[0]) {
      showCategory.textContent = 'Your category: Countries';
    } else if (chosenCategory === categories[1]) {
      showCategory.textContent =
        'Your category: Programming language and Frameworks';
    } else if (chosenCategory === categories[2]) {
      showCategory.textContent = 'Your category: Animals';
    }
  }

  function result() {
    let wordHolder = document.querySelector('#hold')
      correct = document.createElement('ul');

    for (let i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      let guess = document.createElement('li');
      guess.setAttribute('class', 'guess');

      if (word[i] === '-') {
        guess.innerHTML = '-';
        space = 1;
      } else {
        guess.innerHTML = '_';
      }

      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  // show current state
  function comments() {
    showLives.innerHTML = `Lives left: ${lives}`;
    if (lives < 1) {
      showLives.innerHTML = 'Game over';

    }

    // for (let i = 0; i < guesses.length; i++) {
    if (counter + space === guesses.length) {
      showLives.innerHTML = 'Done!';
    list.removeEventListener('click', checkHandleClick, true );


      // }
    }
  }

  // draw Man
  function animate() {
    let drawMe = lives;
    drawArray[drawMe]();
  }

  // Hangman
  canvas = function() {
    myStickman = document.getElementById('stickman');
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = '#fff';
    context.lineWidth = 2;
  };

  head = function() {
    myStickman = document.getElementById('stickman');
    context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  };

  frame1 = function() {
    draw(0, 150, 150, 150);
  };

  frame2 = function() {
    draw(10, 0, 10, 600);
  };

  frame3 = function() {
    draw(0, 5, 70, 5);
  };

  frame4 = function() {
    draw(60, 5, 60, 15);
  };

  torso = function() {
    draw(60, 36, 60, 70);
  };

  rightArm = function() {
    draw(60, 46, 100, 50);
  };

  leftArm = function() {
    draw(60, 46, 20, 50);
  };

  rightLeg = function() {
    draw(60, 70, 100, 100);
  };

  leftLeg = function() {
    draw(60, 70, 20, 100);
  };

  drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];

  function check() {
    // debugger
    // doc
    list.addEventListener('click', checkHandleClick );
  }
  
  function checkHandleClick() {
    // get pressed letter
    let context = this.innerHTML;
    this.setAttribute('class', 'active');
  
    for (let i = 0; i < word.length; i++) {
      // check each letter which pressed
      if (word[i] === context) {
        guesses[i].innerHTML = context;
        counter += 1;
      }
    }
  
    let j = word.indexOf(context);
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
    categories = [
      // Countries
      ['singapure', 'malaysia', 'china', 'japan', 'south korea'],
      // Programming language and Frameworks
      [
        'ruby on rails',
        'javascript',
        'c plus plus',
        'python',
        'golang',
        'react',
        'vue'
      ],
      // Animals
      ['cangaroo', 'bear', 'doggy', 'kitty', 'dragon']
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, '-');
    console.log(word);

    lives = 10;
    counter = 0;
    space = 0;
    guesses = []

    createButtons();
    result();
    comments();
    selectCat();
    canvas();
  }

  play();

  getHint.addEventListener('click', function () {

    hints = [
      ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
      ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
      ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
    ];
debugger
    let categoryIndex = categories.indexOf(chosenCategory);
    let hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Подсказка: - " + hints[categoryIndex][hintIndex];
  });

  // Reset
   reset = document.getElementById('reset');
  reset.addEventListener('click', function () {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  });
});
