jQuery(function($){ url = new URL(window.location.href);$('a#eventView').on('click', function(e){ var event_id_fn = event_id();$.post( 'http://rest-api.local/wp-content/plugins/capi-server-side-tracking/capi_api/api.php', { event_name: 'InitiateCheckout', event_source_url: window.location.href, client_user_agent: navigator.userAgent, event_id: event_id_fn }).done(function( data ) { });});$('a#eventLead').on('click', function(e){ var event_id_fn = event_id();$.post( 'http://rest-api.local/wp-content/plugins/capi-server-side-tracking/capi_api/api.php', { event_name: 'Lead', event_source_url: window.location.href, client_user_agent: navigator.userAgent, event_id: event_id_fn }).done(function( data ) { });});$('a#evenSearch').on('click', function(e){ if( $(e.target).text().toLowerCase().indexOf('ired') >= 0){if (window.location.href.indexOf('/hello-world/'  ) > -1) { var event_id_fn = event_id();$.post( 'http://rest-api.local/wp-content/plugins/capi-server-side-tracking/capi_api/api.php', { event_name: 'Search', event_source_url: window.location.href, client_user_agent: navigator.userAgent, event_id: event_id_fn }).done(function( data ) { }); }}});$('clickAnd').on('click', function(e){ var event_id_fn = event_id();$.post( 'http://rest-api.local/wp-content/plugins/capi-server-side-tracking/capi_api/api.php', { event_name: 'Schedule', event_source_url: window.location.href, client_user_agent: navigator.userAgent, event_id: event_id_fn }).done(function( data ) { });});if (url.searchParams.has('paymentDone')) { var event_id_fn = event_id();$.post( 'http://rest-api.local/wp-content/plugins/capi-server-side-tracking/capi_api/api.php', { event_name: 'InitiateCheckout', event_source_url: window.location.href, client_user_agent: navigator.userAgent, event_id: event_id_fn }).done(function( data ) { }); }$('#cust').on('click', function(e){ var event_id_fn = event_id();$.post( 'http://rest-api.local/wp-content/plugins/capi-server-side-tracking/capi_api/api.php', { event_name: 'myTest', event_source_url: window.location.href, client_user_agent: navigator.userAgent, event_id: event_id_fn }).done(function( data ) { });});});