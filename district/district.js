var data = [];
var MRTData = [];
var districtData = [];
var leafletMap = L.map('map').setView([25.045979, 121.533613], 13);

L.tileLayer("https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZ2xlYWZsZXQiLCJhIjoiY2lxdWxoODl0MDA0M2h4bTNlZ2I1Z3gycyJ9.vrEWCC2nwsGfAYKZ7c4HZA")
    .addTo(leafletMap); 

// myMRTCanvas.prototype = new L.CanvasLayer(); // -- setup prototype 
// var MRTLayer = new myMRTCanvas();
// MRTLayer.addTo(leafletMap);

myDistrictCanvas.prototype = new L.CanvasLayer(); 
var myLayer = new myDistrictCanvas();
myLayer.addTo(leafletMap);

myDistrictTWCanvas.prototype = new L.CanvasLayer(); 
var DistrictTWLayer = new myDistrictTWCanvas();
DistrictTWLayer.addTo(leafletMap);

var time = 2018053100
var flag = [0,1]

const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}
asyncForEach(flag, async (f) => {
    myLayer.setData(time,f);
    await waitFor(1000);
})
