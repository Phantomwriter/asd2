
////////////////////////////////////////////////////////////////////////
// Jquery mainjs
// Gameworld Ap                 
// Howard Livingston
// GOLD VERSION
// ASD-11/2012
// Marianne Sheldon

////////////////////////////////////////////////////////////////////////


/*---------------preparing the dom----------------*/

/*
///////////////////////////////////WEEK 1///////////////////////////////



Refactored code into jquery

Currently, 

Save and delete data have functionality.

Populating form data, populating JSON dummy data and edit/delete are non-functional




*////////////////////////////////////////////////////////////////////////

//Click Events for Sign-up Page
		var saveData =$('submit');
			saveData.on("click");

		var getData =$('showMem')
			getData.on("click");

		var displayLink = $('displayLink');
			displayLink.on("click", getData);

		var clearLink =$('#clear');
			clearLink.on("click", clearLocal);
//page-ready for Home page
$('#home').on('pageinit', function(){
		console.log("Home page loaded!");
});

//page-ready for Sign-up page
$('#signUpPage').on('pageinit', function(){
		console.log("Sign up loaded!");
	var signUpForm = $('#signUpForm'),
		signUpErrorsLink = $('#signUpErrorsLink');
		signUpForm.validate({
			invalidHandler: function(form, validator){
			signUpErrorsLink.click();
			var html = '';
			for(var key in validator.submitted){
				var label= $('label [for^="'+ key +'"]').not('[generated]');
				var legend = label.closest('fieldset').find('.ui-controlgroup-label');
				var fieldName = legend.length ? legend.text() : label.text();
				html += '<li>'+ fieldName +'</li>';
				};
			$("signUpPageErrors ul").html(html);
			},
			submitHandler: function(){
	var data = signUpForm.serializeArray();
			saveData(data);
		} 
	}	
	);
	
	
//Save Data function
	var saveData= function(data){
			var id=Math.floor(Math.random()*100000001);
		console.log(data);

		var item            ={};
			item.fname		=['First Name:', $('#fname').value];
			item.lname		=['Last Name:', $('#lname').value];
			item.pword		=['Password:', $('#pword').value];
			item.cpword		=['Confirm Password:', $('#cpword').value];
			item.email		=['Email:', $('#email').value];
			item.friends    =['I have:', $('#quantity').value];
			item.day		=['Day:', $('#day').value];
			item.month		=['Month:', $('#month').value];		
			item.year		=['year:', $('#year').value];		
			item.comments   =['comments', $('#comments').value];

				localStorage.setItem(id, JSON.stringify(item));
					alert("Information is saved!");	


} 	
	});

//Populate Data
var populateData = function(){
	for (var n in json){
    		var id = Math.floor(Math.random()*100000001);
    			localStorage.setItem(id, JSON.stringify(json[n]));
    	alert("It filled the data");
    	}
    };

//Get data
var getData= function(){
	
		if(localStorage.length === 0){
				alert("There's no Data in Local Storage so default data was entered");
				poplulateData();
	}
		var makeDiv = $('<div id="items"></div>');
			makeDiv.appendTo('#showMembers');
		var makeList = $('<ul>');
			makeList.addClass("showMem").appendTo('#items');
	
		for (var i=0, len=localStorage.length; i<len;i++){
		var eachMember =$('<li>');
			eachMember.addClass('eachMember').appendTo('showMem');
		var linksLi= $('<li>');
		var key=localStorage.key(i);
		var value=localStorage.getItem(key);
		var obj=JSON.parse(value);
		var makeSubList=$('<ul id="each"></ul>');
			makeSubList.appendTo('eachMember');
			getImage(obj.member[1], makeSubList);
		for (var n in obj){
			var makeSubLi=$('<li>');
			var optSubText=obj[n][0] + " " + obj[n][1];
				makeSubli.appendTo('#each')
					.HTML(optSubText);
				linkLi.appendTo('#each');
		}
		makeItemLinks(localStorage.key(i), linksLi); 
	}
}

//Edit item
var editItem= function(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
			$('#fname').val(item.fname[1]);
			$('#lname').val(item.lname[1]);
			$('#pword').val(item.pword[1]);
			$('#cpword').val(item.cpword[1]);
			$('#email').val(item.email[1]);
			$('#deviceValue').val(item.deviceValue[1]);
  			$('#friends').val(item.friends[1]);
  			$('#groups').val(item.groups[1]);
			$('#day').val(item.day[1]);
			$('#month').val(item.month[1]);
			$('#year').val(item.year[1]);
  		var radios=$('#deviceValue').val();
		for (var i=0; i<radios.length; i++){
			if(radios[i].val() == "CellPhone" && item.deviceValue[1] =="CellPhone"){
				radios[i].attr("checked","checked");
			}else if($(radios[i]).val() =="Tablet" && item.deviceValue[i] == "Tablet"){
				radios[i].attr("checked","checked");
			}
}
		
			var editSubmit = $('#submit');
				editSubmit.off("click", validate);
				editSubmit.val("editContact");
				editSubmit.on("click", saveData);
				editSubmit.key = this.key;
}
		
//Delete Item	
var deleteItem = function (){
		var ask = confirm("R U sure U want 2 delete the content?");
		if(ask){
			localStorage.removeItem(this.key);
				alert("Deleted successfully!");
					window.location.reload();
					return false;
}
}

//Clear local storage
function clearLocal(){
		if(localStorage.length === 0){
			alert("There's no data to clear!");
		}else{
			localStorage.clear();
				alert("All contacts are deleted!");
				window.location.reload();
					return false;
	}
}	

//Get the radio button data			
var deviceValues = function() {
        var radios = $('input:radio[name=deviceValue]:checked').val();
			return radios;
}

//ajax error callback
$.ajaxSetup({
	timeout: 10000,
	error: function(err) {
		console.log("error", err)
	
	}

});


//creating a list of json data 
$('#weaponsPage').on('pageinit', function(){
    console.log("weapons page ready to create weapons list!");
    $('#weaponsList').empty();
        console.log("weapons list cleared!");
    //$('<li>').html('json').appendTo('#weaponsList');
    $.ajax({
            url:'xhr/weapons.json',
            type:'GET',
            dataType:'json',
            success: function(response){
            console.log(response);
            for(var i=0, j=response.weapons.length; i<j; i++){
                var weap = response.weapons[i];
                console.log(weap.name);
                $(''+
                    '<li class="weapons">'+
                        '<h2>'+ weap.name +'</h2>'+
                            '<p>' + weap.origin +'</p>'+
                            '<p>' + weap.type +'</p>'+
                            '<p>' + weap.maker +'</p>'+
                            '<p>' + weap.link +'</p>'+
                            '<p>' + weap.description +'</p>'+
                    '</li>'
                ).appendTo('#weaponsList');
                $("#weaponsList").listview('refresh');
                
            };
            
        }
    
    });

});


//xml data
 $('#xmlPage').on('pageinit', function(){
 	console.log("xml Page loaded!");
 	
 $.ajax({
 	type: "GET",
 	url: "xhr/weapons.xml",
 	dataType: "xml",
 	success: function(xml){
                       console.log(xml);
                       $(xml).find("weapon").each(function(){
						var name = $(this).find('name').text();
						var origin = $(this).find('origin').text();
						var type = $(this).find('type').text();
						var maker = $(this).find('maker').text();
						var link = $(this).find('link').text();
						var description = $(this).find('description').text();
						console.log("got xml data!");
						console.log(name);
						   

                            $(''+
								  '<li class="xmlWeapon">'+
										'<h2>name:'+ name +'</h2>'+
										'<p>origin:'+ origin +'</p>'+
										'<p>type:'+ type +'</p>'+
										'<p>maker:'+ maker +'</p>'+
										'<p>link:'+ link +'</p>'+
										'<p>description:'+ description +'</p>'+
								   '</li>'
                                 ).appendTo('#xmlWeapon');
                                 $("#xmlWeapon").listview('refresh');
                 	  });
				 }
		});
		});





//page-ready for OnLine games Page
$('#onlineGames').on('pageinit', function(){
	console.log("onlineGames page loaded!");
});

//page-ready for Console Game Page
$('#consoleGames').on('pageinit', function(){
	console.log("Console Game Page loaded!");
});

//page-ready for Phone App Page
$('#phoneApps').on('pageinit', function(){
	console.log("Phone App  page loaded!");
});

//page-ready for Card Game Page
$('#cardGames').on('pageinit', function(){
	console.log("card Game  page loaded!");
});

//page-ready for Manual Games Page
$('#manualGames').on('pageinit', function(){
	console.log("Manual Games page loaded!");
});

//page-ready for About Gameworld Page
$('#about').on('pageinit', function(){
	console.log("About Gameworld page loaded!");
});

//page-ready for My page
$('#myPage').on('pageinit', function(){
	console.log("My page loaded!");
});

//page-ready for Deals page
$('#dealsPage').on('pageinit', function(){
	console.log("Deals page loaded!");
});

//page-ready for News Stream page
$('#news').on('pageinit', function(){
	console.log("News Stream page loaded!");
});

//page-ready for Sign up form validator page
$('#signUpPageErrors').on('pageinit', function(){
	console.log("Sign up form validator page loaded!");
});

//page-ready for 404 page
$('#errorPage').on('pageinit', function(){
	console.log("404 Page loaded!");
});
























