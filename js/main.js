$(document).ready(function() {
    var CARD_WIDTH = 73;
    var CARD_HEIGHT = 97;
    var SUITS = ['clubs', 'spades', 'hearts', 'diamonds'];


    function placeCard( card_el, position_el ) {
        // displayCard( card_el );
        position_el.append( card_el );
    }

    function isTopCard( card_el ) {
        var topCard = $(card_el).is(':last-child');
        return topCard
    }

    function Game() {
        var deck = this.deck;
        deck = new Deck();
        deck.shuffle();

        this.deal = function() {
            var column = 1;
            var top = 0;
            while ( deck.cards.length > 0 ) {
                var $card_el = $(deck.cards.pop().el);
                var top_string = ( top + 'px' );
                console.log( $card_el );
                $card_el.css('top', top_string );
                $('.tableau .column.'+column).append( $card_el );
                column += 1;
                if ( column > 8 ) {
                    column = 1;
                    top += 25;
                }
            }
        }
    }


    function main() {
        var myGame = new Game();
        myGame.deal()
    }
    
    main();

    // card click handler
    $('.card').click( function() {
        if ( isTopCard( this ) ) {
            $(this).addClass('selected');
        };
    });
});