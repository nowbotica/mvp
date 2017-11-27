<?php

// <!-- http://stevenslack.com/add-image-uploader-to-profile-admin-page-wordpress// -->

/**
 * Add new fields above 'Update' button.
 *
 * @param WP_User $user User object.
 */
function friend_crm_additional_profile_fields( $user ) {

    $months     = array( 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' );
    $default    = array( 'day' => 1, 'month' => 'Jnuary', 'year' => 1950, );
    $birth_date = wp_parse_args( get_the_author_meta( 'birth_date', $user->ID ), $default );

    ?>
    <h3>Profile Information</h3>

    <table class="form-table">
     <tr>
         <th><label for="birth-date-day">Birth date</label></th>
         <td>
             <select id="birth-date-day" name="birth_date[day]"><?php
                 for ( $i = 1; $i <= 31; $i++ ) {
                     printf( '<option value="%1$s" %2$s>%1$s</option>', $i, selected( $birth_date['day'], $i, false ) );
                 }
             ?></select>
             <select id="birth-date-month" name="birth_date[month]"><?php
                 foreach ( $months as $month ) {
                     printf( '<option value="%1$s" %2$s>%1$s</option>', $month, selected( $birth_date['month'], $month, false ) );
                 }
             ?></select>
             <select id="birth-date-year" name="birth_date[year]"><?php
                 for ( $i = 1950; $i <= 2015; $i++ ) {
                     printf( '<option value="%1$s" %2$s>%1$s</option>', $i, selected( $birth_date['year'], $i, false ) );
                 }
             ?></select>
         </td>
    </tr>
    <tr>
        <th><label for="engineer_name">Name</label></th>
        <td>
            <input type="text" name="engineer_name" id="engineer-name" value="<?php echo esc_attr(  get_the_author_meta( 'engineer_name', $user->ID ) );?>" class="regular-text" /><br />
            <span class="description">Please enter your Proper Name.</span>
        </td>
    </tr>
    <tr>
        <th><label for="engineer_blurb">Blurb</label></th>
        <td>
            <input type="text" name="engineer_blurb" id="engineer-blurb" value="<?php echo esc_attr(  get_the_author_meta( 'engineer_blurb', $user->ID ) );?>" class="regular-text" /><br />
            <span class="description">Tell the world about yourself.</span>
        </td>
    </tr>
    <tr>
        <th><label for="name">CV</label></th>
 
        <td>
            <input type="text" name="engineer_cv" id="engineer-cv" value="<?php echo esc_attr( get_the_author_meta( 'engineer_cv', $user->ID ) ); ?>" class="regular-text" /><br />
            <span class="description">Do you have a CV you wish to attach</span>
        </td>
    </tr>
    <tr>
        <th><label for="Signature">Signature</label></th>
            <td>
                <input type="text" name="engineer_signature" id="engineer-signature" value="<?php echo esc_attr( get_the_author_meta( 'engineer_signture', $user->ID ) ); ?>" class="regular-text" /><br />
                <span class="description">Your like world facing tag.</span>
            </td>
        </tr>
    <tr>
        <th><label for="Signature">Social Stuffs</label></th>
            <td>
                <input type="text" name="engineer_social" id="engineer-social" value="<?php echo esc_attr( get_the_author_meta( 'engineer_social', $user->ID ) ); ?>" class="regular-text" /><br />
                <span class="description">A collection of sharable stuffs.</span>
            </td>
        </tr>
          <tr>
        <th><label for="Image">Image</label></th>
            <td>
                <input type="text" name="engineer_image" id="engineer-image" value="<?php echo esc_attr( get_the_author_meta( 'engineer_image', $user->ID ) ); ?>" class="regular-text" /><br />
                <span class="description">Your image.</span>
            </td>
        </tr>
    </table>
    <?php
}

add_action( 'show_user_profile', 'friend_crm_additional_profile_fields' );
add_action( 'edit_user_profile', 'friend_crm_additional_profile_fields' );

/**
 * Save additional profile fields.
 *
 * @param  int $user_id Current user ID.
 */
function friend_crm_save_profile_fields( $user_id ) {

    if ( ! current_user_can( 'edit_user', $user_id ) ) {
     return false;
    }
    if ( !empty( $_POST['birth_date'] ) ) {
        update_usermeta( $user_id, 'birth_date', $_POST['birth_date'] );
    }
    if ( !empty( $_POST['engineer_name'] ) ) {
        update_usermeta( $user_id, 'engineer_name', $_POST['engineer_name'] );
    }
    if ( !empty( $_POST['engineer_blurb'] ) ) {
        update_usermeta( $user_id, 'engineer_blurb', $_POST['engineer_blurb'] );
    }

    if ( !empty( $_POST['engineer_cv'] ) ) {
        update_usermeta( $user_id, 'engineer_cv', $_POST['engineer_cv'] );
    }

    if ( !empty( $_POST['engineer_signature'] ) ) {
        update_usermeta( $user_id, 'engineer_signature', $_POST['engineer_signature'] );
    }

    if ( !empty( $_POST['engineer_image'] ) ) {
        update_usermeta( $user_id, 'engineer_image', $_POST['engineer_image'] );
    }
    
    return false;

}

add_action( 'personal_options_update', 'friend_crm_save_profile_fields' );
add_action( 'edit_user_profile_update', 'friend_crm_save_profile_fields' );


/// login script

/**
 * Redirect user after successful login.
 *
 * @param string $redirect_to URL to redirect to.
 * @param string $request URL the user is coming from.
 * @param object $user Logged user's data.
 * @return string
 */
// function tzu_login_redirect( $redirect_to, $request, $user ) {
//     //is there a user to check?
//     if ( isset( $user->roles ) && is_array( $user->roles ) ) {
//         //check for admins
//         if ( in_array( 'administrator', $user->roles ) ) {
//             // redirect them to the default place

//             return $redirect_to;
//         } else {
//             return home_url();
//         }
//     } else {
//         return $redirect_to;
//     }
// }

// // get the user object
// add_filter( 'tzu_login_redirect', 'tzu_login_redirect', 10, 3 );

/**
 * WordPress function for redirecting users on login based on user role
 */
// function tzu_login_redirect( $url, $request, $user ){
//     if( $user && is_object( $user ) && is_a( $user, 'WP_User' ) ) {
//         switch (true) {
//             case $user->has_cap( 'administrator' ):
//                 # code...
//                 $username = $user->user_login;
//                 $url = admin_url();
//                 $url = home_url();
//                 break;
//             case $user->has_cap( 'editor' ):
//                 # code...
//                 $username = $user->user_login;
//                 $url = home_url('/client/'.$username);
//                 break;
//             case $user->has_cap( 'contributor' ):
//                 # code...
//                 $username = $user->user_login;
//                 $url = home_url('/client/'.$username);
//                 break;
//             default:
//                  $url = admin_url();
//                 # code...
//                 break;
//         }
//     }
//     return $url;
// }
// add_filter('login_redirect', 'tzu_login_redirect', 10, 3 );

