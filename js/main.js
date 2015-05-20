$(document).ready(function() {
    var CARD_WIDTH = 73;
    var CARD_HEIGHT = 97;
    var SUITS = ['clubs', 'spades', 'hearts', 'diamonds'];



    function placeCard( card_el, position_el ) {
        // displayCard( card_el );
        position_el.append( card_el );
    }

    function Game() {
        this.deck = new Deck();
        this.deck.shuffle();
    }

    var myGame = new Game();
    var position_el = $('.foundations .space').first();

    for (index in myGame.deck.cards) {
        placeCard( myGame.deck.cards[index].el, position_el );
    }
});