<?PHP
require("../ini.php");

$gameslug = $_GET["g"];
if ( $gameslug == null )
{
  ?>
    <p><a href="/frontend/?g=kufox-jump">Kufox Jump</a></p>
    <p><a href="/frontend/?g=coin-pop">Coin Pop</a></p>
    <p><a href="/frontend/?g=crypto-match">Crypto Match</a></p>
    <p><a href="/frontend/?g=fud-destroyer">FUD Destroyer</a></p>
  <?PHP
  exit();
}
$backend_url = BASE_URL."/backend";
$user_identifier = "klaud";
$round_identifier = "1";
$competition_id = "55";

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
			gameframe.current_round_id="<?php echo $round_identifier ?>"
			gameframe.current_user_id="<?php echo $user_identifier ?>"
			gameframe.current_user_session="<?php echo make_jumbled_backend_url($backend_url) ?>"
			gameframe.on_game_over = onGameOverRequestResponse
		}
		// function onGameOverRequestResponse( res )
		function onGameOverRequestResponse()
		{
			/// Remove this if not in dev
			// console.log(res.responseURL, res.responseText)
			
			/// Close the iframe and refresh leaderboard...
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