<?php	
		require_once("../Libraries/phpfastcache/phpfastcache.php");
		phpFastCache::setup("storage","auto");
		$cache = phpFastCache();
		 $cache->clean();

?>
