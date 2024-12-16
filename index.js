//# selectors
const life = document.querySelector('#life');
const timer = document.querySelector('#timer');
const title = document.querySelector('#hangman-title');
const start = document.querySelector('#start-button');
const alphabets = document.querySelector('#alphabets');
const mainCenter = document.querySelector('#main-center');
const category = document.querySelector('#category');
const answerLetters = document.querySelector('#answer-letters');
const instructions = document.querySelector('#instructions');
const myWord = document.querySelector('#my-word');
//# main-top
// 목숨, 남은 시간

//# main-center
// 초기값 = h1 제목, button
// 알파벳 클릭하면 성공시 알파벳 사라짐 변수에 있는 밑줄*모두) -> 글자, 실패시 캔버스 그림 추가,목숨 감소
start.addEventListener('click', () => {
  //시작 버튼 누르면 설명서 숨기기
  instructions.classList.add('display-none');
  //시작 버튼 누르면 알파벳창 나오기
  alphabetList();
  //시작 버튼 누르면 title , 시작버튼 숨기기
  title.classList.add('display-none');
  start.classList.add('display-none');
  //시작 버튼 누르면 종목 , 글자 갯수만큰 밑줄
  category.classList.remove('display-none');
  answerLetters.classList.remove('display-none');
  //랜덤 종목 뽑기 , 종목 표시
  const categoryKeys = Object.keys(categoryList);
  const randomCategoryKey =
    categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
  category.textContent = randomCategoryKey.toUpperCase();
  //종목에서 랜덤 value 뽑기
  const randomList =
    categoryList[randomCategoryKey][
      Math.floor(Math.random() * categoryList[randomCategoryKey].length)
    ];
  //뽑은 value -> array -> 담을 div 생성 -> forEach 로 각 글자마다 li 생성 textContent로 집어넣기,css flex+스타일링 ->
  const randUpper = randomList.toUpperCase(); //대문자로
  const listArray = [...randUpper]; //뽑은 str -> array
  currentWord = randUpper;
  listArray.forEach((letters) => {
    const listDiv = document.createElement('li');
    myWord.appendChild(listDiv);
    listDiv.classList.add('myWord-list');
    if (letters == '_') {
      listDiv.textContent = ' ';
    } else {
      listDiv.textContent = '_';
    }
  });
});

//알파벳 클릭하면 알파벳에 맞게 글자 변경

//성공시 정답 , 성공했습니다, 처음부터 다시하기 button
//실패시 정답 , 실패했습니다, 다시 시작 button

//# main-bottom
let currentWord = '';
//알파벳 button 추가
const alphabetList = function () {
  //알파벳 배열 생성
  const alphabetArray = Array(26)
    .fill()
    .map((v, i) => String.fromCharCode(i + 65));
  //알파벳 배열 수만큼 버튼 생성
  alphabetArray.forEach((letter) => {
    const alphabetButton = document.createElement('button');
    alphabets.appendChild(alphabetButton);
    alphabets.classList.add('alphabet-button');
    alphabetButton.textContent = letter;

    alphabetButton.addEventListener('click', (e) => {
      alphabetButton.disabled = true;
      checkLetter(letter, e);
    });
  });
};

//알파벳 체크
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
  //버튼 색상 추가
  if (isCorrect) {
    clickedButton.classList.add('right-button');
  } else {
    clickedButton.classList.add('wrong-button');
  }

  return isCorrect;
};

//# 잡 계산

import { categoryList } from './constants.js';
