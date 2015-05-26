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
        $dest_rank = $destination_el[0].rank;
        $dest_suit = $destination_el[0].suit;
    }

    if ( ( $suit == $dest_suit ) && ( $rank == $dest_rank + 1 ) ) {
        return true
    } else {
        return false
    }
}