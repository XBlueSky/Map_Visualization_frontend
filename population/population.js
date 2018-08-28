var data = [];
var MRTData = [];
var leafletMap = L.map('map').setView([25.045979, 121.533613], 13);

L.tileLayer("https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZ2xlYWZsZXQiLCJhIjoiY2lxdWxoODl0MDA0M2h4bTNlZ2I1Z3gycyJ9.vrEWCC2nwsGfAYKZ7c4HZA")
    .addTo(leafletMap); 

myMRTCanvas.prototype = new L.CanvasLayer(); // -- setup prototype 
var MRTLayer = new myMRTCanvas();
MRTLayer.addTo(leafletMap);

myPopulationCanvas.prototype = new L.CanvasLayer(); // -- setup prototype 
var myLayer = new myPopulationCanvas();
myLayer.addTo(leafletMap);

var time = []
var interval = ['00', '10', '20', '30', '40', '50']
for (let i=0; i<=9; i++){
    interval.forEach(t => {
        time.push('201805310'+parseInt(i)+t)
    })
}
for (let i=10; i<=23; i++){
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
    myLayer.setData(t);
    await waitFor(400);
})
