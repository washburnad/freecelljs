$(document).ready(function() {
    var CARD_WIDTH = 73;
    var CARD_HEIGHT = 97;
    var SUITS = ['clubs', 'spades', 'hearts', 'diamonds'];
    
    $('.card').each(function() {
        var $this = $(this);
        var rank = parseInt($this.data('rank'));
        var suit = SUITS.indexOf($this.data('suit'));
        var top = $this.data('top');
        console.log(rank, suit);
        var x_offset = - ( CARD_WIDTH * ( rank - 1 ) );
        var y_offset = - ( CARD_HEIGHT * ( suit ) );
        var backgroundPosition = x_offset + 'px ' + y_offset + 'px';
        console.log( backgroundPosition, top );
        $this.css({
            'backgroundPosition': backgroundPosition,
            'top': top
        });       
    }); 
});