<?php
/*
 * TODO: a basic login set up to fall back on if no oauth solution available
 */

//define('MVPM_EDITION', 'community');




// Enable the user with no privileges to run ajax_login() in AJAX
// add_action("wp_ajax_nopriv_mvpm_user_check", '"mvpmUserCheck');
// function mvpmUserCheck(){
// 	if ( is_user_logged_in() ){
// 		// $user = wp_get_current_user();
// 		// return $user->exists();
// 		echo 'loggedin';
// 		wp_die;
// 	} else {
// 		echo 'loggedout';
// 	}
// }


/*
 * This is main endpoint for our applications sign in logic
 */
function mvpm_user_login(){
	check_ajax_referer( 'mvpm_system', 'security' );
echo 'op';
//    $info = array();
//    $info['user_login'] = 'admin';//$_REQUEST['username'];
//    $info['user_password'] = 'password';//$_REQUEST['password'];
//    $info['remember'] = true;
// // var_dump($info);
//    $user_signon = wp_signon( $info, false );

//    if ( is_wp_error($user_signon) ){
//    		// echo $_REQUEST['username'];
//        echo json_encode(array('loggedin'=>false, 'message'=>__('Wrong username or password.')));
//    } else {
//        echo json_encode(array('loggedin'=>true, 'message'=>__('Login successful, redirecting...')));
//    }

   wp_die();
}

add_action( 'wp_ajax_nopriv_mvpm_user_login', 'mvpm_user_login' );