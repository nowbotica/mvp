<?php
/**
  * An API for the Listings.php class 
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

function mvpm_GetListing(){
  	// check_ajax_referer( 'mvpm_system', 'security' );
  	// ternary = statment ? 'return if true' : 'return if false';
  	$by = !empty($_REQUEST['by']) ? $_REQUEST['by'] : NULL ;

  	global $wpdb;
	$_helper = new Helper_Listing;
	$listingObject = new stdClass;

	// "object"
	switch (gettype($by)) {
		case "string" 
			# code...
			$listingObject = '{"error_code": "incorrecttype", "debug_message": "string not supported"}';
  			wp_die();
			break;
		case "array" 
			# code...
			$listingObject = '{"error_code": "incorrecttype", "debug_message": "array not supported"}';
  			wp_die();
			break;
		case "boolean" 
			# code...
			$listingObject = '{"error_code": "incorrecttype", "debug_message": "boolean not supported"}';
  			echo $listingObject;
  			wp_die();
			break;
		case "integer"
			# code...
			# Returns an individual Listing post
			$args = array(
  				'p' : $by,
  				'post_type' => 'listing',
			);
			$listingObject = new WP_Query( $args );						
			echo $_helper->buildSJON($listingObject);						
  			wp_die();
			break;
		case "double"
			# code...
			$listingObject = '{"error_code": "incorrecttype", "debug_message": "float not supported"}';
  			echo $listingObject;
  			wp_die();
			break;
		case "object"
			# code...
			$listingObject = '{"error_code": "incorrecttype", "debug_message": "object not supported"}';
			echo $listingObject;
  			wp_die();
			break;
		case "NULL" // NULL
			# code...
			# Returns all the listing posts
			$args = array(
  				'post_type' => 'listing'
			);
			$listingObject = new WP_Query( $args );						
			echo $_helper->buildSJON($listingObject);
			break;
		default:
			# code...
			echo '{"error_code": "eh", "debug_message": "switch statement failed to match value"}';
			break;
	}


	

}
add_action('wp_ajax_mvpm_GetListing', 'mvpm_GetListing');


class ListingLibrary {
	
	public function buildJSON($listingdata){
		// var_dump($listingdata);die;
		
		// $listingdata = array(
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
		// );

		return json_encode($listingdata);
	}
}

/**
  *
  *
  * mvpm_GetListingByTaxonomy()
  *
  * @param string $form_type References the data contained in the form_type column of the mvpm_system database table.
  * @param string $owner References the owner column by numerical id indentifying user.
  *
  * @return json 
  */
function mvpm_GetListingByTaxonomy(){

}
// add_action('wp_ajax_mvpm_GetListingByTaxonomy', 'mvpm_GetListingByTaxonomy');

/**
  * Returns the listings owned by a certain user
  *
  * mvpm_GetListingByUser()
  *
  * @param string $form_type References the data contained in the form_type column of the mvpm_system database table.
  * @param string $owner References the owner column by numerical id indentifying user.
  *
  * @return json 
  */
function mvpm_GetListingByUser(){
  check_ajax_referer( 'tzu_system', 'security' );
  global $wpdb;
  $user_id    = get_current_user_id();
  *

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
// add_action('wp_ajax_mvpm_GetListingBy', 'mvpm_GetListingBy');

/**
  *
  *
  * mvpm_GetListingByDateRange()
  *
  * @param string $form_type References the data contained in the form_type column of the mvpm_system database table.
  * @param string $owner References the owner column by numerical id indentifying user.
  *
  * @return json 
  */
function mvpm_GetListingByDateRange(){
}
// add_action('wp_ajax_mvpm_GetListingBy', 'mvpm_GetListingBy');

/**
  * 
  *
  * mvpm_GetListingByMetaData()
  *
  * @param string $form_type References the data contained in the form_type column of the mvpm_system database table.
  * @param string $owner References the owner column by numerical id indentifying user.
  *
  * @return json 
  */
function mvpm_GetListingByMetaData(){
}
// add_action('wp_ajax_mvpm_GetListingByMetaData', 'mvpm_GetListingByMetaData');

/**
  * 
  *
  * mvpm_GetListingByMetaData()
  *
  * @param string $form_type References the data contained in the form_type column of the mvpm_system database table.
  * @param string $owner References the owner column by numerical id indentifying user.
  *
  * @return json 
  */
function mvpm_GetListingByMetaData(){
}
// add_action('wp_ajax_mvpm_GetListingByMetaData', 'mvpm_GetListingByMetaData');
