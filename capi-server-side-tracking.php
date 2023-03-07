<?php
/**
* Plugin Name: Server Side Tracking for CAPI
* Plugin URI: https://www.thefirstgroup.com/en
* Description: This plugin helps to impliment server side tracking for Facebook Conversion API (CAPI).
* Version: 1.0.2
* Author: Aboobacker P
* Author URI: https://www.aboobacker.com/
**/

$plugins_path = plugin_dir_path( __FILE__ ); 
$plugins_url = plugins_url() . '/capi-server-side-tracking'; 

// Define path and URL to the ACF plugin.
define( 'MY_ACF_PATH', $plugins_path . '/includes/acf/' );
define( 'MY_ACF_URL', $plugins_url . '/includes/acf/' );

// Include the ACF plugin.
include_once( MY_ACF_PATH . 'acf.php' );

// Customize the url setting to fix incorrect asset URLs.
add_filter('acf/settings/url', 'my_acf_settings_url');
function my_acf_settings_url( $url ) {
    return MY_ACF_URL;
}

// (Optional) Hide the ACF admin menu item.
add_filter('acf/settings/show_admin', '__return_false');

// When including the PRO plugin, hide the ACF Updates menu
add_filter('acf/settings/show_updates', '__return_false', 100);

require_once('functions/field-settings.php');
require_once('functions/actions.php');

// include custom jQuery
function aboo_pixel_include_jquery() {
    global $plugins_url;
	// wp_deregister_script('jquery');
	// wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js', array(), null, false);
    wp_enqueue_script('fbp_js', $plugins_url . '/js/fbp.js', array(), null, true);
    wp_enqueue_script('capi_js', $plugins_url . '/js/capi.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'aboo_pixel_include_jquery');