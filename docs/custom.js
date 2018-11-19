'use strict';

function domReady(fn) {
    if (document.readyState != 'loading') {
        fn(document);
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function () {
            fn(document)
        });
    } else {
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState != 'loading') {
                fn(document);
            }
        });
    }
}

domReady(function(d){
    if (window.self !== window.top) {
        /* this document is loaded in a frame/iframe */
        d.documentElement.className += " in-iframe";
    }
});