<?php		
		// Look of Data1 = {SumName_input:'input', ServerName_input: 'input'};
		$test=$_POST['Data1'];
		$fh = fopen("LogFile.txt", "a");
		$url="https://$test[ServerName_input].api.pvp.net/api/lol/euw/v1.4/summoner/by-name/$test[SumName_input]?api_key=fbe18d9e-025e-4b0a-a71a-c4844cbd4850";
		// CURL Request on Inputs
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_URL,$url);
		$result=curl_exec($ch);
		curl_close($ch);
		// Look of Result : {"mrgatzi":{"id":26558642,"name":"Mr Gatzi","profileIconId":786,"summonerLevel":30,"revisionDate":1434999965000}}
		// Decode Json String If the Summoner name  doesn't exist: Error!
		if($obj = json_decode($result, true)){
			fwrite($fh,"Sucess decode Input! Created : ");
			fwrite($fh,$obj[$test[SumName_input]]['name']);
		}else{
			fwrite($fh,"Error Summoner doesn't Exist");
		};
		
		fclose($fh);	
?>
