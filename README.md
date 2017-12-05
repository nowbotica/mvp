* MVP Mechanic

** Product Story 

Remember Someone | 
| Ask for their address
Meet Someone | 
| Ask for their telephone number
Write to Someone |
| Send them your address

Choose your own unforgettable name for them

exclude /-/ include

** Setup

```
$ mkdir -p /c/project/start.here/wordpress/
$ cd !$
$ wget wordpress
$ 
$ echo  'alias go="cd /c/project/start.here/wordpress/wp-content/plugins/mvp-mechanic"' >> ~/.bashrc
```

** Todo
- Create an seo friendly api or something
    - https://blog.keras.io/user-experience-design-for-apis.html
- Migrate to yarn
    - http://tomasalabes.me/blog/web-development/2017/10/03/Migrating-a-bower-module-to-npm-yarn.html
- Fix SCSS Build
- Automatically include mvmp-application-template.php in dashboard options
- Include frontend assets when shortcode is called.
- Create Dev build of assets in mvp-mechanic.php
- //wp_enqueue_style('angular-mighty-datepicker', TZUSYSTEM_URL .  '/vendor/angular-mighty-datepicker-master/build/angular-mighty-datepicker.css', false, '1.0.0', 'all');
- // wp_enqueue_script( 'moment-js', TZUSYSTEM_URL .  '/vendor/moment-develop/moment.js', array());
- cookies vs local storage

        //core: those features any mobile/desktop app could benefit of.
        //components: angular directives and services to support introduced UI components.
        //gestures: services and directives to handle touches easily.
        // wp_enqueue_script( 'mobile-angular-ui', TZUSYSTEM_URL . '/vendor/mobile-angular-ui-1.3.4/dist/js/mobile-angular-ui.js', array(
        //   'jquery', 'angular'
        // ));
function snwb_get_user_role( $user = null ) {
	$user = $user ? new WP_User( $user ) : wp_get_current_user();
	return $user->roles ? $user->roles[0] : false;
}

/**
 * Add a widget to the dashboard.
 *
 * This function is hooked into the 'wp_dashboard_setup' action below.
 */
function ot_add_dashboard_widgets() {

    wp_add_dashboard_widget(
                 'ot-blog-managment-panel',     // Widget slug.
                 'Blog Management Panel',       // Title.
                 'snwb_options_page' // Display function.
        );  
}
add_action( 'wp_dashboard_setup', 'ot_add_dashboard_widgets' );

/**
 * Create the function to output the contents of our Dashboard Widget.
 */
function ot_dashboard_widget_function() {

    // Display whatever it is you want to show.
    echo "<h1>Hello World, I'm a great Dashboard Widget</h1>";


}

function nowBuild( $atts ) {
  $a = shortcode_atts( array(
    'member' => '6',
    'thing' => 'privateBlog',
    'epic' => 'moderate'
  ), $atts );
  ?>
  <section class="nowbuild-service {{system.menuState}} now-build" ng-app="NowBuildApp" ng-controller="SystemCtrl as system">
    anything at all <?= $a['member'];?> <?= $a['thing'];?> 
    <!-- <ui-view autoscroll="false" ng-if='!isRouteLoading' > -->
    <!-- </ui-view> -->
    <!-- <systemloader></systemloader> -->
    <megaloader member="<?= $a['member'];?>" thing="<?= $a['thing'];?>"></megaloader>
  </section>
  <?php
}
add_shortcode('nowBuild', 'nowBuild');

setcookie('dfenginekey', $_POST['pass'], $hour);  


Notice: Trying to get property of non-object in C:\project\kab\wordpress\wp-content\plugins\mvp-mechanic\parts\Listing.php on line 199

Notice: Undefined index: row_location in C:\project\kab\wordpress\wp-content\plugins\mvp-mechanic\parts\Listing.php on line 199

Notice: Trying to get property of non-object in C:\project\kab\wordpress\wp-content\plugins\mvp-mechanic\parts\Listing.php on line 200

Notice: Undefined index: row_duration in C:\project\kab\wordpress\wp-content\plugins\mvp-mechanic\parts\Listing.php on line 200

Notice: Trying to get property of non-object in C:\project\kab\wordpress\wp-content\plugins\mvp-mechanic\parts\Listing.php on line 201

Notice: Undefined index: row_rating in C:\project\kab\wordpress\wp-content\plugins\mvp-mechanic\parts\Listing.php on line 201

Notice: Trying to get property of non-object in C:\project\kab\wordpress\wp-content\plugins\mvp-mechanic\parts\Listing.php on line 202

Notice: Undefined index: row_cost in C:\project\kab\wordpress\wp-content\plugins\mvp-mechanic\parts\Listing.php on line 202

Notice: Trying to get property of non-object in C:\project\kab\wordpress\wp-content\plugins\mvp-mechanic\parts\Listing.php on line 204

Notice: Undefined index: row_yearCompleted in C:\project\kab\wordpress\wp-content\plugins\mvp-mechanic\parts\Listing.php on line 204

Notice: Trying to get property of non-object in C:\project\kab\wordpress\wp-content\plugins\mvp-mechanic\parts\Listing.php on line 205

Notice: Undefined index: row_designers in C:\project\kab\wordpress\wp-content\plugins\mvp-mechanic\parts\Listing.php on line 205

Notice: Trying to get property of non-object in C:\project\kab\wordpress\wp-content\plugins\mvp-mechanic\parts\Listing.php on line 206

Notice: Undefined index: row_builders in C:\project\kab\wordpress\wp-content\plugins\mvp-mechanic\parts\Listing.php on line 206

Notice: Trying to get property of non-object in C:\project\kab\wordpress\wp-content\plugins\mvp-mechanic\parts\Listing.php on line 207

Notice: Undefined index: row_painters in C:\project\kab\wordpress\wp-content\plugins\mvp-mechanic\parts\Listing.php on line 207


// LOCAL STORAGE TODO
// MvpmApp.config(function (localStorageServiceProvider) {
//     localStorageServiceProvider
//         .setPrefix('MvpMechanicStorage')
//         .setStorageType('sessionStorage')
//         .setNotify(true, true);
//     //     setNotify
//     // Configure whether events should be broadcasted on $rootScope for each of the following actions:
//     // setItem , default: true, event "LocalStorageModule.notification.setitem"
//     // removeItem , default: false, event "LocalStorageModule.notification.removeitem"
// });

autentication somethint

write explaination of sql used in listing query