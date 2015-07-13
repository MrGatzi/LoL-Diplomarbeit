<?php  
	require_once("Libraries/phpfastcache/phpfastcache.php");
	phpFastCache::setup("storage","auto");
	$cache = phpFastCache();
	$GameId = $_GET['GameId'];
	$SumServer = $_GET['SumServer'];
	$SumName = $_GET['SumName'];
	$RecentGames = GetRecentGames($SumName, $SumServer);
	// Check if RecentGAmes are still in Cache if not Alert with Error;
	if($RecentGames==NULL){
		$message = "wrong answer";
		echo "<script type='text/javascript'>alert('$message');</script>";
	}else{
		
	};







/*
	Funktion : get the Recent Games form the cache.
	Variables :
		Input: Summoner Name and Summoner Server for the Request
		Output: Output of the Cache
*/
	function GetRecentGames($SumName , $SumServer){
		global $cache;
		$RecentGamesObj = $cache->get("{$SumName}_{$SumServer}_RecentGames");
		print_r(json_encode($RecentGamesObj));
		return $RecentGamesObj;
	};
?>