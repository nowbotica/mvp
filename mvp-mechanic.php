<?php
/*
Plugin Name: Nowbotica System
Plugin URI: http://nowbotica.com/lets-tzu-this/
Description: A clean, simplified form building software
Author: Andrew MacKay
Version: 1.2.3
Author URI: http://nowbotica.com/
*/

define( 'MVMPSYSTEM', plugin_dir_path( __FILE__ ) );
define( 'MVMPSYSTEM_URL', plugin_dir_url( __FILE__ ) );

/**
  * Creates shortcode to display main application
  *
  */
function mvpmApp(  ) {
  ?>
  <section class="mvp-mechanic {{system.menuState}} tzu-build" ng-app="MvpmApp" ng-controller="SystemCtrl as system">
    <div class="page-view">
      <system-header></system-header>
      <system-menu></system-menu>

      <!-- <section ng-include="'application/system/auth/auth-register.html'"></section> -->
      <!-- <ui-view autoscroll="false" class="page-view"></ui-view> -->
      <main class="application-view">
        <div class="row">
            <div class="large-12 columns collapse-padding-for-mobile">
                <ui-view autoscroll="false" ng-if='!isRouteLoading' >
                </ui-view>
            </div>
        </div>
      </main>
      <!-- <systemloader></systemloader> -->
      <!-- <div ui-view="testable"></div>  -->
    
    </div>

  </section>
  <?php
}
add_shortcode('mvpmApp', 'mvpmApp');

/*
 * Database Schema for System Forms
*/
//include( TZUSYSTEM . 'includes/database-stuff.php');
include( TZUSYSTEM . 'parts/Listing.php');

/*
 * Main Application
*/
//include( TZUSYSTEM . 'includes/scripts-stylesheets.php');
//include( TZUSYSTEM . 'includes/settings-page.php');
//include( TZUSYSTEM . 'includes/user-profile.php');
//include( TZUSYSTEM . 'includes/system-api.php');