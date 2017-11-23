<?php
/*
Template Name: MvpmApp Wrapper
*/
/**
 * Whitelabeled Visitor Facing Single Page Javascript Application Template
 *
 * @package MVP Mechanic
 */
?>
<!doctype html>
<html class="no-js" <?php language_attributes(); ?> >
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<?php wp_head(); ?>
	</head>
	<body class="whitelabel" ng-app="MvpmApp">

	    <?php do_shortcode('[mvpmApp][/mvpmApp]');?>

	    <?php wp_footer(); ?>
	</body>
</html>