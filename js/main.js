var map, infoWindow;
let appliances = ["computer", "television", "refrigerator"];
let devicesPower ={"computer":[70,0], "television":[80,0], "refrigerator": [200,0]};


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

/*el.addEventListener('click', (event) => {

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

});*/

el.addEventListener('click', (event) => {

	console.log('click:',  event.target.id);
	let deviceId =  event.target.id;

	var reg = /\d+/g;
    let deviceNumber = Number(deviceId.match(reg));
    let checkBox = document.getElementById('checkbox' + deviceNumber);
    if(deviceId.includes('plus')) {
    	//sum
    	power(devicesPower[appliances[deviceNumber - 1]][0],1);
    	devicesPower[appliances[deviceNumber - 1]][1] = devicesPower[appliances[deviceNumber - 1]][1] + 1;
    	console.log('devicesPower', devicesPower);
    	checkBox.value = devicesPower[appliances[deviceNumber - 1]][1];
    } else if(deviceId.includes('minus') && devicesPower[appliances[deviceNumber - 1]][1] != 0 ) {
    	//differentiate
    	power(devicesPower[appliances[deviceNumber - 1]][0],0);
		devicesPower[appliances[deviceNumber - 1]][1] = devicesPower[appliances[deviceNumber - 1]][1] - 1;
    	checkBox.value = devicesPower[appliances[deviceNumber - 1]][1];

    }


    if(event.target.id.includes('checkbox')) {
    	console.log('checkedBox',checkBox.value);
    }

});


function initMap() {

map = new google.maps.Map(document.getElementById('mapbox'), {
  center: {lat: -34.397, lng: 150.644},
  zoom:20,
  gestureHandling: "cooperative",
  clickableIcons: false,
  mapTypeControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
  }

});

 infoWindow = new google.maps.InfoWindow({
 	  disableAutoPan: true

 });
 console.log('gooooogle:',google.maps);
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

	//search box creation
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
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

createFirstDotCircle =   (arr) => {

	return new Promise (function(resolve,reject){
		const span = document.createElement('label');
		let first = document.getElementById('dot0');
		span.id = "dotCircle";
		/*span.style.top = arr[1];
		span.style.left = arr[0];*/
		first.appendChild(span);
		console.log('promise');
		console.log('RESOLVE',resolve);
		resolve('GEEEEET');
		});
};

let a = 0;
let dotArr = [];
let firstDot = [];

mergeDots = (arr) => {
	console.log('mergeeeeeDOOOOTS', firstDot,dotArr);
	/*dotArr[2][0] = arr[0][0];
	dotArr[2][0] = arr[0][1];*/
	dotArr.push([arr[0][0],arr[0][1]]);
	console.log('arr', dotArr);
	createLine(dotArr);
};

let mapArea = document.getElementById('mapAreaSelect');
let mapAreaClickCount = 0;

mapArea.addEventListener('click', (event) => {
	console.log('mapAreaClickCount',mapAreaClickCount);

	if(mapAreaClickCount == 0 || mapAreaClickCount % 2 ==0) {
		activateSelectTool();
	}
	else {

		deactivateSelectTool();

	}

	mapAreaClickCount++;

});

dotManagement = () => {
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
	//store first dots coordinate to make a circle which is going to emerge with last dot that have been drawn near to the fisrt dot.
	if(a == 0) {
		firstDot[0] = [event.clientX,event.clientY];

		createFirstDotCircle(firstDot).then(function(e) {
			console.log('eeeeee',e);
			console.log('SUCCESSSsssssssss');//
			document.getElementById('dotCircle').addEventListener('click',e => {
			console.log('CLLLLICKKK');
			mergeDots(firstDot);
			});
		},function(err) {
			console.log('ERRRORR',err);
		});

	}
	console.log('dotarr',dotArr,firstDot);

	a++;

	//if(a % 2 == 0) {
	if(a != 0) {
		createLine(dotArr);
	}

}

activateSelectTool = () => {
		console.log('activateee');

	mapArea.innerHTML = "Click Here to Remove" + " Your Area";

	mapEl.addEventListener('click', dotManagement);
}

let lineCount = 0;

deactivateSelectTool = () => {
	console.log('deactiveted');
	mapArea.innerHTML = "Click Here to Select" + " Your Area";
	map.gestureHandling = "cooperative";

	let main  = document.getElementById('main');
	console.log(main);
	let elementsRemoving = main.querySelectorAll('svg,span');
	console.log('y',elementsRemoving);
	elementsRemoving.forEach(e => {
		//console.log('ee',e);
		e.remove();
	});
	mapArea.innerHTML = "Click Here to Select" + " Your Area";
	 mapEl.removeEventListener('click',dotManagement);
	 a = 0;
	 dotArr = [];
	 firstDot = [];
	 lineCount = 0;
}

createLine = (arr) => {
	console.log('create line arrrr', arr,lineCount);
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

	lineSection.appendChild(line1);
	lineCount++;

}


function initAutocomplete() {
      /*  var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: 'roadmap'
        });*/

        // Create the search box and link it to the UI element.
      }