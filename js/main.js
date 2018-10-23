var map, infoWindow;
let appliances = ["computer", "television", "refrigerator"];
let devicesPower ={"computer":70, "television":80, "refrigerator": 200};


let powerSection = document.getElementById('total');
let total = 0 ;
//total power of appliances
function power(num, process) {
	if(process == 1) {

		total =  total + num;

	} else {
		total = total - num;
	}
	powerSection.innerHTML = total + ' W';
	console.log('total',total);
	return total;
}

let el = document.getElementById("selectbox");

let clickCount = 0;
let checkedElement ;

el.addEventListener('click', (event) => {

	console.log('click:', event);
	let deviceId =  event.target.id;

	var reg = /\d+/g;
    let deviceNumber = Number(deviceId.match(reg));
    //control check status if process is unchecking power must be decreased
    if(document.getElementById(deviceId).checked != false ) {
		document.getElementById(deviceId).setAttribute("checked", "checked");

	} else {
		document.getElementById(deviceId).removeAttribute("checked");
		power(devicesPower[appliances[deviceNumber - 1]],0)
	}

    console.log('befrore click:', checkedElement);
	if(deviceNumber != 0  && document.getElementById(deviceId).checked == true){

		checkedElement = appliances[deviceNumber - 1];
		console.log('clicked:',devicesPower[appliances[deviceNumber - 1]], checkedElement);
		power(devicesPower[appliances[deviceNumber - 1]],1);
	}

});
function initMap() {

map = new google.maps.Map(document.getElementById('mapbox'), {
  center: {lat: -34.397, lng: 150.644},
  zoom: 10

});

 infoWindow = new google.maps.InfoWindow;

 if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
}
