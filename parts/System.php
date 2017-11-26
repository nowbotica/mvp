<?php

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
function mvpm_upload_file(){
  check_ajax_referer( 'mvpm_system', 'security' );
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
add_action('wp_ajax_mvpm_upload_file', 'mvpm_upload_file');


// /*
//   * Creates an email from the form data.
//   *
//   * Retrieves from data from table and applies this to relevent template before passing 
//   * completed html structure to dompdf. Saves completed form in table. Probs should be a class
//   *
//   * @param string $uid The unique reference to the form in the tzu_system table.
//   * @param bool $pdfonly Does the email contain html report plus pdf or attached pdf only.
//  */ 
// function tzu_send_email(){
//   global $wpdb;

//   $uid = $_REQUEST['uid'];
  
//   $mailto = ( isset($_REQUEST["mailto"]) ? $_REQUEST["mailto"] : "info@ecowelle.com" );
//   // $name    = ( isset($_REQUEST["name"])   ? $_REQUEST["name"]   : "usedefault" );
//   // $message = ( isset($_REQUEST["mailto"]) ? $_REQUEST["mailto"] : "usedefault" );
  
//   // echo $mailto; echo $name; echo $message; die;

//   // Get the actual data
//   $query = "SELECT * FROM ". $wpdb->prefix . "tzu_system WHERE id = '".$uid."'"; 
//   $results = $wpdb->get_results( $query );
//   $go = [];
//   $go['form_type'] = $results[0]->form_type;
//   $go['job_ref']   = $results[0]->job_ref;
//   $go['created']   = $results[0]->created;
//   $go['modified']  = $results[0]->modified;
//   $go['owner']     = $results[0]->owner;
//   $go['business']  = json_decode($results[0]->business);
//   $go['engineer']  = json_decode($results[0]->engineer);
//   $go['formData']  = json_decode($results[0]->form_data);
//   $go['client']    = json_decode($results[0]->client);
//   $go['site']      = json_decode($results[0]->site);
//   $go['pdf']       = $results[0]->pdf;
//   $go['signature'] = $results[0]->signature;

//   // $pdf_only = $_REQUEST['pdf_only'];
//   // $customer = $_REQUEST['customer'];
//   // $email    = $_REQUEST['email'];
//   // $message  = $_REQUEST['message'];

//   // $title = $customer.'--'.$email;
  
//   // $my_post = array(
//   //   'post_title'  => $title,   
//   //   'post_type'   => 'contact_form_item',
//   //   'post_status' => 'publish'
//   // );

//   // // insert the post into the database
//   // $post_id = wp_insert_post( $my_post );

//   // foreach ($values['acf'] as $key => $value) {
//   //   # code...
//   //   update_field( $key, $value, $post_id );

//   // }
    
//   // $go = file_get_contents(plugin_dir_url('snwb_emails').'snwb-emails/html-email-build/dist/transactional-website-welcome.html');
//   // $user_msg = file_get_contents(get_stylesheet_directory().'/emails/dist/basic.html');

//   // $user_msg = file_get_contents(TZUSYSTEM.'includes/emails/basic.html');
  
//   // $user_msg = str_replace("[!customername!]", 'Hi, '.$customer, $user_msg);
//   // $user_msg = str_replace("[!messagelead!]", "Thanks for getting in touch", $user_msg);
//   // $user_msg = str_replace("[!message!]", "We aim to respond to all emergancy calls within two hours and all other enquiries no later than the following working day", $user_msg);

//   // $to      = $email;
//   // $subject = 'new message from: '.$email;
//   // $body    = $user_msg;
//   // $headers = array('Content-Type: text/html; charset=UTF-8');
//   // $headers[] = 'From: '.'Ecowelle Mail System'.'<'.'mailsystem@ecowelle.com'.'>';
//   // wp_mail( $to, $subject, $body, $headers );

//   $office_msg = file_get_contents( TZUSYSTEM .'includes/emails/basic.html');
//   // echo $office_msg;
//   // echo 'uiuiui';$office_msg; die;
//   // $office_msg = str_replace("[!customername!]", $customer.' just got in touch', $office_msg);
//   // $office_msg = str_replace("[!customername!]", $customer.' just got in touch', $office_msg);
//   $messagelead = $go['job_ref'].'_'.$go['created'].'_'.$go['form_type'].'_'.$uid.'.pdf';
//   $office_msg = str_replace("[!messagelead!]", "Pre Deployment Test: <br/>".$messagelead, $office_msg);
//   // $office_msg = str_replace("[!messagelead!]", "Their email is: ".$email, $office_msg);
//   $message = '<a href="https://youtu.be/RvWuUX5hwAQ?t=1456">People are still persuing the possesion of things</a>';
//   $office_msg = str_replace("[!message!]", "And they said: ".$message, $office_msg);
//   // $to   = 'info@ecowelle.com, zac@ecowelle.com';
  
//   // get the file name of saved pdf
//   // $file_name = get_attached_file( $go['pdf'] );

//   $to      = $mailto;
//   // $subject = 'customer enquiry from: '.'$email';
//   $subject = 'Please confirm receipt via email to office@nowbotica.com: '.'$email';
//   $body    = $office_msg;
//   $headers = array('Content-Type: text/html; charset=UTF-8');
//   $test_attachment      = TZUSYSTEM .'includes/emails/test-attachment.txt';
//   $terms_and_conditions = TZUSYSTEM .'includes/emails/terms-and-conditions.txt';
//   $generated_pdf        = get_attached_file( $go['pdf'] ); 
//   $attachments = array($test_attachment, $terms_and_conditions, $generated_pdf);

//   // $headers[] = 'From: '.'Ecowelle Mail System'.'<'.'mailsystem@ecowelle.com'.'>';

//   // wp_mail('test@test.com', 'subject', 'message', $headers, $attachments);
//   $success = wp_mail( $to, $subject, $body, $headers, $attachments);
//   // $success = wp_mail( $to, $subject, $body, $headers);

//   echo $success;
//   wp_die();
//    // $headers = 'From: My Name <myname@mydomain.com>' . "\r\n";
// }
// add_action('wp_ajax_tzu_send_email', 'tzu_send_email'); // tzu_send_email();

