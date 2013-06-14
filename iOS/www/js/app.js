/* ##############################################
Author: Michael Edelnant
Course: AVF 1306 | Week 1
Instructor: Jennifer McCarrick
############################################## */


// http://api.espn.com/v1/sports/basketball/nba/news/headlines?_accept=text/xml&limit=5&apikey=:yourkey
document.addEventListener("deviceready", onDeviceReady, false);

//wait for device to signal ready
function onDeviceReady() {
// $(document).ready(function() {	
	
	//home btn actions
	$('#homeBtn').on('click', function(){
		if($('.page').attr('id') === 'researchPage') {
			$('.page').hide();
		} else {
			$('.page').remove();
		}
		
		//Destroy Scrim
		$('.scrim').remove();

		//Reset Launch Page and remove blur
		$('#launchPage').removeClass('inactive');
	});
	
	
	// If any of the navigation items are clicked
	$('#launchPage ul li a').on('click', function(){
		
		// listen for the data attribute and execute
		switch($(this).attr("data-section")) {
			
			case "video":
				break;
			
			case "instagram":

				// set class on launchPage to init blur 
				$('#launchPage').addClass('inactive');
				
				// append masthead markup with page title
				$('' +
					'<div class="scrim"></div>' +
					'<section class="page" id="instagram">' +
						'<section class="appTitleMastHead">' +
							'<h1><span>"SearsTower" Tagged Photos on Instagram</span></h1>' +
						'</section>' +
						'<ul class="gridContainer"></ul>' +                            
					'</section>'
				).appendTo($('#appWrapper'));

				// call data api and build
				$.ajax({
					url: "https://api.instagram.com/v1/tags/searstower/media/recent?callback=&amp=&client_id=c4bbe8fde6634c99840a3a1249435e91",
					dataType: "jsonp",
					success: function(dataObj) {
						// console.log(dataObj.data)
						
						// For each post/image returned
						$.each(dataObj.data, function(index, item) {
							$('' +
								'<li>' +
									'<article>' +
										'<div>' +
											'<img src="' + item.images.thumbnail.url + '" alt="'+ item.caption.text +'" />' +
											'<i>'+ item.likes.count +'  ♥ </i>' +
											'<span>' +
												'<a href="http://www.instagram.com/'+ item.user.username +'" target="_system">' +
													item.user.username +
												'</a>' +
											'</span>' +
										'</div>' +
									'</article>' +
								'</li>'
							).appendTo($('#instagram .gridContainer'));
						});												
					}
				});

			break;
			
			case "espn":
			  	
			  	// set class on launchPage to init blur
				$('#launchPage').addClass('inactive');

				// append masthead markup with page title
				$('' +
					'<div class="scrim"></div>' +
					'<section class="page" id="espnNews">' +
						'<section class="appTitleMastHead">' +
							'<h1><span>ESPN Chicago Blackhawk News</span></h1>' +
						'</section>' +
						'<ul class="listContainer"></ul>' +                            
					'</section>'
				).appendTo(appWrapper);
				
				// call data api and build
				$.ajax({
					url: "http://api.espn.com/v1/sports/hockey/nhl/teams/4/news",
					data: {
						apikey: 	"dk6z3rx49ru6breuud7wbnu4",
						_accept: 	"application/json"
					},
					dataType: "jsonp",
					success: function(dataObj) {
						
						// For each headlines returned
						$.each(dataObj.headlines, function(index, story) {
							console.log(story.headline);
							console.log(story.description)
							console.log("--")
							$('' + 
								'<li>' +
									'<article>' +
										'<div>' +
											'<h4>' + story.headline + '</h4>' +
											'<p>' + story.description + '</p>' +
											'<a href="'+ story.links.web +'" class="more" target="_blank">' +
												'Read More' +
											'</a>' +
										'</div>' +
									'</article>' +
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
				// set class on launchPage to init blur 
				$('#launchPage').addClass('inactive');

				// append scrim markup
				$('<div class="scrim"></div>').appendTo($('#appWrapper'));					
				
				//Toggle Show page
				$('#researchPage').show();
			break;		  		  		  		  		  		
			default:
			// code to be executed if n is different from case 1 and 2
		}

	});

};