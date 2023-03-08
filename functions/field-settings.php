<?php
if( function_exists('acf_add_options_page') ) {
    acf_add_options_page(array(
        'page_title'    => 'CAPI Events',
        'menu_title'    => 'CAPI Events',
        'menu_slug'     => 'capi-event-settings',
        'capability'    => 'edit_posts',
        'redirect'      => false,
        'icon_url'      => 'dashicons-facebook',
    ));
    acf_add_options_sub_page(array(
        'page_title'    => 'CAPI Credentials',
        'menu_title'    => 'Credentials',
        'parent_slug'   => 'capi-event-settings',
    ));
}
//require_once('fields.php');