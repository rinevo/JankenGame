const choices = ['rock','paper','scissors'];
const labels = {rock:'グー',paper:'パー',scissors:'チョキ'};
let playerScore = 0, cpuScore = 0;
let prevPlayerScore = 0, prevCpuScore = 0;

const playerScoreEl = document.getElementById('player-score');
const cpuScoreEl = document.getElementById('cpu-score');
const resultEl = document.getElementById('result');
const choiceButtons = document.querySelectorAll('.choice');
const resetBtn = document.getElementById('reset');
const playerHandEl = document.getElementById('player-hand');
const cpuHandEl = document.getElementById('cpu-hand');

function getCpuChoice(){
  return choices[Math.floor(Math.random()*choices.length)];
}

function decide(player, cpu){
  if(player === cpu) return 'draw';
  if((player === 'rock' && cpu === 'scissors') ||
     (player === 'paper' && cpu === 'rock') ||
     (player === 'scissors' && cpu === 'paper')){
    return 'win';
  }
  return 'lose';
}

function animateScore(el){
  el.classList.add('score-pulse');
  setTimeout(()=>el.classList.remove('score-pulse'),360);
}

function updateScores(){
  playerScoreEl.textContent = playerScore;
  cpuScoreEl.textContent = cpuScore;
  if(playerScore > prevPlayerScore) animateScore(playerScoreEl);
  if(cpuScore > prevCpuScore) animateScore(cpuScoreEl);
  prevPlayerScore = playerScore;
  prevCpuScore = cpuScore;
}

// history removed: no DOM history list maintained

choiceButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const playerMove = btn.getAttribute('data-move');
    // animation: shake both hands, then reveal
    playerHandEl.textContent = '✊';
    cpuHandEl.textContent = '✊';
    playerHandEl.style.transform = 'translateY(0)';
    cpuHandEl.style.transform = 'translateY(0)';
    playerHandEl.classList.remove('reveal');
    cpuHandEl.classList.remove('reveal');

    // add quick shake
    playerHandEl.style.transform = 'rotate(-20deg)';
    cpuHandEl.style.transform = 'rotate(20deg)';

    setTimeout(() => {
      playerHandEl.style.transform = 'rotate(0deg) scale(1.05)';
      cpuHandEl.style.transform = 'rotate(0deg) scale(1.05)';

      const cpuMove = getCpuChoice();
      const outcome = decide(playerMove, cpuMove);

      // map move to emoji
      const emojiMap = {rock: '✊', paper: '✋', scissors: '✌️'};
      playerHandEl.textContent = emojiMap[playerMove];
      cpuHandEl.textContent = emojiMap[cpuMove];

      if(outcome === 'win'){
        playerScore++;
        resultEl.textContent = `あなたの${labels[playerMove]} は ${labels[cpuMove]} に勝ちました！`;
        resultEl.className = 'result win';
      } else if(outcome === 'lose'){
        cpuScore++;
        resultEl.textContent = `あなたの${labels[playerMove]} は ${labels[cpuMove]} に負けました...`;
        resultEl.className = 'result lose';
      } else {
        resultEl.textContent = `引き分け：両方 ${labels[playerMove]} です`;
        resultEl.className = 'result draw';
      }

      updateScores();
    }, 300);
  });
});

resetBtn.addEventListener('click', () => {
  playerScore = 0; cpuScore = 0;
  updateScores();
  resultEl.textContent = 'リセットしました。出した手を選んでください';
  resultEl.className = 'result';
  playerHandEl.textContent = '✊';
  cpuHandEl.textContent = '✊';
  prevPlayerScore = 0; prevCpuScore = 0;
});

// Initialize
updateScores();
