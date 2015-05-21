$(document).ready(function() {
    var CARD_WIDTH = 73;
    var CARD_HEIGHT = 97;
    var $CARD_OFFSET = 25;

    var SUITS = ['clubs', 'spades', 'hearts', 'diamonds'];

    function deselectCard( card_el ) {
        $(card_el).removeClass('selected');
    }

    function isTopCard( card_el ) {
        return $(card_el).is(':last-child');
    }

    function isSelected( card_el ) {
        return $(card_el).hasClass('selected');
    }

    function moveCard( $card_el, $destination_el ) {
        console.log('move card', $card_el, $destination_el );
        $card_el.css('top','0');
        $destination_el.append( $card_el );
    }

    function selectCard( card_el ) {
        $(card_el).addClass('selected');
    }

    function cardSelected() {
        var selected_ary = $('.card.selected');
        return selected_ary[0]
    }

    function setCSSTop( $card_el ) {
        var children = $card_el.parent().children();
        var child_number = children.length;
        var top = (child_number * $CARD_OFFSET) + 'px';
        $card_el.css('top' , top)
    }

    function placeCard( card_el, position_el ) {
        position_el.append( card_el );
    }

    function Game() {
        var deck = this.deck;
        deck = new Deck();
        deck.shuffle();

        this.deal = function() {
            var column = 1;
            while ( deck.cards.length > 0 ) {
                var $card_el = $(deck.cards.pop().el);
                var top_string = ( top + 'px' );
                $('.tableau .column.'+column).append( $card_el );
                setCSSTop( $card_el );
                column += 1;
                if ( column > 8 ) {
                    column = 1;
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
        console.log( cardSelected() );

        if ( isTopCard( this ) ) {
            if ( isSelected( this ) ) {
                deselectCard( this );
            } else {
                // moveCard( $(this), $('.foundations .column.1') );
                selectCard( this );
            };
        };
    });

    $('.card').
        mousedown( function() {
            $(this).addClass('show');
        }).
        mouseup( function() {
            $(this).removeClass('show');
        });


});