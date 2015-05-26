$(document).ready(function() {

    function moveCard( $card_el, $destination_el ) {
        if ( isValidMove( $card_el, $destination_el ) ) {
            deselectCard( $card_el );
            placeCard( $card_el, $destination_el.closest('.column') );
            setCSSTop( $card_el );
        };
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

        this.init = function() {
            this.deal();

            // card click handler
            $('.card').click( function() {
                var $this = $(this);
                var cardAlreadySelected = cardSelected();
                if ( isTopCard( $this ) ) {
                    if ( isSelected( $this ) ) {
                        $bestMove = bestMove( $this );
                        if ( $bestMove ){
                            moveCard( $this, $bestMove )
                        };
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
            });
        }
    }


    function main() {
        var myGame = new Game();
        myGame.init();
        // myGame.deal();
    }

    main();
});