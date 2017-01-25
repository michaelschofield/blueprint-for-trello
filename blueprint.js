
const blueprintLayers = [ '[touchpoint]', '[actor]', '[critical]', '[data]', '[idea]', '[observation]', '[policy]', '[question]', '[stakeholder]', '[system]' ];

const blueprintify = function() {

    const cards = document.querySelectorAll( '.list-card' );
    const lists = document.querySelectorAll( '.list' );

    cards.forEach( card => {

        const title = card.querySelector( '.list-card-title' );
        const layers = ( title ? title.textContent.match(/\[([^)]+)\]/gi)  : '');

        if ( layers && blueprintLayers.includes( layers[0].toLowerCase() ) ) {

            const layer = layers[0].replace(/[\[\]']+/g,'').toLowerCase();
            const icon = document.createElement( 'img' );

            icon.setAttribute( 'src', chrome.extension.getURL( '/images/' + layer + '.svg' ) );
            icon.classList.add( 'step__icon' );
            title.innerHTML = title.innerHTML.replace( layers[0], '' );
            card.classList.add( 'step__' + layer );

            card.querySelector( '.list-card-details').insertBefore( icon, title );

        }

    });

    lists.forEach( list => {
       const step =  list.querySelector( 'h2.list-header-name-assist' );
       const visibility = ( step ? step.textContent.match(/\[([^)]+)\]/)  : '');

       if ( visibility && visibility[0].toLowerCase() == '[hidden]' ) {
           list.classList.add( 'step--hidden' );
           step.innerHTML = step.innerHTML.replace( visibility[0], '' );
       }
    });

}

const CrossBrowser = {
    init: function(){
        this.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null;
    }
};

CrossBrowser.init();

const listObserver = new CrossBrowser.MutationObserver( function( mutations ) {

    mutations.forEach( function( mutation, index ) {

        const $target = mutation.target;

        if ( $target.classList ) {


            if (!($target.classList.contains('list-total')
                    || $target.classList.contains('list-title')
                    || $target.classList.contains('list-header')
                    || $target.classList.contains('date') // the 'time-ago' functionality changes date spans every minute
                    || $target.classList.contains('js-phrase') // this is constantly updated by Trello, but doesn't affect estimates.
                    || $target.classList.contains('member')
                    || $target.classList.contains('clearfix')
                    || $target.classList.contains('badges')
                    || $target.classList.contains('header-btn-text')
                    || (typeof mutation.target.className == "undefined")
                )) {
                if ($target.classList.contains('badge')) {
                    //    refreshJustTotals = true;

                } else {
                    // It appears this was an actual modification and not a recursive notification.
                    // doFullRefresh = true;
                    blueprintify();
                }
            }

        }

    });


});

const observerConfiguration = {
    childList: true,
    characterData: true,
    attributes: false,
    subtree: true
};

listObserver.observe( document.body, observerConfiguration );