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
//$Input_RequestData=$_POST['Data1'];
$postdata          = file_get_contents("php://input");
$Input_RequestData = json_decode($postdata);
$Input_RequestData = $Input_RequestData->data1;
//Check if the requested data is already in Cache
$SumObj            = $cache->get("{$Input_RequestData->SumName_input}_{$Input_RequestData->ServerName_input}_IDRequest");
if ($SumObj == null) {
    $url = "https://{$Input_RequestData->ServerName_input}.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/{$Input_RequestData->SumName_input}?api_key=13e2466b-c06a-4fb9-a782-724de53fb4c4";
    // CURL sends a request to the selected URL (=$url) and if the CURLOPT_RETURNTRANSFER option is set, it will return the result on success
    $ch  = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    $result = curl_exec($ch);
    curl_close($ch);
    // Decode Json String. If the Summoner doesn't exist. Error!
    if ($SumObj = json_decode($result)) {
        
    } else {
        
    }
    ;
    // Saves the Data in Cache for 1 minute
    $cache->set("{$Input_RequestData->SumName_input}_{$Input_RequestData->ServerName_input}_IDRequest", $SumObj, 60);
}
;
if ($SumObj != NULL) {
    // Get: Recent Games Played
    $Return->SumGames = $cache->get("{$Input_RequestData->SumName_input}_{$Input_RequestData->ServerName_input}_RecentGames");
    //Check if there are any recent games already in the cache
    if ($Return->SumGames == NULL) {
        $SumObj = json_encode($SumObj); // without this command it's not working
        $SumObj = json_decode($SumObj);
        $test1  = $SumObj->{$Input_RequestData->SumName_input}->id;
        $url    = "https://{$Input_RequestData->ServerName_input}.api.pvp.net/api/lol/euw/v1.3/game/by-summoner/$test1/recent?api_key=13e2466b-c06a-4fb9-a782-724de53fb4c4";
        // CURL sends a request to the selected URL (=$url) and if the CURLOPT_RETURNTRANSFER option is set, it will return the result on success
        $ch     = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        $result = curl_exec($ch);
        curl_close($ch);
        $result           = json_decode($result);
        $Return->SumGames = $result;
        //Saving the recent games in the cache
        $cache->set("{$Input_RequestData->SumName_input}_{$Input_RequestData->ServerName_input}_RecentGames", $Return->SumGames, 60);
    }
}
$Return->SumInfo = $SumObj;
echo json_encode($Return);
?>