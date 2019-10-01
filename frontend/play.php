<?PHP
require("../ini.php");

$gameslug = $_GET["g"];
$user_identifier = "klaud";
$round_identifier = "1";
$competition_id = "1";

$backend_url_start = BASE_URL."/backend/api/start";
$backend_url_end = BASE_URL."/backend/api/end";
// $backend_url_start = "http://192.168.1.19/start";
// $backend_url_end = "http://192.168.1.19/end";
	
function make_jumbled_backend_url($backend_url)
{
	$chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	$r = substr(str_shuffle(str_repeat($chars, 11)), 0, 100);
	$r .= str_replace( '==', '', base64_encode($backend_url) );
	return $r;
}
function csrf_token()
{
	return "faketoken";
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
	
	<!-- This ensures the canvas works on IE9+.  Don't remove it! -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	
	<title>ViralSys Games - <?php echo $gameslug ?></title>
	
	<style type="text/css">
	body
	{
		background-color: black;
		color: white;
		margin: 0;
		padding: 0;
		overflow: hidden;
	}
	
	#side
	{
		width: 150px;
		position: absolute;
		top: 0px;
		bottom: 0px;
	}
	
	#main
	{
		position: absolute;
		left: 150px;
		top: 0px;
		bottom: 0px;
		right: 0px;
	}
	
	iframe
	{
		border: none;
	}
	</style>
</head> 
 
<body>
	
	<script src="jquery-2.1.1.min.js"></script>

	<script>
	/* global jQuery */
	var side_size = 150;
	function size_iframe()
	{
		var w = jQuery(window).width() - side_size;
		var h = jQuery(window).height();
		jQuery("iframe").width(w).height(h);
	};
	jQuery(document).ready(size_iframe);
	jQuery(window).resize(size_iframe);
	</script>
	
	<div id="side">...</div>

	<script type="text/javascript">
		function onGameFrameLoad()
		{
			var gameframe = window.frames["gameframe"].window
			gameframe.bambi = "<?php echo csrf_token() ?>"
			gameframe.casper = "<?php echo $competition_id ?>"
			gameframe.pa__="<?php echo make_jumbled_backend_url( $backend_url_start ) ?>"
			gameframe.pb__="<?php echo make_jumbled_backend_url( $backend_url_end ) ?>"
			gameframe.on_game_over = onGameOverRequestResponse
			gameframe.on_close_btn = ()=>window.history.back()
			gameframe._a.slack.webhook_url = "https://hooks.slack.com/services/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"
		}
		function onGameOverRequestResponse()
		{
			console.log("Close your eyes. Wow, the iframe is gone!")
		}
	</script>
	
	<div id="main">
		<iframe src="<?php echo $gameslug ?>/game.html" 
				name="gameframe" 
				scrolling="no" 
				noresize="noresize" 
				allowfullscreen="true" 
				onLoad="onGameFrameLoad()"
				/>
	</div>
	
</body> 
</html> 