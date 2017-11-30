<?php

function change_default_title( $title ){

    $screen = get_current_screen();

    if ( 'listing' == $screen->post_type ){
        $title = 'Establishment name';
    }

    return $title;
}
add_filter( 'enter_title_here', 'change_default_title' );
// https://stackoverflow.com/users/4080383/kaj-dillen

add_action('init', 'listing_register');

function listing_register() {

    $labels = array(
        'name' => _x('Listings', 'post type general name'),
        'singular_name' => _x('Listing Item', 'post type singular name'),
        'add_new' => _x('Add New', 'listing item'),
        'add_new_item' => __('List new venue'),
        'edit_item' => __('Edit Listing Item'),
        'new_item' => __('New Listing Item'),
        'view_item' => __('View Listing Item'),
        'search_items' => __('Search Listing'),
        'not_found' => __('Nothing found'),
        'not_found_in_trash' => __('Nothing found in Trash'),
        'parent_item_colon' > ''
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'query_var' => true,
        'menu_icon' => get_stylesheet_directory_uri() . '/article16.png',
        'rewrite' => true,
        'capability_type' => 'post',
        'hierarchical' => false,
        'menu_position' => null,
        'supports' => array('title','editor','thumbnail')
    );

    register_post_type( 'listing' , $args );

    // also hooked to init
    register_taxonomy("Space", array("listing"),
        array(
            "hierarchical" => true,
            "label" => "Space Category",
            "singular_label" => "Space Category",
            "rewrite" => true
        )
    );
}

add_action("admin_init", "admin_init");

function admin_init(){
    make_Listing_table();
}

/*
 * The part of your job that lets you win cool stuff
 */
function make_Listing_table()
{
//    add_meta_box( string $id, string $title, callable $callback, string|array|WP_Screen $screen = null, string $context = 'advanced', string $priority = 'default', array $callback_args = null )


    add_meta_box(
        "listing_row_duration",
        "Table:Listing Row:Duration",
        "row_duration",
        "listing",
        "side",
        "low"
    );

    add_meta_box(
        "listing_row_cost",
        "Table:Listing Row:Cost",
        "row_cost",
        "listing",
        "side",
        "low"
    );

    add_meta_box(
        "listing_row_location",
        "Table:Listing Row:Location",
        "row_location",
        "listing",
        "side",
        "low"
    );

    add_meta_box(
        "listing_row_rating",
        "Table:Listing Row:Rating",
        "row_rating",
        "listing",
        "side",
        "low"
    );

    add_meta_box(
        "listing_credits_meta",
        "Design &amp; Build Credits",
        "row_customisation",
        "listing",
        "normal",
        "low"
    );


    add_meta_box(
        "listing_credits_meta",
        "What are you talking about?",
        "row_talkingabout",
        "listing",
        "normal",
        "low"
    );

    
}

/*
 * How can we automate this. does php allow storage of functions in arrays. how would we can such functions
 */

function row_cost(){
    global $post;
    $custom = get_post_custom($post->ID);
    $cost = $custom["row_cost"][0];
    ?>
    <p><label>Cost of drink:</label></p>
    <p><input name="row_cost" value="<?php echo $cost; ?>" placeholder="row_cost" /></p>
    <?php
}

function row_duration(){
    global $post;
    $custom = get_post_custom($post->ID);
    $duration = $custom["row_duration"][0];
    ?>
    <p><label>Duration:</label></p>
    <input name="row_duration" value="<?php echo $duration; ?>"  placeholder="row_duration"  />
    <?php
}

function row_location(){
    global $post;
    $custom = get_post_custom($post->ID);
    $location = $custom["row_location"][0];
    ?>
    <p><label>Location</label></p>
    <p><input name="row_location" value="<?php echo $location; ?>" placeholder="row_location"/></p>
    <?php
}

function row_rating(){
    global $post;
    $custom = get_post_custom($post->ID);
    $rating = $custom["row_rating"][0];
    ?>
    <p><label>Rating</label></p>
    <p><input name="row_rating" value="<?php echo $rating; ?>" placeholder="row_rating"/></p>
    <?php
}

/*
 * $designers = $custom["designers"][0];
 * <p><label>Designed By:</label><br />;
 * <textarea cols="50" rows="5" name="designers"><?php echo $designers; ?></textarea></p>
 * let us call the developers builders and make costings for new builds way more realistic
 */
function row_customisation() {
    global $post;
    $custom = get_post_custom($post->ID);
    $designers = $custom["row_designers"][0] ? $custom["row_designers"][0] : "row_designers";
    $builders  = $custom["row_builders"][0]  ? $custom["row_builders"][0]  : "row_builders";
    $painters  = $custom["row_painters"][0]  ? $custom["row_painters"][0]  : "row_painters";
    $completed = $custom["row_yearCompleted"][0] ? $custom["row_yearCompleted"][0] : "row_yearCompleted";
    ?>
    <!--    // <p>Tag is a depandancy of nth child selection -->
    <p><label>Designed By:</label><p>
    <p><input name="row_designers" value="<?php echo $designers; ?>" placeholder="$row_designers"/></p>
    <p><label>Built By:</label></p>
    <p><input name="row_builders" value="<?php echo $builders; ?>" placeholder="row_builders"></p>
    <p><label>Produced By:</label></p>
<!--    http://blog.teamtreehouse.com/create-your-first-wordpress-custom-post-type-->
    <p><input name="row_painters" value="<?php echo $painters; ?>" placeholder="Painters"></p>
    <p><label>Year Completed:</label></p>
    <p><input name="row_yearCompleted" value="<?php echo $completed; ?>" placeholder="row_yearCompleted"></p>

    <?php
}

function row_talkingabout(){
    global $post;
    $custom = get_post_custom($post->ID);
    // $rating = $custom["row_talkingabout"][0] ? $custom["row_talkingabout"][0] : 'row_talkingabout';
    $talkingabout = $custom["row_talkingabout"][0] ? $custom["row_talkingabout"][0] : 'row_talkingabout';
    ?>
    <p><label>One, Two Three, or four words between, commas</label></p>
    <p><input name="row_talkingabout" value="<?php echo $talkingabout; ?>" placeholder="row_talkingabout"/></p>
    <?php
}

add_action('save_post', 'save_listing_details');
// DEBUG // echo $post->ID;echo '<pre><code>'; echo var_dump($_POST); echo '</code></pre>';die;
function save_listing_details(){
    global $post;
    update_post_meta($post->ID, "row_location", $_POST["row_location"]);
    update_post_meta($post->ID, "row_duration", $_POST["row_duration"]);
    update_post_meta($post->ID, "row_rating", $_POST["row_rating"]);
    update_post_meta($post->ID, "row_cost", $_POST["row_cost"]);

    update_post_meta($post->ID, "row_yearCompleted", $_POST["row_yearCompleted"]);
    update_post_meta($post->ID, "row_designers", $_POST["row_designers"]);
    update_post_meta($post->ID, "row_builders", $_POST["row_builders"]);
    update_post_meta($post->ID, "row_painters", $_POST["row_painters"]);
    update_post_meta($post->ID, "row_talkingabout", $_POST["row_talkingabout"]);
}

/* Todo Customisations */
// Remove Visual Editor
//https://codex.wordpress.org/Function_Reference/wp_editor
//// Url not changing?
//register_post_type( 'portfolio' , $args );
//flush_rewrite_rules();


function mvpm_listing_cpt_enqueue( $hook_suffix ){
    $cpt = 'listing';

    if( in_array($hook_suffix, array('post.php', 'post-new.php') ) ){
        $screen = get_current_screen();
        if( is_object( $screen ) && $cpt == $screen->post_type ){
            // Register, enqueue scripts and styles here
               wp_enqueue_script( 'mvpm-listing-cpt-script', plugins_url( '/parts/listing.js', 
            __FILE__), '', '', true ); // "TRUE" - ADDS JS TO FOOTER

        }
    }
}

add_action( 'admin_enqueue_scripts', 'mvpm_listing_cpt_enqueue');
