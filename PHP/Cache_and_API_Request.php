<?php		
		
		$test=$_POST['test1'];
		$fh = fopen("Logfile.txt", "a");
		$test=utf8_decode($test);
		if($test=json_decode($test,true)){
			fwrite($fh,"Sucess decode Input! Created : ");
			fwrite($fh,$test['id']);
		}else{
			fwrite($fh,"EROR decoding Input !");
		};
		
?>