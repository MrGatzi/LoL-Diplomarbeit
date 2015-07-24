var first;
var data;
   $(document).ready(function() {
	// function if button "hit-it" is pressed
    $("#Hit_it").button().on("click", function() {
		getData(function(response) {
			console.log( "success_new" );
			// Test-Subjekt to show some data
			alert(response);
			var show=JSON.parse(response);
			var test1=$('.SumName').val().toLowerCase();
			$( "#show_test" ).append("Your SummonerID is : "+show.SumInfo[test1].id+"\n");
			$( "#show_test" ).append("The Last Game ID : "+show.SumGames.games[1].gameId+"\n");
			$( "#show_test" ).append("The Last Game you Played was an : "+show.SumGames.games[1].gameMode+"\n");
			$( "#show_test" ).append("<a href='GameOverview.php?SumName="+$('.SumName').val().toLowerCase()+"&SumServer="+$('#ServName').val().toLowerCase()+"&RecentGame=0'>Game1</a>");
			
		});
	});
});