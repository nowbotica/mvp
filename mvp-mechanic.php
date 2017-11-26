<?php
/*
Plugin Name: MVP Mechanic
Plugin URI: http://nowbotica.com/lets-tzu-this/
Description: A rust proof diy starter kit for miro enterprises
Author: Andrew MacKay
Version: 1.2.3
Author URI: http://nowbotica.com/
*/

define( 'MVPMSYSTEM', plugin_dir_path( __FILE__ ) );
define( 'MVPMSYSTEM_URL', plugin_dir_url( __FILE__ ) );

# Includes the user mangement module
include( MVPMSYSTEM . '/parts/User.php');

# Includes the Listing module
include( MVPMSYSTEM . '/parts/Listing.php');
include( MVPMSYSTEM . '/parts/Listing-model.php');


/**
 * Ensures template file is available in dashboard
 *
 */


/**
  * Creates shortcode to display main application
  *
  */
function mvpmApp(  ) {
  ?>

      <ui-view autoscroll="false" ng-if='!isRouteLoading'></ui-view>

  <?php
}
add_shortcode('mvpmApp', 'mvpmApp');

/**
 * Includes js when shortcode called - kinda slow
 *
 */
//function mvmpApp_head(){
//    global $posts;
//    $pattern = get_shortcode_regex();
//    preg_match('/'.$pattern.'/s', $posts[0]->post_content, $matches);
//    if (is_array($matches) && $matches[2] == 'mvmpApp') {
        //shortcode is being used
        add_action('wp_enqueue_scripts','mvmpApp_css');
        add_action('wp_enqueue_scripts','mvmpApp_scripts');
//    }
//}
//add_action('template_redirect','mvmpApp_head');


/*-------------------------------------------------------------------------------
  Frontend dependencies Javascript and CSS to be included by [mvpmApp] shortcode
-------------------------------------------------------------------------------*/

if ( ! function_exists( 'mvmpApp_css' ) ) {
    /*
     *  loads the applications css dependancies and theme css files
     */
    function mvmpApp_css() {

        // font-awesome.min.css: icon library
        wp_enqueue_style( 'font-awesome', MVPMSYSTEM_URL . '/application/dependencies/components-font-awesome/css/font-awesome.css', false, '4.7.0', 'all');

        // bootstrap.css:  Mobile First Grid
        // wp_enqueue_style( 'bootswatch', MVPMSYSTEM_URL . '/application/dependencies/bootswatch/united/bootstrap.css', false, '3.3.7', 'all');

        // MVP Mechanic Application dependencies
        wp_enqueue_style( 'mvmpApp_system', MVPMSYSTEM_URL . '/application/mvpm-system.css', false, '1.0.0', 'all');

        // MVP Mechanic Application files
        // wp_enqueue_style( 'mvmpApp_build',  MVPMSYSTEM_URL . '/application/build/build.css', false, '1.0.0', 'all');

    }

}

if ( ! function_exists( 'mvmpApp_scripts' ) ) {
    /*
     *  loads the applications js dependancies and application files
     */
    function mvmpApp_scripts() {

        // '_'
        wp_enqueue_script( 'underscore-js', MVPMSYSTEM_URL .  'application/dependencies/underscore/underscore.js', array(), '', true);

        // 'angular'
        wp_enqueue_script( 'angular', MVPMSYSTEM_URL .  'application/dependencies/angular/angular.js', array(
            'jquery', 'underscore-js'
        ), '', true);

        // 'ui-router'
        wp_enqueue_script( 'angular-ui', MVPMSYSTEM_URL .  'application/dependencies/angular-ui-router/release/angular-ui-router.js', array(
            'angular'
        ), '', true);

        // 'ngAnimate'
        wp_enqueue_script( 'ng-animate', MVPMSYSTEM_URL .  'application/dependencies/angular-animate/angular-animate.js', array(
            'angular'
        ), '', true);

        // MVP Mechanic System files
        wp_enqueue_script( 'mvpm-system', MVPMSYSTEM_URL .  'application/mvpm-system.js', array(
            'jquery',
            'underscore-js',
            'angular',
            'angular-ui',
            'ng-animate'
        ), '', true);

        // API Token set up
        wp_localize_script( 'mvpm-system', 'mvpm_api_object', array(
            'ajax_nonce'      => wp_create_nonce('mvpm_system'),
            'ajax_url'        => admin_url( 'admin-ajax.php' ) ,
            'url_domain_path' => get_site_url(),
            'partials_path'   => MVPMSYSTEM_URL .  '/application/templates' ,
            'image_path'      => MVPMSYSTEM_URL .  '/application/build/images/'
        ), '', true);

        // MVP Mechanic Base Application
        wp_enqueue_script('mvpm-controllers', MVPMSYSTEM_URL . 'application/system/controllers.js', array(
           'mvpm-system'
        ), '', true);
        wp_enqueue_script('mvpm-directives', MVPMSYSTEM_URL . 'application/system/directives.js', array(
           'mvpm-system'
        ), '', true);
        wp_enqueue_script('mvpm-factories', MVPMSYSTEM_URL . 'application/system/factories.js', array(
           'mvpm-system'
        ), '', true);
        wp_enqueue_script('mvpm-services', MVPMSYSTEM_URL . 'application/system/services.js', array(
           'mvpm-system'
        ), '', true);

        // MVP Mechanic User Module
        wp_enqueue_script( 'mvpm-user-module', MVPMSYSTEM_URL . '/application/system/User.js', array(
            'mvpm-system'
        ), '', true);

        wp_localize_script( 'mvpm-system', 'mvpm_user_object', array(
            'mvpm_redirecturl' => home_url(),
            'mvpm_passwordreseturl' => 'resetp',
            'mvpm_registerurl' => 'register',
            'mvpm_loginloadingmessage' => __('Sending user info, please wait...')
        ));

        // MVP Mechanic Listing Module
        wp_enqueue_script( 'mvpm-listing-module', MVPMSYSTEM_URL . '/application/system/Listing.js', array(
            'mvpm-system'
        ), '', true);
    }
}



/*******************/
/* Client Factory */
/*******************/

/**
  * Creates a new user and removes frontend admin panel
  *
  * @return json
  */
function tzu_add_client(){
  check_ajax_referer( 'mvpm_system', 'security' );


  // if( current_user_can('editor') || current_user_can('administrator') ) {
    global $wpdb;
    $user_email = $_REQUEST['client_email'];
    $company_name = $_REQUEST['company_name'];
    $new_username = preg_replace( '#[ -]+#','-',strtolower( $company_name ) ); 

    if( null != username_exists( $new_username ) ) {
      // error check
      echo 'username already in system';
      return; // will be 0 if wp-die not called
    }
    $email_exists = email_exists( $user_email );
    if ( $email_exists ) {
      echo 'That E-mail is registered to user number ' . esc_html( $email_exists );
      return;
    } 

    // $random_password = wp_generate_password( $length=12, $include_standard_special_chars=false );
    $random_password = wp_generate_password( 8, false );

    $user_id = wp_create_user( $new_username, $random_password, $user_email );

    $user = new WP_User( $user_id );
    $user->set_role( 'contributor' );
    // Set the nickname
    wp_update_user(
      array(
        'ID'          =>    $user_id,
        'nickname'    =>    $company_name
      )
    );
    $table = $wpdb->prefix ."usermeta";
    $query_string = "UPDATE $table SET `show_admin_bar_front` = 'false' WHERE `user_id` = $user_id";
    $wpdb->query($query_string);

      // Email the user
    wp_mail( $user_email, 'Welcome!', 'Your Password: ' . $random_password );
    // return $user_id;


    // programmatically create some basic pages, and then set Home and Blog
    // // create the blog page
    // if (isset($_GET['activated']) && is_admin()){
      // setup a function to check if these pages exist
    function the_slug_exists($post_name) {
      global $wpdb;
      if($wpdb->get_row("SELECT post_name FROM wp_posts WHERE post_name = '" . $post_name . "'", 'ARRAY_A')) {
        return true;
      } else {
        return false;
      }
    }

    $client_page_check = get_page_by_title($new_username);
    
    $client_page = array(
      'post_type'    => 'page',
      'post_title'   => $company_name,
      'post_content' => $user_email,
      'post_status'  => 'publish',
      'post_author'  => 1,
      'post_slug'    => $new_username
    );
    if(!isset($client_page_check->ID) && !the_slug_exists($new_username)){
      $client_page_id = wp_insert_post($client_page);



      if ( $post = get_page_by_path( 'client', OBJECT, 'page' ) ){
          $id = $post->ID;
      }
      else{
          $parent_page_id = 0;
      }

      wp_update_post(
        array(
            'ID' => $client_page_id, 
            'post_parent'  => $parent_page_id
        )
      );


    }

    wp_die();


  // }
  // } else {
    // return; // doesn't really have to do anything on frontend
  // }
 wp_die();
}
add_action('wp_ajax_tzu_add_client', 'tzu_add_client');


/******************/
/* Action Factory */
/******************/


/**
  * Uploads file to wordpress media library.
  *
  * Takes uploaded file from POST and stores using the wordpress api.
  *
  * @return json Object with attachemnt id and image url
  */
function tzu_upload_file(){
  check_ajax_referer( 'tzu_system', 'security' );
  // && current_user_can( 'edit_post', $_POST['post_id']

  require_once( ABSPATH . 'wp-admin/includes/image.php' );
  require_once( ABSPATH . 'wp-admin/includes/file.php' );
  require_once( ABSPATH . 'wp-admin/includes/media.php' );
 

  // $file = $_REQUEST['entity'];

    // var_dump($_FILES['file']);

  // Undefined | Multiple Files | $_FILES Corruption Attack
  // If this request falls under any of them, treat it invalid.
  if (
      !isset($_FILES['file']['error']) ||
      is_array($_FILES['file']['error'])
  ) {
      throw new RuntimeException('Invalid parameters.');
  }

  // Check $_FILES['upfile']['error'] value.
  switch ($_FILES['file']['error']) {
      case UPLOAD_ERR_OK:
          break;
      case UPLOAD_ERR_NO_FILE:
          throw new RuntimeException('No file sent.');
      case UPLOAD_ERR_INI_SIZE:
      case UPLOAD_ERR_FORM_SIZE:
          throw new RuntimeException('Exceeded filesize limit.');
      default:
          throw new RuntimeException('Unknown errors.');
  }

   // You should also check filesize here. 
  if (filesize($pdf_final) > 1000000) {
      throw new RuntimeException('Exceeded filesize limit.');
  }

  $attachment_id = media_handle_upload( 'file', 0 );
  
  if ( is_wp_error( $attachment_id ) ) {
    
    // There was an error uploading the image.
    echo '$attachement_id error';

  } else {
    
    // The image was uploaded successfully!
    $returnObj = [];
    $returnObj['file_id']  = $attachment_id;
    $returnObj['file_url'] = wp_get_attachment_url( $attachment_id );
    echo json_encode($returnObj);
  
  }

  wp_die();
}
add_action('wp_ajax_tzu_upload_file', 'tzu_upload_file');


/*
  * Creates an email from the form data.
  *
  * Retrieves from data from table and applies this to relevent template before passing 
  * completed html structure to dompdf. Saves completed form in table. Probs should be a class
  *
  * @param string $uid The unique reference to the form in the tzu_system table.
  * @param bool $pdfonly Does the email contain html report plus pdf or attached pdf only.
 */ 
function tzu_send_email(){
  global $wpdb;

  $uid = $_REQUEST['uid'];
  
  $mailto = ( isset($_REQUEST["mailto"]) ? $_REQUEST["mailto"] : "info@ecowelle.com" );
  // $name    = ( isset($_REQUEST["name"])   ? $_REQUEST["name"]   : "usedefault" );
  // $message = ( isset($_REQUEST["mailto"]) ? $_REQUEST["mailto"] : "usedefault" );
  
  // echo $mailto; echo $name; echo $message; die;

  // Get the actual data
  $query = "SELECT * FROM ". $wpdb->prefix . "tzu_system WHERE id = '".$uid."'"; 
  $results = $wpdb->get_results( $query );
  $go = [];
  $go['form_type'] = $results[0]->form_type;
  $go['job_ref']   = $results[0]->job_ref;
  $go['created']   = $results[0]->created;
  $go['modified']  = $results[0]->modified;
  $go['owner']     = $results[0]->owner;
  $go['business']  = json_decode($results[0]->business);
  $go['engineer']  = json_decode($results[0]->engineer);
  $go['formData']  = json_decode($results[0]->form_data);
  $go['client']    = json_decode($results[0]->client);
  $go['site']      = json_decode($results[0]->site);
  $go['pdf']       = $results[0]->pdf;
  $go['signature'] = $results[0]->signature;

  // $pdf_only = $_REQUEST['pdf_only'];
  // $customer = $_REQUEST['customer'];
  // $email    = $_REQUEST['email'];
  // $message  = $_REQUEST['message'];

  // $title = $customer.'--'.$email;
  
  // $my_post = array(
  //   'post_title'  => $title,   
  //   'post_type'   => 'contact_form_item',
  //   'post_status' => 'publish'
  // );

  // // insert the post into the database
  // $post_id = wp_insert_post( $my_post );

  // foreach ($values['acf'] as $key => $value) {
  //   # code...
  //   update_field( $key, $value, $post_id );

  // }
    
  // $go = file_get_contents(plugin_dir_url('snwb_emails').'snwb-emails/html-email-build/dist/transactional-website-welcome.html');
  // $user_msg = file_get_contents(get_stylesheet_directory().'/emails/dist/basic.html');

  // $user_msg = file_get_contents(TZUSYSTEM.'includes/emails/basic.html');
  
  // $user_msg = str_replace("[!customername!]", 'Hi, '.$customer, $user_msg);
  // $user_msg = str_replace("[!messagelead!]", "Thanks for getting in touch", $user_msg);
  // $user_msg = str_replace("[!message!]", "We aim to respond to all emergancy calls within two hours and all other enquiries no later than the following working day", $user_msg);

  // $to      = $email;
  // $subject = 'new message from: '.$email;
  // $body    = $user_msg;
  // $headers = array('Content-Type: text/html; charset=UTF-8');
  // $headers[] = 'From: '.'Ecowelle Mail System'.'<'.'mailsystem@ecowelle.com'.'>';
  // wp_mail( $to, $subject, $body, $headers );

  $office_msg = file_get_contents( TZUSYSTEM .'includes/emails/basic.html');
  // echo $office_msg;
  // echo 'uiuiui';$office_msg; die;
  // $office_msg = str_replace("[!customername!]", $customer.' just got in touch', $office_msg);
  // $office_msg = str_replace("[!customername!]", $customer.' just got in touch', $office_msg);
  $messagelead = $go['job_ref'].'_'.$go['created'].'_'.$go['form_type'].'_'.$uid.'.pdf';
  $office_msg = str_replace("[!messagelead!]", "Pre Deployment Test: <br/>".$messagelead, $office_msg);
  // $office_msg = str_replace("[!messagelead!]", "Their email is: ".$email, $office_msg);
  $message = '<a href="https://youtu.be/RvWuUX5hwAQ?t=1456">People are still persuing the possesion of things</a>';
  $office_msg = str_replace("[!message!]", "And they said: ".$message, $office_msg);
  // $to   = 'info@ecowelle.com, zac@ecowelle.com';
  
  // get the file name of saved pdf
  // $file_name = get_attached_file( $go['pdf'] );

  $to      = $mailto;
  // $subject = 'customer enquiry from: '.'$email';
  $subject = 'Please confirm receipt via email to office@nowbotica.com: '.'$email';
  $body    = $office_msg;
  $headers = array('Content-Type: text/html; charset=UTF-8');
  $test_attachment      = TZUSYSTEM .'includes/emails/test-attachment.txt';
  $terms_and_conditions = TZUSYSTEM .'includes/emails/terms-and-conditions.txt';
  $generated_pdf        = get_attached_file( $go['pdf'] ); 
  $attachments = array($test_attachment, $terms_and_conditions, $generated_pdf);

  // $headers[] = 'From: '.'Ecowelle Mail System'.'<'.'mailsystem@ecowelle.com'.'>';

  // wp_mail('test@test.com', 'subject', 'message', $headers, $attachments);
  $success = wp_mail( $to, $subject, $body, $headers, $attachments);
  // $success = wp_mail( $to, $subject, $body, $headers);

  echo $success;
  wp_die();
   // $headers = 'From: My Name <myname@mydomain.com>' . "\r\n";
}
add_action('wp_ajax_tzu_send_email', 'tzu_send_email'); // tzu_send_email();

