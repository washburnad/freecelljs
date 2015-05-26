$(document).ready(function() {
    var CARD_WIDTH = 73;
    var CARD_HEIGHT = 97;
    var $CARD_OFFSET = 25;
    var SUITS = ['clubs', 'spades', 'hearts', 'diamonds'];

    // returns the card element with class .selected
    function cardSelected() {
        var selected_ary = $('.card.selected');
        return selected_ary[0]
    }

    function deselectCard( $card_el ) {
        $card_el.removeClass('selected');
    }

    // determines if the column element is in is empty
    function isEmpty( $el ) {
        var $column_el = $el.closest('.column');
        return ( $column_el.children().length == 0 )
    }

    function isSelected( $card_el ) {
        return $card_el.hasClass('selected');
    }

    function isTopCard( $card_el ) {
        return $card_el.is(':last-child');
    }

    function isValidMove( $card_el, $destination_el ) {
        var dest_type = columnType( $destination_el )
        console.log( dest_type );
        switch (dest_type) {
            case 'foundation':
                return isValidFoundationMove( $card_el, $destination_el )
            break;

            case 'tableau':
                return isValidTableauMove( $card_el, $destination_el )
            break;

            case 'freecell':
                if ( isEmpty( $destination_el ) ) {
                    return true;
                } else {
                    return false;
                };
            break;

            default:
                return false;
        }
    }

    function isValidTableauMove( $card_el, $destination_el ) {
        $rank = $card_el[0].rank;
        $color = $card_el[0].color;
        console.log($card_el[0], $rank, $color);
        
        if ( isEmpty( $destination_el ) ) {
            return true;
        } else {
            $dest_rank = $destination_el[0].rank;
            $dest_color = $destination_el[0].color;
            console.log($destination_el[0], $dest_color, $dest_rank);
        }
        
        if ( ( $color != $dest_color ) && ( $rank == $dest_rank - 1 ) ) {
            return true
        } else {
            return false
        }
    }

    function isValidFoundationMove( $card_el, $destination_el ) {
        $rank = $card_el[0].rank;
        $suit = $card_el[0].suit;
        if ( isEmpty( $destination_el ) ) {
            $dest_suit = $suit;
            $dest_rank = 0;
        } else {
            $dest_rank = $destination_el[0].rank;
            $dest_suit = $destination_el[0].suit;
        }

        if ( ( $suit == $dest_suit ) && ( $rank == $dest_rank + 1 ) ) {
            return true
        } else {
            return false
        }
    }

    function moveCard( $card_el, $destination_el ) {
        if ( isValidMove( $card_el, $destination_el ) ) {
            deselectCard( $card_el );
            placeCard( $card_el, $destination_el.closest('.column') );
            setCSSTop( $card_el );
        };
    }

    function selectCard( $card_el ) {
        $card_el.addClass('selected');
    }

    // determines the correct css 'top' value for cards placed in tableau
    function setCSSTop( $card_el ) {
        var $parent_el = $card_el.parent();
        var top = 0;
        if ( columnType( $card_el ) == 'tableau' ) {
            var children = $parent_el.children();
            var child_number = children.length;
            top = ( ( child_number - 1 ) * $CARD_OFFSET) + 'px';
        };
        $card_el.css('top' , top)
    }

    function placeCard( $card_el, $position_el ) {
        $position_el.append( $card_el );
    }

    function columnType( $el ) {
        return $el.closest('.column').data('column-type');
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