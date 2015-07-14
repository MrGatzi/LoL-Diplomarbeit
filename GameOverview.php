<html>
<head>
</head>
<body>
<?php  
	require_once("Libraries/phpfastcache/phpfastcache.php");
	phpFastCache::setup("storage","auto");
	$cache = phpFastCache();
	$RecentGame = $_GET['RecentGame'];
	$SumServer = $_GET['SumServer'];
	$SumName = $_GET['SumName'];
	$RecentGames = GetRecentGames($SumName, $SumServer);
	// Check if RecentGAmes are still in Cache if not Alert with Error;
	if($RecentGames==NULL){
		$message = "wrong answer";
		echo "<script type='text/javascript'>alert('$message');</script>";
	}else{
		$RequestedGameID = $RecentGames->games[$RecentGame]->gameId;
		$Game=GetGameInfomation($SumServer,$RequestedGameID);
	};
	echo '<p> The Game you played the last time was an ' .$Game->matchMode.' Game </p>';

/*
	Function : Request to the cache if not then from the APi for the Match Details
	Variables :
		Input: Server and Match ID for the Request 
		Output: Output of the Cache / API
*/
	function GetGameInfomation($Server, $Matchid){
		global $cache;
		$GameInfoTimeline = $cache->get("{$Matchid}_{$Server}_GameInfo");
		if($GameInfoTimeline == null) {
				$url="https://{$Server}.api.pvp.net/api/lol/euw/v2.2/match/{$Matchid}?includeTimeline=true&api_key=13e2466b-c06a-4fb9-a782-724de53fb4c4";
				// CURL sends a request to the selected URL (=$url) and if the CURLOPT_RETURNTRANSFER option is set, it will return the result on success
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($ch, CURLOPT_URL,$url);
				$GameInfoTimeline=curl_exec($ch);
				curl_close($ch);
				$GameInfoTimeline=json_decode($GameInfoTimeline);
				// Saves the Data in Cache for 1 minute
				$cache->set("{$Matchid}_{$Server}_GameInfo",$GameInfoTimeline , 60);
			}
		return 	$GameInfoTimeline;
	};

/*
	Function : get the Recent Games form the cache.
	Variables :
		Input: Summoner Name and Summoner Server for the Request
		Output: Output of the Cache
*/
				//!!! eventuel API anfrage auch noch einfügen !!!! 
	function GetRecentGames($SumName , $SumServer){
		global $cache;
		$RecentGamesObj = $cache->get("{$SumName}_{$SumServer}_RecentGames");
		return $RecentGamesObj;
	};
?>
</body>
</html>








