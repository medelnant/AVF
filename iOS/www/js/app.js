/* ##############################################
Author: Michael Edelnant
Course: AVF 1306 | Week 1
Instructor: Jennifer McCarrick
############################################## */


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
			case "instagram":
				$('#launchPage').addClass('inactive');
				$('' +
					'<div class="scrim"></div>' +
					'<section class="page" id="instagram">' +
						'<section class="appTitleMastHead">' +
							'<h1><span>"SearsTower" Tagged Photos on Instagram</span></h1>' +
						'</section>' +
						'<ul class="gridContainer"></ul>' +                            
					'</section>'
				).appendTo(appWrapper)

				$.ajax({
					url: "https://api.instagram.com/v1/tags/searstower/media/recent?callback=&amp=&client_id=c4bbe8fde6634c99840a3a1249435e91",
					dataType: "jsonp",
					success: function(dataObj) {
						// console.log(dataObj.data)
						$.each(dataObj.data, function(index, item) {
							console.log(item);
							console.log("------")
							$('' +
								'<li>' +
									'<article>' +
										'<div>' +
											'<img src="' + item.images.thumbnail.url + '" alt="'+ item.caption.text +'" />' +
											'<i>'+ item.likes.count +'  ♥ </i>' +
											'<span>' +
												'<a href="http://www.instagram.com/'+ item.user.username +'" target="_system">' +
													'<strong>'+ item.user.username +'<strong></span>' +
												'</a>' +
										'</div>' +
									'</article>' +
								'</li>'
							).appendTo($('#instagram .gridContainer'));
						});												
					}
				});

			  	break;
			case "espn":
			  	//alert('espn!')
				$('#launchPage').addClass('inactive');
				$('' +
					'<div class="scrim"></div>' +
					'<section class="page" id="espnNews">' +
						'<section class="appTitleMastHead">' +
							'<h1><span>ESPN Chicago Blackhawk News</span></h1>' +
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
									'<a href="'+ story.links.web +'" class="more" target="_blank">' +
										'Read More' +
									'</a>' +
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