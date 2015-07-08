var first;
var data;
   $(document).ready(function() {
	// function if button "hit-it" is pressed
     $("#Hit_it").button().on("click", function() {
		event.preventDefault();
		var Data1 = {SumName_input:$('#SumName').val().toLowerCase(), ServerName_input:$('#ServName').val().toLowerCase()};
		var check =$.post("PHP/Cache_and_API_Request.php",{Data1});
		check.done(function(response) {
			console.log( "success_new" );
			// Test-Subjekt to show some data
			var show=JSON.parse(response);
			var test1=$('#SumName').val().toLowerCase();
			$( "#show_test" ).append("Your SummonerID is : "+show.SumInfo[test1].id+"\n");
			$( "#show_test" ).append("The Last Game ID : "+show.SumGames.games[1].gameId+"\n");
			$( "#show_test" ).append("The Last Game you Played was an : "+show.SumGames.games[1].gameMode+"\n");
			
			
		})
		check.fail(function() {
			console.log( "Error while sendig to the database to create Data" );
		})
	});
});