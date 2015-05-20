var CARD_WIDTH = 73;
var CARD_HEIGHT = 97;
var SUITS = ['clubs', 'spades', 'hearts', 'diamonds'];
  
function Card(rank, suit) {
  
  this.rank = rank;
  this.suit = suit;
  this.color = function() {
    if ( ( suit == 'clubs' ) || ( suit == 'spades' ) ) {
      return 'black'
    } else if ( suit == 'hearts' || suit == 'diamonds' ) {
      return 'red'
    } else {
      return 'none'
    }
  }();
  this.el = document.createElement('div');
  this.el.className = 'card';
  this.el.setAttribute('data-rank', rank);
  this.el.setAttribute('data-suit', suit);
  this.el.setAttribute('data-top', '0');
  setDisplayAttributes( this );

  function setDisplayAttributes( card ) {
      var $card_el = $(card.el);
      console.log( card.rank);
      var rank = parseInt(card.rank);
      var suit = SUITS.indexOf(card.suit);
      var x_offset = - ( CARD_WIDTH * ( rank - 1 ) );
      var y_offset = - ( CARD_HEIGHT * ( suit ) );
      var backgroundPosition = x_offset + 'px ' + y_offset + 'px';
      console.log(backgroundPosition);
      $card_el.css('backgroundPosition', backgroundPosition); 
  }
}

function Deck() {
  this.cards = [];

  for (index in SUITS) {
    suit = SUITS[index];
    for (var rank = 1; rank < 14; rank++ ) {
      this.cards.push( new Card( rank, suit ) );
    };
  };

  this.deal = function() {
    return this.cards.pop();
  }

  this.shuffle = function() {
    shuffle( this.cards );
  }
}

// Fisher-Yates shuffle from stack overflow
// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}