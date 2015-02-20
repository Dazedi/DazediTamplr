var main( function(){
	$(document).click( function() {
		var strVar="";
	strVar += "<div class=\"container\">";
	strVar += "				<ul class=\"pull-left\">";
	strVar += "					<li><a href=\"index.html\">Front Page<\/a><\/li>";
	strVar += "					<li><a href=\"#\">Dazedi<\/a><\/li>";
	strVar += "					<li><a href=\"cattax.html\">Cat Tax Gallery<\/a><\/li>";
	strVar += "				<\/ul>";
	strVar += "				<ul class=\"pull-right\">";
	strVar += "					<li><a href=\"http:\/\/steamcommunity.com\/id\/Dazedi\/\">My Steam<\/a><\/li>";
	strVar += "					<li class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle\">Projects<\/a>";
	strVar += "						<ul class=\"dropdown-menu\">";
	strVar += "							<li><a href=\"webohjelmointi.html\">Web-ohjelmointi<\/a><\/li>";
	strVar += "							<li><a href=\"#\">Tietorakenteet ja algoritmit<\/a><\/li>";
	strVar += "							<li><a href=\"projects.html\">Own tests and stuff<\/a><\/li>";
	strVar += "						<\/ul>";
	strVar += "					<\/li>";
	strVar += "					<li><a href=\"#\">Contact<\/a><\/li>";
	strVar += "				<\/ul>";
	strVar += "			<\/div>";
	
	$(strVar).appendTo('#oneNav');
	});
	
});

$(document).ready(main);