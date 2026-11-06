const board = document.querySelector("#board");
const movesLabel = document.querySelector("#moves");
const timeLabel = document.querySelector("#time");
const message = document.querySelector("#message");
const difficulty = document.querySelector("#difficulty");
let size = Number(difficulty.value), tiles = [], moves = 0, seconds = 0, clock = null, started = false;

function solvedState(){ return [...Array(size * size - 1).keys()].map(n => n + 1).concat(0); }
function formatTime(value){ return String(Math.floor(value / 60)).padStart(2,"0") + ":" + String(value % 60).padStart(2,"0"); }
function updateStats(){ movesLabel.textContent = moves; timeLabel.textContent = formatTime(seconds); }
function startClock(){
  if(started) return;
  started = true;
  clock = setInterval(() => { seconds++; updateStats(); },1000);
}
function stopClock(){ if(clock){ clearInterval(clock); clock = null; } started = false; }
function neighbours(index){
  const row = Math.floor(index / size), col = index % size;
  return [[row-1,col],[row+1,col],[row,col-1],[row,col+1]]
    .filter(([r,c]) => r >= 0 && r < size && c >= 0 && c < size)
    .map(([r,c]) => r * size + c);
}
function render(){
  board.style.gridTemplateColumns = `repeat(${size}, minmax(0,1fr))`;
  board.replaceChildren();
  tiles.forEach((value,index) => {
    const tile = document.createElement("button");
    tile.className = value === 0 ? "tile empty" : "tile";
    tile.type = "button";
    tile.textContent = value || "";
    tile.setAttribute("aria-label", value ? `Move tile ${value}` : "Empty space");
    tile.disabled = value === 0;
    tile.addEventListener("click",() => moveTile(index));
    board.append(tile);
  });
}
function moveTile(index){
  const empty = tiles.indexOf(0);
  if(!neighbours(empty).includes(index) || message.classList.contains("win")) return;
  startClock();
  [tiles[index],tiles[empty]] = [tiles[empty],tiles[index]];
  moves++;
  updateStats();
  render();
  if(tiles.every((value,i) => value === solvedState()[i])){
    stopClock();
    message.textContent = `Puzzle solved in ${moves} moves and ${formatTime(seconds)}. Great work!`;
    message.classList.add("win");
  }
}
function shuffleBoard(){
  tiles = solvedState();
  let previousEmpty = -1;
  for(let i=0;i<Math.max(100,size*size*30);i++){
    const empty = tiles.indexOf(0);
    const choices = neighbours(empty).filter(index => index !== previousEmpty);
    const next = choices[Math.floor(Math.random()*choices.length)];
    [tiles[empty],tiles[next]] = [tiles[next],tiles[empty]];
    previousEmpty = empty;
  }
  moves = 0; seconds = 0; stopClock(); updateStats();
  message.textContent = "Choose a tile beside the empty space to move it.";
  message.classList.remove("win");
  render();
}
function resetGame(){
  tiles = solvedState(); moves = 0; seconds = 0; stopClock(); updateStats();
  message.textContent = "Board reset. Start arranging the numbers!";
  message.classList.remove("win"); render();
}
document.querySelector("#shuffle").addEventListener("click",shuffleBoard);
document.querySelector("#reset").addEventListener("click",resetGame);
difficulty.addEventListener("change",() => { size = Number(difficulty.value); shuffleBoard(); });
shuffleBoard();
