<?php
/*
 * TODO: a basic login set up to fall back on if no oauth solution available
 */

//define('MVPM_EDITION', 'community');

// Enable the user with no privileges to run ajax_login() in AJAX
add_action("wp_ajax_nopriv_mvpm_user_check", 'mvpm_user_check');
add_action("wp_ajax_mvpm_user_check", 'mvpm_user_check');
function mvpm_user_check(){
	check_ajax_referer( 'mvpm_system', 'security' );
	if ( is_user_logged_in() ){
		// $user = wp_get_current_user();
		// return $user->exists();
		echo 'loggedin';
		wp_die;
	} else {
		echo 'loggedout';
	}
	wp_die();
}


/*
 * This is main endpoint for our applications sign in logic
 */
function mvpm_user_login(){
	check_ajax_referer( 'mvpm_system', 'security' );
   $info = array();
   $info['user_login'] = $_REQUEST['username'];
   $info['user_password'] = $_REQUEST['password'];
   $info['remember'] = true;
   $user_signon = wp_signon( $info, false );

   if ( is_wp_error($user_signon) ){
       echo json_encode(array('loggedin'=>false, 'message'=>__('Wrong username or password.')));
   } else {
       echo json_encode(array('loggedin'=>true, 'message'=>__('Login successful, redirecting...')));
   }

   wp_die();
}
add_action( 'wp_ajax_mvpm_user_login', 'mvpm_user_login' );
add_action( 'wp_ajax_nopriv_mvpm_user_login', 'mvpm_user_login' );

function mvpm_user_logout(){
    check_ajax_referer( 'mvpm', 'security' );
    wp_clear_auth_cookie();
    wp_logout();
    ob_clean(); // probably overkill for this, but good habit
    echo 'loggedout';
    wp_die();
}
add_action( 'wp_ajax_mvpm_user_logout', 'mvpm_user_logout' );
add_action( 'wp_ajax_nopriv_mvpm_user_logout', 'mvpm_user_logout' );
