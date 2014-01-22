/*
 * bootstrap-session-timeout
 * www.orangehilldev.com
 *
 * Copyright (c) 2014 Vedran Opacic
 * Licensed under the MIT license.
 */

'use strict';

(function( $ ){
    jQuery.sessionTimeout = function( options ) {
        var defaults = {
            message             : 'Your session is about to expire.',
            keepAliveUrl        : '/keep-alive',
            ajaxData            : '',
            redirUrl            : '/timed-out',
            logoutUrl           : '/log-out',
            warnAfter           : 900000,   // 15 minutes
            redirAfter          : 1200000,  // 20 minutes
            keepAliveInterval   : 5000,
            keepAlive           : true,
            ignoreUserActivity  : false,
            onWarn              : false,
            onRedir             : false
        };

        var opt = defaults,
            timer;

        // extend user-set options over defaults
        if ( options ) {
            opt = $.extend( defaults, options );
        }

        // some error handling if options are miss-configured
        if(opt.warnAfter >= opt.redirAfter){
            // for IE8 and earlier
            if (typeof console !== "undefined" || typeof console.error !== "undefined") {
                console.error('Bootstrap-session-timeout plugin is miss-configured. Option "redirAfter" must be equal or greater than "warnAfter".');
            }
            return false;
        }

        // unless user set his own callback function, prepare bootstrap modal elements and events
        if(typeof opt.onWarn !== 'function'){
            // create timeout warning dialog
            $('body').append('<div class="modal fade" id="sessionTimeout-dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">Your Session is About to Expire!</h4></div><div class="modal-body">'+ opt.message +'</div><div class="modal-footer"><button id="sessionTimeout-dialog-logout" type="button" class="btn btn-default">Logout</button><button id="sessionTimeout-dialog-keepalive" type="button" class="btn btn-primary" data-dismiss="modal">Stay Connected</button></div></div></div></div>');

            // "Logout" button click
            $('#sessionTimeout-dialog-logout').on('click', function () { window.location = opt.logoutUrl; });
            // "Stay Connected" button click
            $('#sessionTimeout-dialog').on('hide.bs.modal', function () {
                // restart session timer
                startSessionTimer();
            });
        }

        // reset timer on any of these events
        if (!opt.ignoreUserActivity) {
            $(document).on('keyup mouseup mousemove touchend touchmove', function() {
                startSessionTimer();
            });
        }

        // keeps the server side connection live, by pingin url set in keepAliveUrl option
        // keepAlivePinged is a helper var to ensure the functionality of the keepAliveInterval option
        var keepAlivePinged = false;
        function keepAlive () {
            if (!keepAlivePinged){
                $.ajax({
                    type: 'POST',
                    url: opt.keepAliveUrl,
                    data: opt.ajaxData
                });
                keepAlivePinged = true;
                setTimeout(function() {
                    keepAlivePinged = false;
                }, opt.keepAliveInterval);
            }
        }

        function startSessionTimer(){
            // console.log('startSessionTimer()');
            // clear session timer
            clearTimeout(timer);

            // if keepAlive option is set to "true", ping the "keepAliveUrl" url
            if (opt.keepAlive) {
                keepAlive();
            }

            // set session timer 
            timer = setTimeout(function(){
                // check for onWarn callback function and if there is none, launch dialog
                if(typeof opt.onWarn !== 'function'){
                    $('#sessionTimeout-dialog').modal('show');
                }
                else {
                    opt.onWarn('warn');
                }
                // start dialog timer
                startDialogTimer();
            }, opt.warnAfter);
        }

        function startDialogTimer(){
            // console.log('startDialogTimer()');
            // clear session timer
            clearTimeout(timer);

            // set dialog timer 
            timer = setTimeout(function(){
                // check for onRedir callback function and if there is none, launch redirect
                if(typeof opt.onRedir !== 'function'){
                    startDialogTimer('start');
                    window.location = opt.redirUrl;
                }
                else {
                    opt.onRedir();
                }
            }, (opt.redirAfter - opt.warnAfter));
        }

        // start session timer
        startSessionTimer();
    };
})( jQuery );