<?php
/*
Plugin Name: TODOLIST
 */
require(get_stylesheet_uri() . '/assets/script/todolist.js');


function wpdocs_theme_name_scripts()
{
    wp_enqueue_style('style-name', get_stylesheet_uri() . '/assets/css/style.css');
    wp_enqueue_script('script-name', get_template_directory_uri() . '/assets/script/todolist.js');
}

add_action('wp_enqueue_scripts', 'wpdocs_theme_name_scripts');


add_shortcode('todolist', app . init);
