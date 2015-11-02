$(document).ready(init);
var pieceSelected;
var thePiece;
var numOfDisks;

function init(){
  pieceSelected=false;
  $('#startPanel').show();
  $('#startButton').one('click',startGame);
  $('.tower').on('click',interactWithDisk);
}

function interactWithDisk(){
  thePiece = $(this).children().first();
  if (!pieceSelected) selectDisk(thePiece, $(this));
  else if (pieceSelected) activeDisk(thePiece, $(this));
  if ($('#winningTower').children().length ==numOfDisks){
    $('#winningTower').empty();
    $('.tower').unbind('click')
    init();
  }
}

function selectDisk(thePiece,$this){
  if (thePiece.attr('class') && thePiece.attr('class').indexOf('disk') >= 0){
    thePiece.addClass('selected');
    pieceSelected = true;
  }
}

function startGame(){
  $('#startPanel').hide();
  numOfDisks = $('#numOfDisks').val();
  var arr = [];
  for (var i = 1; i <= numOfDisks; i++){
    arr.push('<div class="disk" data-weight='+i+'>')
  }
  $('.gameArea').children().first().append(arr.map(function(disk){return disk}))
}

function activeDisk(thePiece, $this){ 
  if(thePiece.data('weight') > $('.selected').data('weight') || $this.children().length === 0 ){
    $this.prepend($('.selected').detach().removeClass('selected'));
    pieceSelected=false;
  }else if(thePiece.attr('class').indexOf('selected') >= 0){
    thePiece.removeClass('selected');
    pieceSelected=false;
  }
}