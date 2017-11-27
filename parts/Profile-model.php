<?php

/*******************/
/* Profile Factory */
/*******************/

/**
  * Retrieves the current user profile and strips out unsecure data.
  *
  * @return json
  */
function mvpm_get_profile(){
  check_ajax_referer( 'mvpm_system', 'security' );
  global $wpdb;

  $user_id    = get_current_user_id();

  $unsafedata = get_userdata( $user_id );
   
  $userdata = array(
    'id'          => $unsafedata->data->ID,
    'user_login'  => $unsafedata->data->user_login,
    'nicename'    => $unsafedata->data->user_nicename,
    'email'       => $unsafedata->data->user_email,
    'homepage'    => $unsafedata->data->user_url,
    'since'       => $unsafedata->data->user_registered,
    'display_name'=> $unsafedata->data->display_name,
    'roles'       => json_encode($unsafedata->roles),
    'name'        => get_the_author_meta('engineer_name', $user_id),
    'registration'=> get_the_author_meta('engineer_registration', $user_id),
    'jobtitle'    => get_the_author_meta('engineer_jobtitle', $user_id),
    'image'       => get_the_author_meta('engineer_image', $user_id),
    'signature'   => get_the_author_meta('engineer_signature', $user_id)
  );

  echo json_encode($userdata);

  wp_die();
}
add_action('wp_ajax_mvpm_get_profile', 'mvpm_get_profile');

/**
  * Updates the user settings stored in user meta
  *
  * @param changes A json object of updated form data
  *
  * @return json
  */
function mvpm_update_profile(){
  check_ajax_referer( 'mvpm_system', 'security' );
  $user_id    = get_current_user_id();
  
  $data = $_REQUEST['changes'];
  
  $data = json_decode(stripslashes($data));
  // var_dump($data->signature);die;
  
  // $new_value = 'some new value';
  update_user_meta( $user_id, 'engineer_name', $data->name);
  update_user_meta( $user_id, 'engineer_registration', $data->registration);
  update_user_meta( $user_id, 'engineer_jobtitle', $data->jobtitle);
  update_user_meta( $user_id, 'engineer_signature', $data->signature);
 
  echo 'worked';

  wp_die();
}
add_action('wp_ajax_tzu_update_profile', 'mvpm_update_profile');


/**
  * Retrieves the current user profile and strips out unsecure data.
  *
  * @return json
  */
function mvpm_get_profile_public(){
  check_ajax_referer( 'mvpm_system', 'security' );
  global $wpdb;

  $user_id    = get_current_user_id();

  $unsafedata = get_userdata( $user_id );
   
  $userdata = array(
    'id'          => $unsafedata->data->ID,
    // 'user_login'  => $unsafedata->data->user_login,
    'nicename'    => $unsafedata->data->user_nicename,
    'public_social' => ['one','two','three']
    // 'email'       => $unsafedata->data->user_email,
    // 'homepage'    => $unsafedata->data->user_url,
    // 'since'       => $unsafedata->data->user_registered,
    // 'display_name'=> $unsafedata->data->display_name,
    // 'roles'       => json_encode($unsafedata->roles),
    // 'name'        => get_the_author_meta('engineer_name', $user_id),
    // 'registration'=> get_the_author_meta('engineer_registration', $user_id),
    // 'jobtitle'    => get_the_author_meta('engineer_jobtitle', $user_id),
    // 'image'       => get_the_author_meta('engineer_image', $user_id),
    // 'signature'   => get_the_author_meta('engineer_signature', $user_id)
  );

  echo json_encode($userdata);

  wp_die();
}
add_action('wp_ajax_mvpm_get_profile_public', 'mvpm_get_profile_public');
