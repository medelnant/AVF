/* ##############################################
Author: Michael Edelnant
Course: AVF 1306 | Week 3
Instructor: Jennifer McCarrick
############################################## */


//WatchID placeholders for NativeAPI's
var compassInit = '';
var accelerometerInit = '';


function onDeviceReady() {
	
	/*########################################################
	Connection API : Check status of network connection
	########################################################*/
	
	var net = navigator.connection.type;
	if(net == "none") {
		$("#alertBanner").css("display","block");
	}
	
	/*########################################################
	End Connection API
	########################################################*/	
	
	//home btn actions
	$('#homeBtn').on('click', function(){
		
		$('.page').remove();
		$('#researchPage').hide();
		
		//Destroy Scrim
		$('.scrim').remove();

		//Reset Launch Page and remove blur
		$('#launchPage').removeClass('inactive');

		if(compassInit !== 0) {
			navigator.compass.clearWatch(compassInit);
		}

	});
	
	
	// If any of the navigation items are clicked
	$('#launchPage ul li a').on('click', function(){
		
		// listen for the data attribute and execute
		switch($(this).attr("data-section")) {
			
			
			/*########################################################
			Video Requirement
			########################################################*/
			case "video":
				setPageHeader('video','Vimeo Video');
				$('' +
					'<div id="videoPlaceHolder">' +
						'<video controls preload="auto" poster="" data-setup="{}">' +
							'<source src="https://dl.dropboxusercontent.com/u/146464/AVF/avf_week2.mp4" type="video/mp4">' +
							'<source src="https://dl.dropboxusercontent.com/u/146464/AVF/avf_week2.webm" type="video/mp4">' +
							'<source src="https://dl.dropboxusercontent.com/u/146464/AVF/avf_week2.ogv" type="video/mp4">' +
						'</video>' +											
					'</div>'
				).appendTo($('#video'));
				break;
			
			/*########################################################
			Instagram API Requirement
			########################################################*/
			case "instagram":
				setPageHeader('instagram', 'Sears Tower Photos');
				$('#instagram').append('<ul class="gridContainer"></ul>');

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
							).appendTo($('.gridContainer'));
						});											
					}
				});

			break;
			
			/*########################################################
			ESPN API 
			########################################################*/			
			case "espn":
				setPageHeader('espn', 'Sears Tower Photos');
				$('#espn').append('<ul class="listContainer"></ul>');

				// call data api and build
				$.ajax({
					url: "http://api.espn.com/v1/sports/hockey/nhl/teams/4/news",
					data: {
						apikey:"dk6z3rx49ru6breuud7wbnu4",
						_accept:"application/json"
					},
					dataType: "jsonp",
					success: function(dataObj) {
						
						// For each headlines returned
						$.each(dataObj.headlines, function(index, story) {
							console.log(story.headline);
							console.log(story.description);
							console.log("--");
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
							).appendTo($('.listContainer'));
						});				
					}
				});	

			break;
			
			/*########################################################
			Camera API 
			########################################################*/
			case "camera":

				setPageHeader('camera', 'Camera');
				$('' +
						'<article>' +
							'<div id="photoPlaceHolder">' +
								'<img src="" />' +
							'</div>' +							
							'<div class="btn btn_fullWidth" id="cameraBtn">Take Photo</div>' +
						'</article>' 
				).appendTo($('#camera'));

				var cameraOptions = {
					quality: 50, 
					destinationType: Camera.DestinationType.FILE_URI				
				};

				$('#cameraBtn').on('click', function() {
					navigator.camera.getPicture(onCameraSuccess, onCameraFail, cameraOptions);
				});
				 
				function onCameraSuccess(imageURI) {
					$('#photoPlaceHolder img')
						.attr('src', imageURI)
						.css('display', 'block');
				}

				function onCameraFail(message) {
					alert('Failed because: ' + message);
				}

			break;
			
			/*########################################################
			Accelerometer API 
			########################################################*/
			case "accelerometer":

				setPageHeader('accelerometer', 'Accelerometer');
				$('' +
						'<article>' +
							'<ul class="formList">' +
								'<li>' +
									'<label>X:</label>' +
									'<input type="text" id="accX" value="0" />' +
								'</li>' +
								'<li>' +
									'<label>Y:</label>' +
									'<input type="text" id="accY" value="0" />' +
								'</li>' +
								'<li>' +
									'<label>Z:</label>' +
									'<input type="text" id="accZ" value="0" />' +
								'</li>' +								
							'</ul>' +								
						'</article>' 
				).appendTo($('#accelerometer'));

				var accelerometerOptions = {
					frequency: 40
				};
				accelerometerInit = navigator.accelerometer.watchAcceleration(onAccelerometerSuccess, onAccelerometerError, accelerometerOptions );

				function onAccelerometerSuccess(acceleration) {
					$('#accX').attr('value', acceleration.x);
					$('#accY').attr('value', acceleration.y);
					$('#accZ').attr('value', acceleration.z);
				} 

				function onAccelerometerError(error) {
					navigator.compass.clearWatch(accelerometerInit);
					alert('Acceleration Not Found');
				}									

			break;
			
			/*########################################################
			Compass API 
			########################################################*/
			case "compass":
				setPageHeader('compassPage', 'Compass');
				$('' +
						'<article>' +
							'<div id="compass">' +
								'<div id="compassPointer"></div>' +
							'</div>' +														
						'</article>'
				).appendTo($('#compassPage'));

				var compassOptions = {
					frequency: 40
				};
				compassInit = navigator.compass.watchHeading(onCompassSuccess, onCompassError, compassOptions );

				function onCompassSuccess(heading) {
					var rotation = Math.round(heading.magneticHeading) + 'deg';
					$('#compassPointer').css('-webkit-transform', 'rotate('+ rotation +')');
				} 

				function onCompassError(error) {
					navigator.compass.clearWatch(compassInit);
					alert('Compass Not Found');
				}				
						
			
			break;
			
			/*########################################################
			Geolocation API 
			########################################################*/
			case "geolocation":

				setPageHeader('geolocation', 'Geolocation');
				
				$('' +
						'<article>' +
							'<ul class="formList">' +
								'<li>' +
									'<label>Lattitude:</label>' +
									'<input type="text" id="geoLat" value="0" />' +
								'</li>' +
								'<li>' +
									'<label>Longitude:</label>' +
									'<input type="text" id="geoLong" value="0" />' +
								'</li>' +
							'</ul>' +								
							'<div id="map"></div>' +
						'</article>' 
				).appendTo($('#geolocation'));	

				navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
				
				function onGeoSuccess(position) {
					
					lattitude = position.coords.latitude;
					longitude = position.coords.longitude;
					
					$('#geoLat').val(lattitude);
					$('#geoLong').val(longitude);
				
					var newPosition = new google.maps.LatLng(lattitude,longitude);
					
					var mapoptions = {
						zoom: 12,
						center: newPosition,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					
					var map = new google.maps.Map(document.getElementById('map'), mapoptions);
					
				
					var marker = new google.maps.Marker({
							position: newPosition,
							map: map
					});
				}
				
				function onGeoError(error) {
					if( error == 1) {
						alert('Turn on Geolocation services.');
					}
				}										

			break;
				
			/*########################################################
			Research API 
			########################################################*/			
			case "research":
				// set class on launchPage to init blur 
				$('#launchPage').addClass('inactive');

				// append scrim markup
				$('<div class="scrim"></div>').appendTo($('#appWrapper'));					
				
				//Toggle Show page
				$('.staticPage').show();
			break;
			default:
			// code to be executed if n is different from case 1 and 2
		}
	});
}


/*########################################################
Research Tabs 
########################################################*/
$('#researchPage li a').on('click', function(){
	$('.researchSection').hide();

	switch($(this).attr("data-section")) {
		case "week2":
			$('#researchWeek2').show();
		break;
		case "week3":
			$('#researchWeek3').show();
		break;
		case "week4":
			$('#researchWeek4').show();
		break;
		default:	
	}
});

/*########################################################
Utility Function used by all sections
########################################################*/
var setPageHeader = function(section, title) {
	// set class on launchPage to init blur 
	$('#launchPage').addClass('inactive');
	
	// append masthead markup with page title
	$('' +
		'<div class="scrim"></div>' +
		'<section class="page" id="'+ section +'">' +
			'<section class="appTitleMastHead">' +
				'<h1><span>'+ title +'</span></h1>' +
			'</section>' +                          
		'</section>'
	).appendTo($('#appWrapper'));	
};

//wait for device to signal ready
document.addEventListener("deviceready", onDeviceReady, false);


