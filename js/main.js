var map;
let devices = ["computer", "television", "refrigerator"];
function initMap() {
map = new google.maps.Map(document.getElementById('mapbox'), {
  center: {lat: -34.397, lng: 150.644},
  zoom: 10
});
}

let el = document.getElementById("selectbox");

el.addEventListener('click', (event) => {
	console.log('click:', event.target);
	let deviceId =  event.target.id;
	var reg = /\d+/g;
		let deviceNumber = Number(deviceId.match(reg));

	if(deviceNumber != 0 ){
		console.log('clicked:', devices[deviceNumber - 1]);
	}
});