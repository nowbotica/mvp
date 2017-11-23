<?php
/**
  * An API for the Listings.php class | works best with javascript
  *
  * The endpoint for our angular frontend implemented using the wp-admin api
  *
  * Fetches the listings from the database matching them against the passed parameters. 
  * Parses them into an array containing the required data for each matched item in the table.
  */


/**
  * Returns the entire set of data for the Listing model
  *	// $data = array(1, 1., NULL, new stdClass, 'foo');
  *
  * mvpm_GetListing()
  *
  * @param string $form_type References the data contained in the form_type column of the mvpm_system database table.
  * @param string $owner References the owner column by numerical id indentifying user.
  *
  * @return json 
  */

// function mvpm_GetListing(){
function mvpm_get_listing(){  
  
  global $wpdb;
	$_helper = new ListingLibrary;
  
  check_ajax_referer( 'mvpm_system', 'security' );
  
  // ternary = statment ? 'return if true' : 'return if false';
  $by = !empty($_REQUEST['by']) ? $_REQUEST['by'] : NULL ;

	$listingObject = new stdClass;

  // probs not the most efficient or understandable way to do this tbh
	switch (gettype($by)) {

		case "string":

			echo json_encode('{"error_code": "incorrecttype", "debug_message": "string not supported"}');

      break;
    
    case "array":

      echo json_encode('{"error_code": "incorrecttype", "debug_message": "array not supported"}');

      break;

    case "boolean": 

      echo json_encode('{"error_code": "incorrecttype", "debug_message": "boolean not supported"}');

      break;

    case "integer": # Returns an individual Listing post
      
      // $args = array(
      //     'p' => $by,
      //     'post_type' => 'listing',
      // );

      // $listingObject = new WP_Query( $args );           

      // echo $_helper->buildSJON($listingObject);           

      break;

    case "double":

      echo json_encode('{"error_code": "incorrecttype", "debug_message": "float not supported"}');          

      break;

    case "object":

      echo json_encode('{"error_code": "incorrecttype", "debug_message": "object not supported"}');

      break;

    case "NULL": # Returns all the listing posts

      // https://wordpress.stackexchange.com/questions/38530/most-efficient-way-to-get-posts-with-postmeta
      $wpdb->query('SET SESSION group_concat_max_len = 10000'); // necessary to get more than 1024 characters in the GROUP_CONCAT columns below
      $query = "
          SELECT p.*, 
          GROUP_CONCAT(pm.meta_key ORDER BY pm.meta_key DESC SEPARATOR '||') as meta_keys, 
          GROUP_CONCAT(pm.meta_value ORDER BY pm.meta_key DESC SEPARATOR '||') as meta_values 
          FROM $wpdb->posts p 
          LEFT JOIN $wpdb->postmeta pm on pm.post_id = p.ID 
          WHERE p.post_type = 'listing' and p.post_status = 'publish' 
          GROUP BY p.ID
      ";

      $listings = $wpdb->get_results($query);

      function knead($a){
          // our database returns a serialised string in $a->meta_keys
          // We can build an array from this
          $metaKeys = explode('||',$a->meta_keys);
          // similary we can also create a matching array from the meta_values
          // $metaValues = explode('||',$a->meta_values);
          // some of our meta values may be serialized, we want them unserialized in our return object
          // $metaValues = array_map('maybe_unserialize',$metaValues);
          // we can create a combination from this two so that $metaKeys[0] becomes a key containing value $metaValues[0] etc
          // $combinationArray = array_combine($metaKeys,$metaValues); 
          // $a->meta = $combinationArray;
          $a->meta = array_combine(explode('||',$a->meta_keys),array_map('maybe_unserialize',explode('||',$a->meta_values)));
          unset($a->meta_keys);
          unset($a->meta_values);
          return $a;
      }


      $listings = array_map('knead',$listings);
      echo $_helper->buildJSON($listings);

      break;
    
    default:

      echo json_encode('{"error_code": "eh", "debug_message": "switch statement failed to match value"}');

      break;
  }
  wp_die();

}
// add_action('wp_ajax_mvpm_GetListing', 'mvpm_GetListing');
add_action('wp_ajax_mvpm_get_listing', 'mvpm_get_listing');


class ListingLibrary {
  /*
  * Filters the returned data and converts to json
  */ 
  public function buildJSON($listingdata){

    $listingdata = array_map('self::buildSafeData', $listingdata);
    return json_encode($listingdata);
  }
  private static function buildSafeData($listing){

    $listing = array(
        'post_id' => $listing->ID,
        'full_url' => $listing->guid,
        'meta' => $listing->meta,
        'author_id' => $listing->post_author,
        'description' => $listing->post_content,
        'short_description' => $listing->post_excerpt,
        'last_updated' => $listing->post_modified_gmt,
        'slug' => $listing->post_name,
        'name' => $listing->post_title,
    );
    return $listing;
  }
}

// /**
//   *
//   *
//   * mvpm_GetListingByTaxonomy()
//   *
//   * @param string $form_type References the data contained in the form_type column of the mvpm_system database table.
//   * @param string $owner References the owner column by numerical id indentifying user.
//   *
//   * @return json 
//   */
// function mvpm_GetListingByTaxonomy(){

// }
// // add_action('wp_ajax_mvpm_GetListingByTaxonomy', 'mvpm_GetListingByTaxonomy');

// /**
//   * Returns the listings owned by a certain user
//   *
//   * mvpm_GetListingByUser()
//   *
//   * @param string $form_type References the data contained in the form_type column of the mvpm_system database table.
//   * @param string $owner References the owner column by numerical id indentifying user.
//   *
//   * @return json 
//   */
// function mvpm_GetListingByUser(){
//   check_ajax_referer( 'tzu_system', 'security' );
//   global $wpdb;
//   $user_id    = get_current_user_id();
//   *

//   $unsafedata = get_userdata( $user_id );
   
//   $userdata = array(
//     'id'          => $unsafedata->data->ID,
//     'user_login'  => $unsafedata->data->user_login,
//     'nicename'    => $unsafedata->data->user_nicename,
//     'email'       => $unsafedata->data->user_email,
//     'homepage'    => $unsafedata->data->user_url,
//     'since'       => $unsafedata->data->user_registered,
//     'display_name'=> $unsafedata->data->display_name,
//     'roles'       => json_encode($unsafedata->roles),
//     'name'        => get_the_author_meta('engineer_name', $user_id),
//     'registration'=> get_the_author_meta('engineer_registration', $user_id),
//     'jobtitle'    => get_the_author_meta('engineer_jobtitle', $user_id),
//     'image'       => get_the_author_meta('engineer_image', $user_id),
//     'signature'   => get_the_author_meta('engineer_signature', $user_id)
//   );

//   echo json_encode($userdata);

//   wp_die();
// }
// // add_action('wp_ajax_mvpm_GetListingBy', 'mvpm_GetListingBy');

// /**
//   *
//   *
//   * mvpm_GetListingByDateRange()
//   *
//   * @param string $form_type References the data contained in the form_type column of the mvpm_system database table.
//   * @param string $owner References the owner column by numerical id indentifying user.
//   *
//   * @return json 
//   */
// function mvpm_GetListingByDateRange(){
// }
// // add_action('wp_ajax_mvpm_GetListingBy', 'mvpm_GetListingBy');

// /**
//   * 
//   *
//   * mvpm_GetListingByMetaData()
//   *
//   * @param string $form_type References the data contained in the form_type column of the mvpm_system database table.
//   * @param string $owner References the owner column by numerical id indentifying user.
//   *
//   * @return json 
//   */
// function mvpm_GetListingByMetaData(){
// }
// // add_action('wp_ajax_mvpm_GetListingByMetaData', 'mvpm_GetListingByMetaData');

// /**
//   * 
//   *
//   * mvpm_GetListingByMetaData()
//   *
//   * @param string $form_type References the data contained in the form_type column of the mvpm_system database table.
//   * @param string $owner References the owner column by numerical id indentifying user.
//   *
//   * @return json 
//   */
// function mvpm_GetListingByMetaData(){
// }
// // add_action('wp_ajax_mvpm_GetListingByMetaData', 'mvpm_GetListingByMetaData');

//add_action( 'rest_api_init', function () {
//    register_rest_route( 'myplugin/v1', '/author/(?P<id>\d+)', array(
//        'methods' => 'GET',
//        'callback' => 'my_awesome_func',
//    ) );
//} );

