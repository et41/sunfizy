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
  zoom:20,
  gestureHandling: "cooperative"


});

 infoWindow = new google.maps.InfoWindow;

 if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            /*infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);*/
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
    google.maps.event.addListener(map, "click", function (event) {
	    var latitude = event.latLng.lat();
	    var longitude = event.latLng.lng();
	    console.log( latitude + ', ' + longitude );
	});
}

let mapEl = document.getElementById("mapbox");

function createDot(count) {

	console.log("in create Dot", count);
	let main = document.getElementById("main");
	const span = document.createElement('span');
	span.id = "dot"+count;
	span.classList.add("dot");
	main.appendChild(span);

}

let a = 0;
let dotArr = [];
mapEl.addEventListener('click', (event) => {
console.log('map', map.gestureHandling);
	map.gestureHandling = "none";
	createDot(a);

	console.log(event);
	let dot = document.getElementById("dot"+a);
	dot.style.display = "inline-block";
	dot.style.visibility = "visible";
	dot.style.top = `${event.clientY}px`;
	dot.style.left = `${event.clientX}px`;
	dot.style.zIndex = "1000";

	dotArr.push([event.clientX,event.clientY]);
	console.log('dotarr',dotArr);
	a++;

	//if(a % 2 == 0) {
	if(a != 0) {
		createLine(dotArr);
	}

});

let lineCount = 0;
createLine = (arr) => {
	let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

	/*svg.setAttribute("height",100 );
	svg.setAttribute("width",100 );
	svg.style.zIndex = "1000";
	svg.style.top = "0";
	svg.style.left = "0";*/
	svg.setAttribute("height",Math.abs(arr[lineCount+1][1] - arr[lineCount][1])+ 3 );
	svg.setAttribute("width",Math.abs(arr[lineCount+1][0] - arr[lineCount][0]) + 3 );
	svg.id = 'lineSection' + lineCount ;
	let main = document.getElementById("main");
	main.appendChild(svg);

	let line1 = document.createElementNS('http://www.w3.org/2000/svg','line');

	line1.id = "line"
	console.log('line1', line1);

	let lineSection = document.getElementById("lineSection" + lineCount );

	lineSection.style.top =Math.min(arr[lineCount][1],arr[lineCount+1][1]) +"px";
	lineSection.style.left =Math.min(arr[lineCount][0],arr[lineCount+1][0]) + "px";
	//determine line position
	if(arr[lineCount][1] < arr[lineCount + 1][1] && arr[lineCount][0] > arr[lineCount + 1][0] ) { //x1>x2 y1 < y2
		line1.setAttribute("x1",3);
		line1.setAttribute("y1",Math.abs(arr[lineCount+1][1] - arr[lineCount][1]));

		line1.setAttribute("x2",Math.abs(arr[lineCount+1][0] - arr[lineCount][0]));
		line1.setAttribute("y2",3);
	} else if (arr[lineCount][1] > arr[lineCount + 1][1] && arr[lineCount][0] < arr[lineCount + 1][0]) { // x1<x2 y1>y2
		line1.setAttribute("x1",3);
		line1.setAttribute("y1",Math.abs(arr[lineCount+1][1] - arr[lineCount][1]));

		line1.setAttribute("x2",Math.abs(arr[lineCount+1][0] - arr[lineCount][0]));
		line1.setAttribute("y2",3);
	} else if(arr[lineCount][1] > arr[lineCount + 1][1] && arr[lineCount][0] < arr[lineCount + 1][0]) {// x1>x2 y1>y2
		line1.setAttribute("x1",Math.abs(arr[lineCount+1][0] - arr[lineCount][0]));
		line1.setAttribute("y1",Math.abs(arr[lineCount+1][1] - arr[lineCount][1]));

		line1.setAttribute("x2", 3);
		line1.setAttribute("y2",3);
	} else {
		line1.setAttribute("x1",Math.abs(arr[lineCount+1][0] - arr[lineCount][0]));
		line1.setAttribute("y1",Math.abs(arr[lineCount+1][1] - arr[lineCount][1]));

		line1.setAttribute("x2", 3);
		line1.setAttribute("y2",3);
	}


	//lineSection.setAttribute("height",Math.abs(arr[lineCount+1][1] - arr[lineCount][1])+ 3 );
	//lineSection.setAttribute("width",Math.abs(arr[lineCount+1][0] - arr[lineCount][0]) + 3 );

	lineSection.appendChild(line1);
	lineCount++;

}
