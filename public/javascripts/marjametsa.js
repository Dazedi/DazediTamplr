var main = function(){
	$('.imgthumbnail').click( function() {
		var clickedSrc = $(this).attr('src');
		var image = document.getElementById('imgdisplay');
		image.src = clickedSrc;
		
		if( $(this).attr('id') == "spawn" ){
			document.getElementById("imgdesc").innerHTML = 'This is the game window. Pretty simple user interface, all of the buttons '
			+'can also be accessed by using shortcuts. On hovering over the buttons a tooltip appears which states the shortcut button.'
			+'Inside the drawing area you can see the spawn location. Four random generated lowest tier items spawn next to the spawn '
			+'location, from which the player can choose one. Upon picking an item, the rest will disappear. The door will lead outside '
			+'where the actual action happens. The player can end his turn at any point by clicking the end turn button. The player can '
			+'also save or load the game at any point of the game. The savefile is a simple .txt file.';
		} else if( $(this).attr('id') == "pickup" ){
			document.getElementById("imgdesc").innerHTML = 'Once the player picks up one of the four random items (hp potion, ap potion, boots, '
			+'knife...) the rest of the items will disappear and the player should move out of the cabin to continue his/her quest.';
		} else if( $(this).attr('id') == "house" ){
			document.getElementById("imgdesc").innerHTML = 'Each time player exits the cabin, the map is procedurally generated based '
			+'on premade templates. The template consists of 36 "slots" which each have a square. Some of these "slots" can also have '
			+'creature or item spawn location. The spawn locations are filled with the appropriate entities. The creatures will have '
			+'their own artificial intelligence and will move and act according to it.';
		} else if( $(this).attr('id') == "activate" ){
			document.getElementById("imgdesc").innerHTML = 'The player has only 3 inventory slots to make the game slightly more challenging '
			+'and to encourage the player to make the right choises. Some of the items can be activated with the activate button as long as '
			+'the player first clicks the item slot of the item he wants to activate. Items can also be dropped.';
		} else if( $(this).attr('id') == "inspect" ){
			document.getElementById("imgdesc").innerHTML = 'Below the inventory functionality there is a button for "INSPECT". Once the player '
			+'clicks this button, the inspect mode turns on and the player can click things to inspect them. For instance clicking a squirrel '
			+'will give out the description of the squirrel. In the case of the image, player has inspected a squirrel and you can see the '
			+'description in the bottom of the screen.';
		} else if( $(this).attr('id') == "dmg" ){
			document.getElementById("imgdesc").innerHTML = 'Once the player deals damage to a creature (or creature deals damage on player) '
			+'some blood splatters appear under the creature.';
		} else if( $(this).attr('id') == "kill" ){
			document.getElementById("imgdesc").innerHTML = 'If the creature dies, it will turn into a pool of blood.'
			+' ';
		} else if( $(this).attr('id') == "rks" ){
			document.getElementById("imgdesc").innerHTML = 'Sometimes the creatures attack each other. It depends on the creature AI. For '
			+'instance pretty much all the creatures are afraid of Satan creature and will not attack it.';
		} else if( $(this).attr('id') == "relic" ){
			document.getElementById("imgdesc").innerHTML = 'The relic is the item the player is after. The player needs to have a free '
			+'inventory slot in order to pick up the relic. It gives the player some useful stats as well as allows player to return to '
			+'the almighty cabin. Once the player returns the relic to the cabin, the game ends and the player wins.';
		} else if( $(this).attr('id') == "satan" ){
			document.getElementById("imgdesc").innerHTML = 'Upon picking up the relic, the satan or the devil will spawn, bringing rapture '
			+'with him and starts spreading lava around him.';
		} else if( $(this).attr('id') == "hell" ){
			document.getElementById("imgdesc").innerHTML = 'The initial lava spreads wide and it takes a while for satan to finish spreading '
			+'lava. If player walks on the lava he will take some damage.';
		} else if( $(this).attr('id') == "running" ){
			document.getElementById("imgdesc").innerHTML = 'Now that the satan\'s spawning and lava spreading "animation" has ended the player '
			+'can make a choise on whether to run for the cabin or just kill the satan. If the satan is killed, the player wins the game as well. ';
		} else if( $(this).attr('id') == "follow" ){
			document.getElementById("imgdesc").innerHTML = 'If the player decides to run, the satan will do everything in his power to follow, '
			+'catch and kill the player. Whenever the satan moves to a new square that is not lava, the square will turn into lava. ';
		} else if( $(this).attr('id') == "teleport" ){
			document.getElementById("imgdesc").innerHTML = 'If the player gets too far away from the satan or the satan gets somehow stuck, '
			+'he will teleport somewhere near the player and turns a small area around him into lava. ';
		} else if( $(this).attr('id') == "eek" ){
			document.getElementById("imgdesc").innerHTML = 'The satan can even turn water into lava. Also if at any point some other creature '
			+'gets in the way of the satan, he will kill it.';
		} else if( $(this).attr('id') == "victory" ){
			document.getElementById("imgdesc").innerHTML = 'The player has delivered the relic to the cabin and has won the game. Yey. Now the '
			+'game will reset and player will find himself inside the cabin again like in the first picture.';
		} else if( $(this).attr('id') == "creature" ){
			document.getElementById("imgdesc").innerHTML = 'This file initializes all the creatures. Adding new creatures is really easy.';
		} else if( $(this).attr('id') == "item" ){
			document.getElementById("imgdesc").innerHTML = 'This file initializes all the items.';
		} else if( $(this).attr('id') == "square" ){
			document.getElementById("imgdesc").innerHTML = 'This file initializes all the squares.';
		} else if( $(this).attr('id') == "template" ){
			document.getElementById("imgdesc").innerHTML = 'This file holds the information in order to create the templates. The map is then '
			+'created from these predetermined templates.';
		} else {
			document.getElementById("imgdesc").innerHTML = 'To be filled later';
		}
	});
};

$(document).ready(main);