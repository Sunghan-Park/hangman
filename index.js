import { MainScreen, GameScreen } from './system.js';
import { categoryList } from './constants.js';

class GameController {
  constructor() {
    this.mainScreen = new MainScreen();
    this.gameScreen = new GameScreen(categoryList);
    this.bindEvents();
  }

  bindEvents() {
    this.mainScreen.startButton.addEventListener('click', () => this.startGame());
    document.querySelector('#restart-button').addEventListener('click', () => this.restartGame());
    document.querySelector('#startPage').addEventListener('click', () => this.goToStartPage());
  }

  startGame() {
    this.mainScreen.hide();
    this.gameScreen.show();
    this.gameScreen.initializeGame();
  }

  restartGame() {
    this.gameScreen.initializeGame();
  }

  goToStartPage() {
    this.gameScreen.stopTimer();
    this.gameScreen.hide();
    this.mainScreen.show();
  }
}

new GameController();