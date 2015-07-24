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


	Function : Request to the cache if not then from the APi for the Match Details
	Variables :
		Input: Server and Match ID for the Request 
		Output: Output of the Cache / API




	Function : get the Recent Games form the cache.
	Variables :
		Input: Summoner Name and Summoner Server for the Request
		Output: Output of the Cache

				//!!! eventuel API anfrage auch noch einfügen !!!! 
	function GetRecentGames($SumName , $SumServer){
		global $cache;
		$RecentGamesObj = $cache->get("{$SumName}_{$SumServer}_RecentGames");
		return $RecentGamesObj;
	};
?>









