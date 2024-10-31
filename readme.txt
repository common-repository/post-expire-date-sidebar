=== Post expire date Sidebar ===
Contributors: popeating, popland
Tags: Post, expiration, Gutenberg, sidebar, schedule
Requires at least: 3.0.1
Requires PHP: 5.2.4
Tested up to: 5.5.3
Stable tag:  1.3.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Post expire date sidebar for Gutenberg it's a minimal plugin that allow to set an expiration date for posts

== Description ==

Post expire date Sidebar for Gutenberg will add a Gutenberg sidebar where the user can enable Post expiration by setting an expiration date and time and a status (draft, trash, private) the Post will revert once expired. Expiration date can be removed or rescheduled at any time. Post expire date for Gutenberg uses wp-cron to schedule the single event, please be sure you have wp-cron active on your installation.
You can print the expiration date and time inside a post, using the shortcode [expiration_datetime] inside your post.

== Installation ==

1. Upload the 'post-expire-date-sidebar' folder to the '/wp-content/plugins/' directory.
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Find the sidebar on your Gutenberg block editor

== Frequently Asked Questions ==

= Does it work only on Gutenberg block editor? =

Yes, this plugin was specifically made to add a sidebar in block editor.

= Why my post did not expire? =

It could be for a couple of reason: first you don't have wp-cron running, please check your wp-cron is running (there are many plugins, like WP-Cron Status Checker); second, the way wp-cron is triggered is by site visit, scheduled events runs when the date they are scheduled is passed AND someone visit the site


== Screenshots ==

1. Sidebar

== Changelog ==

= 1.3.1 =
* Bug fixes.
* Added support for pages and custom post type

= 1.1 =
* Added shortcode support.
 
= 1.0 =
* Initial release.
