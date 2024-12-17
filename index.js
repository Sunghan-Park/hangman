import { initializeDisplay, selectRandomWord, displayWord, createAlphabetList, restartGame, goToStartPage, startTimer, stopTimer } from './system.js';
import { categoryList } from './constants.js';

//# selectors
// 공통 요소
const life = document.querySelector('#life');
const timer = document.querySelector('#timer');
const mainCenter = document.querySelector('#main-center');

// 메인화면 요소들
const mainScreenElements = document.querySelectorAll('.main-screen');
const title = document.querySelector('#hangman-title');
const start = document.querySelector('#start-button');
const instructions = document.querySelector('#instructions');

// 게임화면 요소들
const gameScreenElements = document.querySelectorAll('.game-screen');
const restart = document.querySelector('#restart-button');
const alphabets = document.querySelector('#alphabets');
const category = document.querySelector('#category');
const answerLetters = document.querySelector('#answer-letters');
const myWord = document.querySelector('#my-word');
const gameover = document.querySelectorAll('.gameover');

let lifeCount = 7;
let timerCount = 60;
let initial = true;
let win = false;
let currentWord = '';

// 시작 버튼 이벤트 리스너
start.addEventListener('click', () => {
  // 화면 초기화
  initializeDisplay(instructions, title, start, category, answerLetters, alphabets);
  
  // 알파벳 리스트 초기 생성
  if (initial) {
    createAlphabetList(alphabets, checkLetter);
  }
  initial = false;
  
  // 랜덤 단어 선택 및 저장
  currentWord = selectRandomWord(categoryList, category);
  
  // 단어 표시
  displayWord(currentWord, myWord);
  
  // 타이머 시작
  timerCount = startTimer(timer, timerCount, checkGameOver);
});

// 알파벳 체크 함수
const checkLetter = (click, e) => {
  const letterVal = myWord.querySelectorAll('li');
  const wordArray = [...currentWord];
  let isCorrect = false;
  const clickedButton = e.target;

  wordArray.forEach((letter, index) => {
    if (letter === click) {
      letterVal[index].textContent = click;
      isCorrect = true;
    }
  });

  if (isCorrect) {
    clickedButton.classList.add('right-button');
  } else {
    clickedButton.classList.add('wrong-button');
    lifeCount -= 1;
    life.innerText = `목숨 : ${lifeCount}`;
  }

  checkGameOver();
  return isCorrect;
};

// 승리/패배 체크 함수
const checkGameOver = () => {
  // 패배 조건
  if (lifeCount <= 0 || window.timerCount <= 0) {
    win = false;
    endGame();
    return;
  }

  // 승리 조건
  const letterVal = myWord.querySelectorAll('li');
  const isComplete = Array.from(letterVal).every(
    (letter) => letter.textContent !== '_' && letter.textContent !== ' '
  );
  
  if (isComplete) {
    win = true;
    endGame();
  }
};

// 게임 종료 처리 함수
const endGame = () => {
  // 타이머 정지
  stopTimer();
  
  // 알파벳 버튼들 초기화
  const allAlphabetButtons = document.querySelectorAll('.alphabet-button');
  allAlphabetButtons.forEach((button) => {
    button.disabled = false;
    button.classList.remove('right-button', 'wrong-button');
  });

  // 버튼 요소 숨김
  alphabets.classList.add('display-none');
  
  // 기존 단어(밑줄) 제거
  answerLetters.classList.add('display-none');
  
  // 목숨, 타이머 초기화
  timerCount = 60;
  lifeCount = 7;
  
  // 게임오버 메시지 표시 (어차피 하나라 반복문 의미 없기는 함)
  gameover.forEach(elem => elem.classList.remove('display-none'));
  //승리 패배 표시
  category.innerHTML = win 
    ? `정답입니다!!!<br>정답은 ${currentWord}입니다`
    : `오답입니다 T.T<br>정답은 ${currentWord}입니다`;
};

// 다시 플레이 버튼 
restart.addEventListener('click', () => {
  restartGame(instructions, title, start, category, answerLetters, alphabets, gameover, myWord);
  
  // 새 게임 시작
  currentWord = selectRandomWord(categoryList, category);
  displayWord(currentWord, myWord);
  timerCount = startTimer(timer, timerCount, checkGameOver);
});

// 시작 화면 버튼 
startPage.addEventListener('click', () => {
  timerCount = goToStartPage(instructions, title, start, category, answerLetters, alphabets, gameover, myWord, timer, timerCount);
});

