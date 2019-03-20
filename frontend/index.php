<?PHP

$gameslug = $_GET["game"]

?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
	
	<!-- This ensures the canvas works on IE9+.  Don't remove it! -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	
	<!-- Standardised web app manifest -->
	<link rel="manifest" href="appmanifest.json" />
	
	<!-- Allow fullscreen mode on iOS devices. (These are Apple specific meta tags.) -->
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<link rel="apple-touch-icon" sizes="256x256" href="icon-256.png" />
	<meta name="HandheldFriendly" content="true" />
	
	<!-- Chrome for Android web app tags -->
	<meta name="mobile-web-app-capable" content="yes" />
	<link rel="shortcut icon" sizes="256x256" href="icon-256.png" />
	
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
		var side_size = 150;
		
		function size_iframe()
		{
			var w = jQuery(window).width() - side_size;
			var h = jQuery(window).height();
			jQuery("iframe").width(w).height(h);
		};
		
		jQuery(document).ready(size_iframe);
		jQuery(window).resize(size_iframe);
		
		window.C2_RegisterSW = function C2_RegisterSW() {}
	</script>
	
	<div id="side">
		<p>Side content goes here. You can add any additional HTML content, e.g. an advert.</p>
	</div>

	<script type="text/javascript">
		console.warn("test-001")
		
		function onGameFrameLoad()
		{
			var gameframe = window.frames["gameframe"].window
			
			gameframe.current_user_id="klaud"
			gameframe.current_user_session="aHR0cHM6Ly9ibG9ja2NoLXZpcmFsLWdhbWVzLWNob2VwaGl4LmM5dXNlcnMuaW8vYmFja2VuZA"
			gameframe.foo = function ( ...rest ) { console.log( "Foo--", rest ) }
			
			addScriptToGameFrame( gameframe, "https://blockch-viral-games-choephix.c9users.io/development/prepared/pretty.js" )
			addScriptToGameFrame( gameframe, "https://blockch-viral-games-choephix.c9users.io/development/prepared/redirect-unpretty-to-pretty.js" )
		}
		
		function addScriptToGameFrame( gameframe, src )
		{
			let head = gameframe.document.getElementsByTagName("head")[0];
			let script = document.createElement('script')
			script.src = src
        	head.appendChild(script)
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