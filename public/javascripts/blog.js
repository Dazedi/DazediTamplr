function toggleNewPost(){
	$('#toggleNewPost').click( function() {
		$('#middle').removeClass('.col-xs-6', 200);
		if( $('#sidebar').hasClass('.col-xs-3') ){
			$('#sidebar').removeClass('.col-xs-3', 200);
			$('#sidebar').addClass('.col-xs-9',200);
			$('#middle').removeClass('.col-xs-6', 200);
			//$('#middle').addClass('.col-xs-6', 200);
		} else {
			
		}
	});
};