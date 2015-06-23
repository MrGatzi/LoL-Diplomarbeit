var first;
   $(document).ready(function() {
	// function if button "hit-it" is pressed
     $("#Hit_it").button().on("click", function() {
		// anfrage sting erzeugen mit SUmmoner name input und Server Name
		first='https://'+ServName.value+'.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/'+SumName.value+'?api_key=fbe18d9e-025e-4b0a-a71a-c4844cbd4850'
		// abfrage Json Sting
		$.ajaxSetup({ cache: false });
			var data;
			$.ajax({
				type: "GET",
				url:first,
				data: data,	
				dataType: 'json',
				success: function(data) {
					var SumName_ubergabe="LOL";
					// summername bekommen um die ID auszugeben
					SumName_ubergabe=$('#SumName').val().toLowerCase();;
					alert(" Your Summoner ID is : "+data[SumName_ubergabe].id);
				},
				// Fehler wenn anfrage gescheitert
				error: function(xhr, status, error) {
					alert("Your Summoner wasn't found!");
				}
			});	
		 });
	});
	/* Function :
		Inout:
		out*/