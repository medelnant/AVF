/* ##############################################
Author: Michael Edelnant
Course: AVF 1306 | Week 1
Instructor: Jennifer McCarrick
############################################## */

var toBeDetermined = function() {
	/* Make it rain */
}


// http://api.espn.com/v1/sports/basketball/nba/news/headlines?_accept=text/xml&limit=5&apikey=:yourkey

$(document).ready(function() {
	var apiPath = "http://api.espn.com/v1/sports/news/headlines";
	var appWrapper =$('#appWrapper');
	
	$('#homeBtn').on('click', function(){
		$('.page').remove();
		$('.scrim').remove();
		$('#launchPage').removeClass('inactive');
	});
	
	$('#launchPage ul li a').on('click', function(){
		switch($(this).attr("data-section")) {
			case "video":
				break;
			case "twitter":
			  	break;
			case "espn":
			  	//alert('espn!')
				$('#launchPage').addClass('inactive');
				$('' +
					'<div class="scrim"></div>' +
					'<section class="page" id="espnNews">' +
						'<section class="appTitleMastHead">' +
							'<h1><span>ESPN Chicago Blackhawks News</spam></h1>' +
						'</section>' +
						'<ul class="listContainer"></ul>' +                            
					'</section>'
				).appendTo(appWrapper);
				
				$.ajax({
					url: "http://api.espn.com/v1/sports/hockey/nhl/teams/4/news",
					data: {
						apikey: 	"dk6z3rx49ru6breuud7wbnu4",
						_accept: 	"application/json"
					},
					dataType: "jsonp",
					success: function(dataObj) {
						$.each(dataObj.headlines, function(index, story) {
							console.log(story.headline);
							console.log(story.description)
							console.log("--")
							$('' + 
								'<li>' +
									'<h4>' + story.headline + '</h4>' +
									'<p>' + story.description + '</p>' +
								'</li>'
							).appendTo($('#espnNews .listContainer'));
						});				
					}
				});	

			  break;
				case "camera":
			  break;
				case "accelerometer":
			  break;
				case "compass":
			  break;
				case "geolocation":
			  break;
				case "research":
			  break;		  		  		  		  		  		
				default:
		  		// code to be executed if n is different from case 1 and 2
		}

	


	});

});