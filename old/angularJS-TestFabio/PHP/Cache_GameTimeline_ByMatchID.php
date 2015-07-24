<?php	
		/*2
		*/
		
		// Include PHP FAST CACHE
		require_once("../../Libraries/phpfastcache/phpfastcache.php");
		phpFastCache::setup("storage","auto");
		$cache = phpFastCache();
		$postdata = file_get_contents("php://input");
		$Input_RequestData = json_decode($postdata);
		$Input_RequestData=$Input_RequestData->data1;
		$GameInfoTimeline = $cache->get("{$Input_RequestData->MatchId}_{$Input_RequestData->ServName}_GameInfo");
		if($GameInfoTimeline == null) {
				$url="https://{$Input_RequestData->ServName}.api.pvp.net/api/lol/euw/v2.2/match/{$Input_RequestData->MatchId}?includeTimeline=true&api_key=13e2466b-c06a-4fb9-a782-724de53fb4c4";
				// CURL sends a request to the selected URL (=$url) and if the CURLOPT_RETURNTRANSFER option is set, it will return the result on success
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($ch, CURLOPT_URL,$url);
				$GameInfoTimeline=curl_exec($ch);
				curl_close($ch);
				$GameInfoTimeline=json_decode($GameInfoTimeline);
				// Saves the Data in Cache for 1 minute
				$cache->set("{$Input_RequestData->MatchId}_{$Input_RequestData->ServName}_GameInfo",$GameInfoTimeline , 60);
			}
		echo json_encode($GameInfoTimeline);
		
?>
