var data = [];
var routeData = [];
var MRTData = [];
var color = {};
var leafletMap = L.map('map').setView([25.045979, 121.533613], 13);
var url = location.search;
var distrct = url == "" ? 1 : url.split("=")[1]

L.tileLayer("https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZ2xlYWZsZXQiLCJhIjoiY2lxdWxoODl0MDA0M2h4bTNlZ2I1Z3gycyJ9.vrEWCC2nwsGfAYKZ7c4HZA")
    .addTo(leafletMap); 

myMRTCanvas.prototype = new L.CanvasLayer(); // -- setup prototype 
var MRTLayer = new myMRTCanvas();
MRTLayer.addTo(leafletMap);

myRouteCanvas.prototype = new L.CanvasLayer(); // -- setup prototype 
var myLayer = new myRouteCanvas();
myLayer.addTo(leafletMap);

var time = []
// myLayer.setData(1,2018053100);
var interval = ['10', '20', '30', '40', '50', '60']
for (let i=0; i<=9; i++){
    // time.push('201805310'+parseInt(i))
    interval.forEach(t => {
        time.push('201805310'+parseInt(i)+t)
    })
}
for (let i=10; i<=23; i++){
    // time.push('20180531'+parseInt(i))
    interval.forEach(t => {
        time.push('20180531'+parseInt(i)+t)
    })
}

const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}
asyncForEach(time, async (t) => {
    myLayer.setData(distrct,t);
    console.log(Object.keys(color).length)
    await waitFor(500);
})

