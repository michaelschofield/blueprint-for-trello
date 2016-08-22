
var blueprintLayers = [ '[touchpoint]', '[actor]', '[critical]', '[data]', '[idea]', '[observation]', '[policy]', '[question]', '[stakeholder]', '[system]' ];

var blueprintify = function() {

  $( '.list-card' ).each( function( index ){

    var card  = this,
        icon,
        title = card.querySelector( '.list-card-title' ),
        layers = ( title.textContent.match(/\[([^)]+)\]/) ? title.textContent.match(/\[([^)]+)\]/)  : '') ;

    if ( $.inArray( layers[0], blueprintLayers ) > -1 ) {

      var layer = layers[0].replace(/[\[\]']+/g,'');

      icon = document.createElement( 'img' );
      icon.setAttribute( 'src', chrome.extension.getURL( '/images/' + layer + '.svg' ) );
      icon.classList.add( 'step__icon' );

      // innerHTML rather than textContent preserves some of the hidden
      // elements trello bakes-in.
      title.innerHTML = title.innerHTML.replace( layers[0], '' );
      card.classList.add( 'step__' + layer );
      $( title ).prepend( icon );

    }

  });
}

//what to do when DOM loads
$(function(){

	$('.js-toggle-label-filter, .js-select-member, .js-due-filter, .js-clear-all').off('mouseup');
	$('.js-toggle-label-filter, .js-select-member, .js-due-filter, .js-clear-all').on('mouseup', blueprintify);
	$('.js-input').off('keyup');
	$('.js-input').on('keyup', blueprintify);
	$('.js-share').off('mouseup');


	blueprintify();
});
