<?php
/*
 * TODO: a basic login set up to fall back on if no oauth solution available
 */
//define('MVPM_EDITION', 'community');

// Enable the user with no privileges to run ajax_login() in AJAX
//
//function example_function()
//{
//    if ( is_user_logged_in() )
//    {
//        $user = wp_get_current_user();
//        return $user->exists();
//    }
//
//    // Execute the action only if the user isn't logged in
//    if (!is_user_logged_in()) {
//
//    }
//    add_action('init', 'mvpm_ajax_login_init');
//}
//add_action('init', 'example_function');



/*
 * This is main endpoint for our applications sign in logic
 */
//add_action( 'wp_ajax_nopriv_mvpm_ajax_login', 'mvpm_ajax_login' );
//function mvpm_ajax_login(){
//
//    // First check the nonce, if it fails the function will break
//    check_ajax_referer( 'ajax-login-nonce', 'security' );
//
//    // Nonce is checked, get the POST data and sign user on
//    $info = array();
//    $info['user_login'] = $_POST['username'];
//    $info['user_password'] = $_POST['password'];
//    $info['remember'] = true;
//
//    $user_signon = wp_signon( $info, false );
//    if ( is_wp_error($user_signon) ){
//        echo json_encode(array('loggedin'=>false, 'message'=>__('Wrong username or password.')));
//    } else {
//        echo json_encode(array('loggedin'=>true, 'message'=>__('Login successful, redirecting...')));
//    }
//
//    die();
//}