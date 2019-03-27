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

function make_jumbled_backend_url()
{
	global $backend_url;
	$chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	$r = substr(str_shuffle(str_repeat($chars, 11)), 0, 100);
	$r .= str_replace( '==', '', base64_encode($backend_url) );
	return $r;
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
	
	<div id="side">
		<p>Side content goes here. You can add any additional HTML content, e.g. an advert.</p>
	</div>

	<script type="text/javascript">
		function onGameFrameLoad()
		{
			var gameframe = window.frames["gameframe"].window
			gameframe.current_user_id="<?php echo $user_identifier ?>"
			gameframe.current_user_session="<?php echo make_jumbled_backend_url() ?>"
			<?PHP if (true) { ?>
			gameframe.lj_ = "<?PHP echo $backend_url ?>/"
			gameframe.l1 = function (res) { console.warn(res) }
			<?php } ?>
			gameframe.foo = function ( ...rest ) { }
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