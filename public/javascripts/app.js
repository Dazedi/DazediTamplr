var main = function(){
	$('.dropdown-toggle').click(function() {
		$('.dropdown-menu').toggle();
	});
	
	$(document).click( function(event) {
		if( $(event.target).closest('.dropdown-menu, .dropdown-toggle').length === 0 ){
			$('.dropdown-menu').hide();
		}
	});
}

$(document).ready(main);