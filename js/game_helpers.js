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