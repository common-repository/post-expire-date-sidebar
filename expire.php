<?php

/**
 * Plugin Name: Post expire date Sidebar
 * Plugin URI: https://www.popland.it
 * Description: Gutenberg sidebar to manage post expiration
 * Version: 1.3.1
 * Author: Lorenzo Noccioli
 *
 */

function peds_register()
{
	wp_register_script(
		'peds-sidebar-js',
		plugins_url('expire.js', __FILE__),
		array(
			'wp-plugins',
			'wp-edit-post',
			'wp-element',
			'wp-components'
		)
	);
	wp_register_style(
		'peds-sidebar-css',
		plugins_url('expire.css', __FILE__)
	);


	register_post_meta('', 'sidebar_toogle', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'boolean',
	));

	register_post_meta('', 'sidebar_date', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	));

	register_post_meta('', 'sidebar_drop', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	));
}
add_action('init', 'peds_register');

function peds_script_enqueue()
{
	wp_enqueue_script('peds-sidebar-js');
}
add_action('enqueue_block_editor_assets', 'peds_script_enqueue');

function peds_style_enqueue()
{
	wp_enqueue_style('peds-sidebar-css');
}
add_action('enqueue_block_assets', 'peds_style_enqueue');


function peds_on_save_post($post_ID)
{
	$id = $post_ID;
	$metas = get_post_meta($id);
	$date = $metas['sidebar_date'][0];
	$newstatus = $metas['sidebar_drop'][0];
	$timestamp = strtotime($date);
	$timestampc = $timestamp - (3600 * get_option('gmt_offset'));
	if ($metas['sidebar_toogle'][0] == 1) {
		// $txt .= "setting wp_cron\n";
		wp_clear_scheduled_hook('peds_expire_hook', array('trash', $id));
		wp_clear_scheduled_hook('peds_expire_hook', array('draft', $id));
		wp_clear_scheduled_hook('peds_expire_hook', array('private', $id));
		wp_schedule_single_event($timestampc, 'peds_expire_hook', array($newstatus, $id));
	} else {
		// $txt .= "clear schedule\n";
		wp_clear_scheduled_hook('peds_expire_hook', array('trash', $id));
		wp_clear_scheduled_hook('peds_expire_hook', array('draft', $id));
		wp_clear_scheduled_hook('peds_expire_hook', array('private', $id));
	}
}

function peds_expire_post_status($st, $sid)
{
	if ($st == 'trash') {
		wp_trash_post($sid);
	} else {
		$up_post = array();
		$up_post['ID'] = $sid;
		$up_post['post_status'] = $st;
		wp_update_post($up_post);
	}
}

function post_expiration_datetime()
{
	$cid = get_the_ID();
	$cdate = get_post_meta($cid, 'sidebar_date');
	$timestamp = strtotime($cdate[0]);
	$friendly_date = date_i18n(get_option('date_format'), $timestamp);
	$friendly_time = date_i18n(get_option('time_format'), $timestamp);
	return $friendly_date . " " . $friendly_time;
}

add_action('save_post', 'peds_on_save_post');
add_action('peds_expire_hook', 'peds_expire_post_status', 10, 3);
add_shortcode('expiration_datetime', 'post_expiration_datetime');
