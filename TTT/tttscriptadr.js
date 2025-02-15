const cells=document.querySelectorAll('.cell');
const text=document.querySelector('#Text');
const rematchBtn=document.querySelector('#rematchButton');

const winConditions=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];
let options=["","","","","","","","",""];
let currentPlayer='❌'; //🐟
let isRunning=false;
startGame();


function startGame(){ 
cells.forEach(cell=>cell.addEventListener('click',cellClicked));
rematchBtn.addEventListener('click',rematch);
text.innerText=`It's ${currentPlayer}'s turn.....`;
isRunning=true;
}
function cellClicked(){
const cindex=this.getAttribute("cellIndex");
if(options[cindex]!="" || !isRunning){
    return;
}
updateCell(this,cindex);
whoWon();
}
function updateCell(cell, index){
  options[index]=currentPlayer;
  cell.innerText=currentPlayer;
  //changePlayer();
}
function changePlayer(){
 currentPlayer=(currentPlayer=='❌')?'⭕':'❌';
 text.innerText=`It's ${currentPlayer}'s turn.....`;

 }
function whoWon(){

 didSomeoneWin=false;
 for(let i=0; i<winConditions.length;i++){
    const positions=winConditions[i];
   //we checkin winning positions
    const cell1=options[positions[0]];
    const cell2=options[positions[1]];
    const cell3=options[positions[2]];
    
    if(cell1=="" && cell2=="" && cell3=="")
    continue; //skip that iteration when cells r empty

    if(cell1==cell2 && cell2==cell3){
    didSomeoneWin=true;
     break;
   }
}
 if(didSomeoneWin){
  text.innerText=`${currentPlayer} has WON!!`;
  isRunning=false;
 }
 else if(!options.includes("")){
  text.innerText=`It's a TIE?!\nYou can have a Rematch.`;
  isRunning=false; 
}
 else{
 changePlayer();
 }
}

function rematch(){
  currentPlayer = '❌';
    options=["", "", "", "", "", "", "", "", ""];
    text.innerText = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    isRunning = true;
}
