import { GAME_CONSTANTS, MESSAGES } from './constants.js';

class MainScreen {
  constructor() {
    this.instructions = document.querySelector('#instructions');
    this.title = document.querySelector('#hangman-title');
    this.startButton = document.querySelector('#start-button');
  }

  show() {
    [this.instructions, this.title, this.startButton].forEach(el => 
      el.classList.remove('display-none')
    );
  }

  hide() {
    [this.instructions, this.title, this.startButton].forEach(el => 
      el.classList.add('display-none')
    );
  }
}

class GameScreen {
  constructor(wordList) {
    this.initializeElements();
    this.categoryList = wordList;
    this.resetGame();
  }

  initializeElements() {
    this.category = document.querySelector('#category');
    this.answerLetters = document.querySelector('#answer-letters');
    this.alphabets = document.querySelector('#alphabets');
    this.myWord = document.querySelector('#my-word');
    this.timer = document.querySelector('#timer');
    this.life = document.querySelector('#life');
    this.gameoverMessage = document.querySelector('#gameoverMessage');
    this.endButtons = document.querySelector('#end-buttons');
    this.hangmanParts = ['gallows', 'head', 'body', 'leftarm', 'rightarm', 'leftleg', 'rightleg']
      .map(id => document.querySelector(`#${id}`));
  }

  show() {
    [this.category, this.answerLetters, this.alphabets].forEach(el => 
      el.classList.remove('display-none')
    );
  }

  hide() {
    [this.category, this.answerLetters, this.alphabets, 
    this.gameoverMessage, this.endButtons].forEach(el => 
      el.classList.add('display-none')
    );
    this.hideAllHangmanImages();
  }

  resetGame() {
    this.timerCount = GAME_CONSTANTS.INITIAL_TIME;
    this.lifeCount = GAME_CONSTANTS.INITIAL_LIVES;
    this.updateDisplays();
    this.hideAllHangmanImages();
  }

  initializeGame() {
    this.gameoverMessage.classList.add('display-none');
    this.endButtons.classList.add('display-none');
    [this.category, this.answerLetters, this.alphabets].forEach(el => 
      el.classList.remove('display-none')
    );
    this.resetGame();
    this.currentWord = this.selectRandomWord();
    this.displayWord();
    this.createAlphabetButtons();
    this.startTimer();
  }

  selectRandomWord() {
    const categories = Object.keys(this.categoryList);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const words = this.categoryList[category];
    
    this.category.textContent = category.toUpperCase();
    return words[Math.floor(Math.random() * words.length)].toUpperCase();
  }

  displayWord() {
    this.myWord.innerHTML = [...this.currentWord].map(char => 
      `<li class="myWord-list">${char === '_' ? ' ' : '_'}</li>`
    ).join('');
  }

  createAlphabetButtons() {
    this.alphabets.innerHTML = Array.from({length: 26}, (_, i) => 
      `<button class="alphabet-button">${String.fromCharCode(65 + i)}</button>`
    ).join('');

    this.alphabets.querySelectorAll('button').forEach(button => 
      button.addEventListener('click', () => this.checkLetter(button))
    );
  }

  checkLetter(button) {
    const letter = button.textContent;
    button.disabled = true;
    
    let letterFound = false;
    [...this.currentWord].forEach((char, idx) => {
      if (char === letter) {
        this.myWord.children[idx].textContent = letter;
        letterFound = true;
      }
    });

    button.classList.add(letterFound ? 'right-button' : 'wrong-button');
    
    if (!letterFound) {
      this.lifeCount--;
      this.updateDisplays();
      this.updateHangmanImage();
    }

    this.checkGameOver();
  }

  updateHangmanImage() {
    if (this.hangmanParts[GAME_CONSTANTS.INITIAL_LIVES - this.lifeCount - 1]) {
      this.hangmanParts[GAME_CONSTANTS.INITIAL_LIVES - this.lifeCount - 1]
        .classList.remove('display-none');
    }
  }

  hideAllHangmanImages() {
    this.hangmanParts.forEach(part => part.classList.add('display-none'));
  }

  startTimer() {
    this.updateDisplays();
    this.currentCountdown = setInterval(() => {
      this.timerCount--;
      this.updateDisplays();
      if (this.timerCount <= 0) {
        this.stopTimer();
        this.checkGameOver();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.currentCountdown);
  }

  updateDisplays() {
    this.life.innerText = `목숨 : ${this.lifeCount}`;
    this.timer.innerText = `남은 시간 : ${this.timerCount}`;
  }

  checkGameOver() {
    const isComplete = [...this.myWord.children]
      .every(letter => letter.textContent !== '_');
    
    if (isComplete || this.lifeCount <= 0 || this.timerCount <= 0) {
      this.endGame(isComplete);
    }
  }

  endGame(isWin) {
    this.stopTimer();
    [this.alphabets, this.answerLetters, this.category].forEach(el => 
      el.classList.add('display-none')
    );
    
    this.gameoverMessage.classList.remove('display-none');
    this.gameoverMessage.style.whiteSpace = 'pre-line';
    this.gameoverMessage.textContent = isWin 
      ? MESSAGES.WIN(this.currentWord)
      : MESSAGES.LOSE(this.currentWord);
    
    this.endButtons.classList.remove('display-none');
  }
}

export { MainScreen, GameScreen };