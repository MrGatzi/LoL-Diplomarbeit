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
			alert(response);
		})
		check.fail(function() {
			console.log( "Error while sendig to the database to create Data" );
		})
	});
});