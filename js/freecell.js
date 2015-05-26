
function availableFreecell() {
    $freecells = $('.freecells').children();
    var $return_el = null;
    $freecells.each( function() {
        if ( isEmpty( $(this) ) ) {
            $return_el = $(this);
        }
    });

    return $return_el
}

function availableFoundation( $card_el ) {
    $foundations = $('.foundations').children();
    var $return_el = null;
    $foundations.each( function() {
        $foundation_top_card = getFoundationTopCard( $(this) );
        if ( isValidFoundationMove( $card_el, $foundation_top_card ) ) {
            $return_el = $(this);
        }
    });

    return $return_el;
}

function getFoundationTopCard( $foundation_el ) {
    return $foundation_el.children().last();
}

function availableTableau() {
    return null
}

function bestMove( $card_el ) {
    $availableFoundation = availableFoundation( $card_el );
    if ( $availableFoundation ) {
        return $availableFoundation;
    }

    $availableFreecell = availableFreecell();
    if ( $availableFreecell ) {
        return $availableFreecell;
    }

    $availableTableau = availableTableau();
    if ( $availableTableau ) {
        return $availableTableau;
    }
    return null
}

function isValidMove( $card_el, $destination_el ) {
    var dest_type = columnType( $destination_el )
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
    
    if ( isEmpty( $destination_el ) ) {
        return true;
    } else {
        $dest_rank = $destination_el[0].rank;
        $dest_color = $destination_el[0].color;
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
        $last_card = ( $destination_el.hasClass('card') ) ? $destination_el : $destination_el.children().last();
        $dest_rank = $last_card[0].rank;
        $dest_suit = $last_card[0].suit;
    }

    if ( ( $suit == $dest_suit ) && ( $rank == $dest_rank + 1 ) ) {
        return true
    } else {
        return false
    }
}


