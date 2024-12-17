let currentCountdown = null;

// 화면 요소 초기화
export const initializeDisplay = (
  instructions,
  title,
  start,
  category,
  answerLetters,
  alphabets
) => {
  instructions.classList.add('display-none');
  title.classList.add('display-none');
  start.classList.add('display-none');
  category.classList.remove('display-none');
  answerLetters.classList.remove('display-none');
  alphabets.classList.remove('display-none');
};

// 랜덤 카테고리와 단어 선택
export const selectRandomWord = (categoryList, category) => {
  const categoryKeys = Object.keys(categoryList);
  const randomCategoryKey =
    categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
  category.textContent = randomCategoryKey.toUpperCase();

  const randomList =
    categoryList[randomCategoryKey][
      Math.floor(Math.random() * categoryList[randomCategoryKey].length)
    ];

  return randomList.toUpperCase();
};

// 단어 표시
export const displayWord = (word, myWord) => {
  const listArray = [...word];
  listArray.forEach((letters) => {
    const listDiv = document.createElement('li');
    myWord.appendChild(listDiv);
    listDiv.classList.add('myWord-list');
    listDiv.textContent = letters === '_' ? ' ' : '_';
  });
};

// 알파벳 리스트 생성
export const createAlphabetList = (alphabets, checkLetter) => {
  // 알파벳 배열 생성
  const alphabetArray = Array(26)
    .fill()
    .map((v, i) => String.fromCharCode(i + 65));
  // 알파벳 버튼 생성
  alphabetArray.forEach((letter) => {
    const alphabetButton = document.createElement('button');
    alphabets.appendChild(alphabetButton);
    alphabetButton.classList.add('alphabet-button');
    alphabetButton.textContent = letter;
    alphabetButton.addEventListener('click', (e) => {
      alphabetButton.disabled = true;
      checkLetter(letter, e);
    });
  });
};

// 다시 플레이 함수
export const restartGame = (
  instructions,
  title,
  start,
  category,
  answerLetters,
  alphabets,
  gameover,
  myWord
) => {
  // 게임오버 화면 숨기기
  gameover.forEach((elem) => elem.classList.add('display-none'));

  // 기존 단어 제거
  myWord.innerHTML = '';

  // 게임 화면 초기화
  initializeDisplay(
    instructions,
    title,
    start,
    category,
    answerLetters,
    alphabets
  );
};

// 시작 화면으로 돌아가기 함수
export const goToStartPage = (
  instructions,
  title,
  start,
  category,
  answerLetters,
  alphabets,
  gameover,
  myWord,
  timer,
  timerCount
) => {
  // 게임오버 화면 숨기기
  gameover.forEach((elem) => elem.classList.add('display-none'));

  // 기존 단어 제거
  myWord.innerHTML = '';

  // 알파벳 숨기기
  alphabets.classList.add('display-none');

  // 카테고리와 답안 칸 숨기기
  category.classList.add('display-none');
  answerLetters.classList.add('display-none');

  // 시작화면 요소들 보이기
  instructions.classList.remove('display-none');
  title.classList.remove('display-none');
  start.classList.remove('display-none');

  //타이머 초기화
  timer.innerText = `남은 시간 : 60`;
};

// 타이머 시작
export const startTimer = (timer, timerCount, lifeCount, checkGameOver) => {
  timer.innerText = `남은 시간 : ${timerCount}`;
  currentCountdown = setInterval(() => {
    timerCount--;
    timer.innerText = `남은 시간 : ${timerCount}`;

    if (timerCount <= 0 || lifeCount <= 0) {
      clearInterval(currentCountdown);
      checkGameOver();
      return;
    }
  }, 1000);
};

// 타이머 정지 함수 추가
export const stopTimer = () => {
  if (currentCountdown) {
    clearInterval(currentCountdown);
    currentCountdown = null;
  }
};
