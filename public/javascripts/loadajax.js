var main = function(){
	$.get('http://localhost:3000/api/blogs/1/posts', function(data, status){
        alert("Data: " + data + "\n Status: " + status);
    });
}

$(document).ready(main);


