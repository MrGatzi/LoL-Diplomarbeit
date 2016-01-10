<?php
/*
Funtion: if: Requested Data is already in Cache 
false: Create ULR with the right inputs. Send a request at that URL. Save the data in the Cache and send it also back to the requesting JS-file
true : Send data from the Cache to the requesting JS-file
Inputs : <Summoner Name> and <Server>
Outputs:  <{"<Summoner Name ignoreCase>":{"id":12345678,"name":"<Summoner Name>","profileIconId":123,"summonerLevel":30,"revisionDate":1434999965000}}>


Variables : $Input_RequestData : {SumName_input:'input', ServerName_input: 'input'};
$SumObj : {"<Summoner Name ignoreCase>":{"id":12345678,"name":"<Summoner Name>","profileIconId":123,"summonerLevel":30,"revisionDate":1434999965000}}
*/

// Include PHP FAST CACHE
require_once("../Libraries/phpfastcache/phpfastcache.php");
phpFastCache::setup("storage", "auto");
$cache = phpFastCache();
//Check if there are input parameters entered (<Summoner Name> and <Server>)
class ReturnClass
{
    public $SumInfo;
    public $SumGames;
}
$Return            = new ReturnClass();
//Check if the requested data is already in Cache
$SumObj            = $cache->get("Item_Request_Lib");
if ($SumObj == null) {
    $url = "https://global.api.pvp.net/api/lol/static-data/euw/v1.2/item?itemListData=from&api_key=13e2466b-c06a-4fb9-a782-724de53fb4c4";
    // CURL sends a request to the selected URL (=$url) and if the CURLOPT_RETURNTRANSFER option is set, it will return the result on success
    $ch  = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	//curl_setopt($ch, CURLOPT_ENCODING ,"");
    curl_setopt($ch, CURLOPT_URL, $url);
    $result = curl_exec($ch);
    curl_close($ch);
	$result=json_decode($result);
    // Saves the Data in Cache for 1 minute
    $cache->set("Item_Request_Lib", $result, 86000);
	$SumObj=$result;
};
$SumObj=json_encode($SumObj);
$SumObj = str_replace("<\/","</",$SumObj);
$SumObj = str_replace("<br>","",$SumObj);
echo $SumObj;

?>