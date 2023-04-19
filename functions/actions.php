<?php
function generate_capi_scripts() {
	$screen = get_current_screen();
    global $plugins_url, $plugins_path;
	if (strpos($screen->id, "capi-event-settings") == true){
        $capi_scripts = fopen($plugins_path."js/capi.js", "w") or die("Unable to open file!");
        $txt = "jQuery(function($){ url = new URL(window.location.href);";
        $events = get_field('standard_events', 'option');
        if($events) {
            $txt .= "var fbp = abfbp(); var em = abem(); var external_id = abfprintid();";
            foreach($events as $event){
                $ajax_fn = "$.post( '".$plugins_url."/capi_api/api.php', { event_name: '".$event['event_type']."', event_source_url: window.location.href, client_user_agent: navigator.userAgent, event_id: event_id_fn, fbp: fbp, external_id: external_id, em: em }).done(function( data ) { });";
                if(get_field('deduplication_method','option') == 'event_based'){
                    $fbq_tag = "fbq('track', '".$event['event_type']."', {}, {eventID: event_id_fn, fbp: fbp, em: em });";
                }
                else if(get_field('deduplication_method','option') == 'external_id'){
                    $fbq_tag = "fbq('track', '".$event['event_type']."', {}, {fbp: fbp, external_id: external_id, em: em});";
                }
                if($event['fire_event_with'] == 'css_selector') {
                    $txt .= "$('".$event['selector']."').on('click', function(e){ var event_id_fn = event_id();";
					if($event['event_type'] == "Subscribe") { 
                    	$txt .= "if(em == null) { em = SHA256($('#del_newsletter_form input[type=\"email\"]').val().toLowerCase()); }"; 
                	}
                    if($event['click_text']){
                        $txt .= "if( $(e.target).text().toLowerCase().indexOf('".$event['click_text']."') >= 0){";
                    }
                    if(get_field('enable_browser_events', 'option')){
                        $txt .= $fbq_tag;
                    }
                    $txt .= $ajax_fn;
                    if($event['click_text']){
                        $txt .= "}";
                    }
                    $txt .= "});";
                }
                if($event['fire_event_with']== 'page_load') {
                    $txt .= "if (window.location.href.indexOf('".$event['page_url']."'  ) > -1) { var event_id_fn = event_id();";
                        if(get_field('enable_browser_events', 'option')){
                            $txt .= $fbq_tag;
                        }
                        $txt .= $ajax_fn ." }";
                }
                if($event['fire_event_with'] == 'multi_conditions') {
                    $txt .= "$('".$event['selector']."').on('click', function(e){ ";
                    if($event['click_text']){
                        $txt .= "if( $(e.target).text().toLowerCase().indexOf('".$event['click_text']."') >= 0){";
                    }
                    $txt .= "if (window.location.href.indexOf('".$event['page_url']."'  ) > -1) { var event_id_fn = event_id();";
                        if(get_field('enable_browser_events', 'option')){
                            $txt .= $fbq_tag;
                        }
                        $txt .= $ajax_fn . " }";
                    if($event['click_text']){
                        $txt .= "}";
                    }
                    $txt .= "});";
                }
                if($event['fire_event_with'] == 'url_param') { 
                    $txt .= "if (url.searchParams.has('".$event['url_param']."')) { var event_id_fn = event_id();";
                        if(get_field('enable_browser_events', 'option')){
                            $txt .= $fbq_tag;
                        }
                        $txt .= $ajax_fn . " }";
                }
            }
        }

        $custom_events = get_field('custom_events', 'option');
        if($custom_events) {
            $txt .= "var fbp = abfbp(); var em = abem(); var external_id = abfprintid();";
            foreach($custom_events as $custom_event){
                $ajax_fn = "$.post( '".$plugins_url."/capi_api/api.php', { event_name: '".$custom_event['event_type']."', event_source_url: window.location.href, client_user_agent: navigator.userAgent, event_id: event_id_fn, fbp: fbp, external_id: external_id, em: em }).done(function( data ) { });";
                $fbq_tag = '';
                if(get_field('deduplication_method','option') == 'event_based'){
                    $fbq_tag = "fbq('track', '".$custom_event['event_type']."', {}, {eventID: event_id_fn, fbp: fbp, em: em });";
                }
                else if(get_field('deduplication_method','option') == 'external_id'){
                    $fbq_tag = "fbq('track', '".$custom_event['event_type']."', {}, {fbp: fbp, external_id: external_id, em: em });";
                }
                if($custom_event['fire_event_with'] == 'css_selector') {
                    $txt .= "$('".$custom_event['selector']."').on('click', function(e){ var event_id_fn = event_id();";
                    if($custom_event['click_text']){
                        $txt .= "if( $(e.target).text().toLowerCase().indexOf('".$custom_event['click_text']."') >= 0){";
                    }
                    if(get_field('enable_browser_events', 'option')){
                        $txt .= $fbq_tag;
                    }
                    $txt .= $ajax_fn;
                    if($custom_event['click_text']){
                        $txt .= "}";
                    }
                    $txt .= "});";
                }
                if($custom_event['fire_event_with']== 'page_load') {
                    $txt .= "if (window.location.href.indexOf('".$custom_event['page_url']."'  ) > -1) { var event_id_fn = event_id();";
                        if(get_field('enable_browser_events', 'option')){
                            $txt .= $fbq_tag;
                        }
                        $txt .= $ajax_fn ." }";
                }
                if($custom_event['fire_event_with'] == 'multi_conditions') {
                    $txt .= "$('".$custom_event['selector']."').on('click', function(e){ ";
                    if($custom_event['click_text']){
                        $txt .= "if( $(e.target).text().toLowerCase().indexOf('".$custom_event['click_text']."') >= 0){";
                    }
                    $txt .= "if (window.location.href.indexOf('".$custom_event['page_url']."'  ) > -1) { var event_id_fn = event_id();";
                        if(get_field('enable_browser_events', 'option')){
                            $txt .= $fbq_tag;
                        }
                        $txt .= $ajax_fn . " }";
                    if($custom_event['click_text']){
                        $txt .= "}";
                    }
                    $txt .= "});";
                }
                if($custom_event['fire_event_with'] == 'url_param') { 
                    $txt .= "if (url.searchParams.has('".$custom_event['url_param']."')) { var event_id_fn = event_id();";
                        if(get_field('enable_browser_events', 'option')){
                            $txt .= $fbq_tag;
                        }
                        $txt .= $ajax_fn . " }";
                }
            }
        }
        $txt .= "});";
        fwrite($capi_scripts, $txt);
        fclose($capi_scripts);
	}
}
add_action('acf/save_post', 'generate_capi_scripts', 20);