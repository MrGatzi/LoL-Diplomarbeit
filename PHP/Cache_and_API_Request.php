<?php	
		/*
		Funtion: Checks if the Requested Data is already in Cache 
					if not : Bulid ULR with inputs and request Data Save Data into Cache and Send them Back to Js
					if : take Data from Cache and send it back to Js
			Inputs : Summoner Name and Server
			Outputs: in form of <{"mrgatzi":{"id":26558642,"name":"Mr Gatzi","profileIconId":786,"summonerLevel":30,"revisionDate":1434999965000}}>
			
		Notes :Uses phpFastCache to check Key look at : "Ausehe_Keys.txt" | Requests Data via Curl | Stores Data for 60 sek. |
				We don't know how to send Data back to Js yet. | writes in Logfile.txt to check Outputs.
				
		Variables : $Input_RequestData - in form of {SumName_input:'input', ServerName_input: 'input'};
					$SumObj - in form of {"mrgatzi":{"id":26558642,"name":"Mr Gatzi","profileIconId":786,"summonerLevel":30,"revisionDate":1434999965000}}
		*/
		
		// Include PHP FAST CACHE
		require_once("../Libraries/phpfastcache/phpfastcache.php");
		phpFastCache::setup("storage","auto");
		$cache = phpFastCache();
		if (!empty($_POST)){
			$Input_RequestData=$_POST['Data1'];
			$fh = fopen("LogFile.txt", "a");
			//Check if Requested Data is already in Cache
			$SumObj = $cache->get("$Input_RequestData[SumName_input]_$Input_RequestData[ServerName_input]_IDRequest");
			if($SumObj == null) {
				fwrite($fh,"Does not Exist in Data Base | ");
				$url="https://$Input_RequestData[ServerName_input].api.pvp.net/api/lol/euw/v1.4/summoner/by-name/$Input_RequestData[SumName_input]?api_key=fbe18d9e-025e-4b0a-a71a-c4844cbd4850";
				// CURL Request on Inputs
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($ch, CURLOPT_URL,$url);
				$result=curl_exec($ch);
				curl_close($ch);
				// Decode Json String If Summoner don't exist Eror!
				if($SumObj = json_decode($result, true)){
					fwrite($fh,"Sucess Created : ");
					fwrite($fh,$SumObj[$Input_RequestData['SumName_input']]['name']);
				}else{
					fwrite($fh,"Error Sumoner doesn't Exist |");
				};
				// Save Data in Cache for 1 Minute
				$cache->set("$Input_RequestData[SumName_input]_$Input_RequestData[ServerName_input]_IDRequest",$SumObj , 60);
				fwrite($fh," Wrote it in Database| ");
			}else{
				fwrite($fh,"Does (!) Exist in Data Base : ");
				$SumObj=json_encode($SumObj, true);
				echo $SumObj;
			}
			
			fclose($fh);
		}else{
			//echo $_POST["fld1"];
		}
?>
