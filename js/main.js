$(document).ready(function() {
    var CARD_WIDTH = 73;
    var CARD_HEIGHT = 97;
    var $CARD_OFFSET = 25;
    var SUITS = ['clubs', 'spades', 'hearts', 'diamonds'];

    function cardSelected() {
        var selected_ary = $('.card.selected');
        return selected_ary[0]
    }

    function deselectCard( $card_el ) {
        $card_el.removeClass('selected');
    }

    function isEmpty( $column_el ) {
        return ( $column_el.children().length == 0 )
    }

    function isSelected( $card_el ) {
        return $card_el.hasClass('selected');
    }

    function isTopCard( $card_el ) {
        return $card_el.is(':last-child');
    }

    function moveCard( $card_el, $destination_el ) {
        console.log('move card', $card_el, $destination_el );
        deselectCard( $card_el );
        placeCard( $card_el, $destination_el.closest('.column') );
        // $destination_el.closest('.column').append( $card_el );
        setCSSTop( $card_el );
    }

    function selectCard( $card_el ) {
        $card_el.addClass('selected');
    }

    function setCSSTop( $card_el ) {
        var $parent_el = $card_el.parent();
        console.log($parent_el);
        var top = 0;
        if ( $parent_el.data('column-type') == 'tableau' ) {
            var children = $parent_el.children();
            var child_number = children.length;
            top = ( ( child_number - 1 ) * $CARD_OFFSET) + 'px';
        };
        $card_el.css('top' , top)
    }

    function placeCard( $card_el, $position_el ) {
        $position_el.append( $card_el );
    }

    function isValidMove( $card_el, $destination_el ) {
        
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
        var $this = $(this);
        console.log( cardSelected() );
        var cardAlreadySelected = cardSelected();
        if ( isTopCard( $this ) ) {
            if ( isSelected( $this ) ) {
                deselectCard( $this );
            } else {
                if ( cardAlreadySelected != null ) {
                    moveCard( $(cardAlreadySelected), $this );
                } else {
                    selectCard( $this );
                }  
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

    $('.column').click( function() {
        var $this = $(this);
        var cardAlreadySelected = cardSelected();
        if ( ( isEmpty( $this ) ) && ( cardAlreadySelected != null ) ) {
            moveCard( $(cardAlreadySelected), $(this) );
        }
    })
});