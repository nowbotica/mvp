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
    check_ajax_referer( 'mvpm_system', 'security' );
    wp_clear_auth_cookie();
    wp_logout();
    ob_clean(); // probably overkill for this, but good habit
    echo json_encode(array('loggedin'=>false, 'message'=>__('Logout successful, redirecting...')));
    wp_die();
}
add_action( 'wp_ajax_mvpm_user_logout', 'mvpm_user_logout' );
add_action( 'wp_ajax_nopriv_mvpm_user_logout', 'mvpm_user_logout' );


function mvpm_user_create(){
    check_ajax_referer( 'mvpm_system', 'security' );
    
    $info = array();
    $info['user_nicename'] = $info['nickname'] = $info['display_name'] = $info['first_name'] = $info['user_login'] = sanitize_user($_REQUEST['username']) ;
    $info['user_pass']  = $info['user_password'] = sanitize_text_field($_REQUEST['password']);
    $info['user_email'] = sanitize_email( $_REQUEST['email']);
      // echo json_encode($info);
      // wp_die();
  
    // Register the user
    $user_register = wp_insert_user( $info );
    if ( is_wp_error($user_register) ){ 

      $error  = $user_register->get_error_codes() ;
      if(in_array('empty_user_login', $error))
        echo json_encode(array('registered'=>false, 'message'=>__($user_register->get_error_message('empty_user_login'))));
      elseif(in_array('existing_user_login',$error))
        echo json_encode(array('registered'=>false, 'message'=>__('This username is already registered.')));
      elseif(in_array('existing_user_email',$error))
          echo json_encode(array('registered'=>false, 'message'=>__('This email address is already registered.')));
    } else {
      
      // echo json_encode(array('registered'=>true, 'message'=>__('New account created.')));

      $user_signon = wp_signon( $info, false );

      if ( is_wp_error($user_signon) ){
           echo json_encode(array('loggedin'=>false, 'message'=>__('Wrong username or password.')));
      } else {
           echo json_encode(array('loggedin'=>true, 'message'=>__('Login successful, redirecting...')));
      }

      // auth_user_login($info['nickname'], $info['user_pass'], 'Registration');       
    }
    wp_die();
}
add_action( 'wp_ajax_mvpm_user_create', 'mvpm_user_create' );
add_action( 'wp_ajax_nopriv_mvpm_user_create', 'mvpm_user_create' );

/*******************/
/* Client Factory */
/*******************/

/**
  * Creates a new user and removes frontend admin panel
  *
  * @return json
  */
// function tzu_add_client(){
//   check_ajax_referer( 'mvpm_system', 'security' );


//   // if( current_user_can('editor') || current_user_can('administrator') ) {
//     global $wpdb;
//     $user_email = $_REQUEST['client_email'];
//     $company_name = $_REQUEST['company_name'];
//     $new_username = preg_replace( '#[ -]+#','-',strtolower( $company_name ) ); 

//     if( null != username_exists( $new_username ) ) {
//       // error check
//       echo 'username already in system';
//       return; // will be 0 if wp-die not called
//     }
//     $email_exists = email_exists( $user_email );
//     if ( $email_exists ) {
//       echo 'That E-mail is registered to user number ' . esc_html( $email_exists );
//       return;
//     } 

//     // $random_password = wp_generate_password( $length=12, $include_standard_special_chars=false );
//     $random_password = wp_generate_password( 8, false );

//     $user_id = wp_create_user( $new_username, $random_password, $user_email );

//     $user = new WP_User( $user_id );
//     $user->set_role( 'contributor' );
//     // Set the nickname
//     wp_update_user(
//       array(
//         'ID'          =>    $user_id,
//         'nickname'    =>    $company_name
//       )
//     );
//     $table = $wpdb->prefix ."usermeta";
//     $query_string = "UPDATE $table SET `show_admin_bar_front` = 'false' WHERE `user_id` = $user_id";
//     $wpdb->query($query_string);

//       // Email the user
//     wp_mail( $user_email, 'Welcome!', 'Your Password: ' . $random_password );
//     // return $user_id;


//     // programmatically create some basic pages, and then set Home and Blog
//     // // create the blog page
//     // if (isset($_GET['activated']) && is_admin()){
//       // setup a function to check if these pages exist
//     function the_slug_exists($post_name) {
//       global $wpdb;
//       if($wpdb->get_row("SELECT post_name FROM wp_posts WHERE post_name = '" . $post_name . "'", 'ARRAY_A')) {
//         return true;
//       } else {
//         return false;
//       }
//     }

//     $client_page_check = get_page_by_title($new_username);
    
//     $client_page = array(
//       'post_type'    => 'page',
//       'post_title'   => $company_name,
//       'post_content' => $user_email,
//       'post_status'  => 'publish',
//       'post_author'  => 1,
//       'post_slug'    => $new_username
//     );
//     if(!isset($client_page_check->ID) && !the_slug_exists($new_username)){
//       $client_page_id = wp_insert_post($client_page);



//       if ( $post = get_page_by_path( 'client', OBJECT, 'page' ) ){
//           $id = $post->ID;
//       }
//       else{
//           $parent_page_id = 0;
//       }

//       wp_update_post(
//         array(
//             'ID' => $client_page_id, 
//             'post_parent'  => $parent_page_id
//         )
//       );


//     }

//     wp_die();


//   // }
//   // } else {
//     // return; // doesn't really have to do anything on frontend
//   // }
//  wp_die();
// }
// add_action('wp_ajax_tzu_add_client', 'tzu_add_client');

