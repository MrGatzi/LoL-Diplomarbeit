<?php	
		/*
		*/
		
		// Include PHP FAST CACHE
		require_once("../Libraries/phpfastcache/phpfastcache.php");
		phpFastCache::setup("storage","auto");
		$cache = phpFastCache();
		$postdata = file_get_contents("php://input");
		$Input_RequestData = json_decode($postdata);
		$Input_RequestData=$Input_RequestData->data1;
		//Check if the requested data is already in Cache
		If($Input_RequestData->Mode=="set"){
			$SaveObj = $cache->get("{$Input_RequestData->SumName}_{$Input_RequestData->ServName}_{$Input_RequestData->MatchId}_Overview");
			if($SaveObj==Null){
				$cache->set("{$Input_RequestData->SumName}_{$Input_RequestData->ServName}_{$Input_RequestData->MatchId}_Overview",$Input_RequestData->GameInfoOverview, 60000);
			}		
			echo 'done';
		}else{
			$SaveObj = $cache->get("{$Input_RequestData->SumName}_{$Input_RequestData->ServName}_{$Input_RequestData->MatchId}_Overview");
			if($SaveObj==Null){
				echo 'Error';
			}else{
				echo json_encode($SaveObj);
			}
		}
?>
