$(document).ready(init);
var pieceSelected;
var thePiece;
var numOfDisks;
var selectedSound = new Audio('sounds/select.mp3');
var placingSound =  new Audio('sounds/place.mp3');
var invalidMove = new Audio('sounds/error.mp3');
var wonGame = new Audio('sounds/gameWon.mp3')
var numOfMoves;
var perfectScore;

function init(){
  $('.gameArea').css('visibility','hidden');
  pieceSelected=false;
  numOfMoves= 0;
  $('#startPanel').show();
  $('#startButton').one('click',startGame);
  $('.tower').on('click',interactWithDisk);
}

function interactWithDisk(){
  var winningMessage = {};
  thePiece = $(this).children().first();
  if (!pieceSelected) selectDisk(thePiece, $(this));
  else if (pieceSelected) activeDisk(thePiece, $(this));
  winningMessage.perfect = ['PERFECT!',' Congratulations, you completed this in the minimum number of moves.'];
  winningMessage.normal = ['Well done','You finished in ' + numOfMoves + ' moves. This problem could have been solved in '+ perfectScore + ' moves.'];
  if ($('#winningTower').children().length ==numOfDisks){

    $('#winningTower').empty();
    $('.tower').unbind('click');
    wonGame.play();
    swal({
      title: numOfMoves===perfectScore ? winningMessage.perfect[0] : winningMessage.normal[0],
      text: numOfMoves===perfectScore ? winningMessage.perfect[1] : winningMessage.normal[1],
      type: "success",
      showCancelButton: false,
      confirmButtonClass: 'btn-danger',
      confirmButtonText: 'Close', 
      closeOnConfirm: true
    })
    init();
  }
}

function selectDisk(thePiece,$this){
  if (thePiece.attr('class') && thePiece.attr('class').indexOf('disk') >= 0){
    thePiece.addClass('selected');
    pieceSelected = true;
    selectedSound.play()
   
  }
}

function startGame(){
  var value = $('#numOfDisks').val();
  $('.gameArea').css('visibility','visible');
  $('#startPanel').hide();
  numOfDisks = value < 7 && value > 1 ? value : 3 ;
  perfectScore = Math.pow(2,numOfDisks)-1;
  console.log(perfectScore);
  var arr = [];
  for (var i =  -numOfDisks + 7; i <= 6 ; i++){
    arr.push('<img class="disk" data-weight='+i+' src="pics/pagoda0'+ i +'.png">')
  }
  $('.gameArea').children().first().append(arr.map(function(disk){return disk}))
}

function activeDisk(thePiece, $this){ 
  if(thePiece.data('weight') > $('.selected').data('weight') || $this.children().length === 0 ){
    $this.prepend($('.selected').detach().removeClass('selected'));
    placingSound.play();
    numOfMoves ++;
    console.log(numOfMoves)
    pieceSelected=false;
  }else if(thePiece.attr('class').indexOf('selected') >= 0){
    thePiece.removeClass('selected');
    pieceSelected=false;
  }else{
    invalidMove.play()
  }
}


   