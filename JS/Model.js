	function getData(done_fnc){
		event.preventDefault();
		var Data1 = {SumName_input:$('.SumName').val().toLowerCase(), ServerName_input:$('#ServName').val().toLowerCase()};
		var check =$.post("PHP/Cache_and_API_Request.php",{Data1});
		check.done(done_fnc)
		check.fail(function() {
			console.log( "Error while sendig to the database to create Data" );
		})
	}