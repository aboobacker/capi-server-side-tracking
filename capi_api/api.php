<?php
require_once("../../../../wp-load.php");

if( !isset($_POST['event_name']) ) exit;

$event_name = $_POST['event_name'];
$event_source_url = $_POST['event_source_url'];
$event_id = $_POST['event_id'];
$event_time = time();
$action_source = "website";
$client_ip_address = file_get_contents('https://secure.thefirstgroup.com/abipapi.php');
$client_user_agent = $_POST['client_user_agent'];;

$pixel_id = get_field('pixel_id', 'option');
$access_token = get_field('access_token', 'option');
$test_event_code = get_field('test_event_code', 'option') ? get_field('test_event_code', 'option') : '';

$url = 'https://graph.facebook.com/v15.0/'.$pixel_id.'/events?access_token='.$access_token;
$ch = curl_init($url);

$data = array(
    "data" => array(
        array(
            "event_name" => $event_name,
            "event_time" => $event_time,
            "event_id" => $event_id,
            "event_source_url" => $event_source_url,
            "action_source" => $action_source,
            "user_data" => array(
                "client_ip_address" => $client_ip_address,
                "client_user_agent" => $client_user_agent,
            )
        )
    ),
    "test_event_code" => $test_event_code
);
$payload = json_encode(array($data));
$payload = trim($payload, '[]');
//echo $payload; die;
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($ch);
curl_close($ch);
//echo $result;