const GAME_CONSTANTS = {
  INITIAL_LIVES: 7,
  INITIAL_TIME: 60,
  DISPLAY_NONE: 'display-none',
  RIGHT_BUTTON: 'right-button',
  WRONG_BUTTON: 'wrong-button'
};

const MESSAGES = {
  WIN: (word) => `정답입니다!!!\n정답은 ${word.replace(/_/g, ' ')} 입니다`,
  LOSE: (word) => `오답입니다 T.T\n정답은 ${word.replace(/_/g, ' ')} 입니다`
};

const categoryList = {
  game: ['maplestory', 'lostark', 'starcraft', 'palworld', 'overwatch', 'league_of_legends', 'valorant', 'dota2', 'overcooked', 'teamfight_tactics'],
  cities: ['seoul', 'newyork', 'tokyo', 'sydney', 'paris', 'london', 'berlin', 'rome', 'madrid', 'barcelona'],
  movies: ['harry_potter', 'lord_of_the_rings', 'avengers', 'the_dark_knight', 'the_matrix', 'fast_and_furious', 'dr_stranger', 'alien'],
  sports: ['tennis', 'soccer', 'football', 'golf', 'basketball', 'baseball', 'hockey', 'volleyball']
};

export { categoryList, GAME_CONSTANTS, MESSAGES };


