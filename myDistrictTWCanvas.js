myDistrictTWCanvas = function(){
    this.onLayerDidMount = function (){      
        // -- prepare custom drawing   
        fetch('/districtTW')
        .then(res => res.json())
        .then(web => { 
            districtData = web;
            this.setData();
        })  
        // this.setData();
    };
    this.onLayerWillUnmount  = function(){
        // -- custom cleanup    
    };
    this.setData = function (){
    // -- custom data set
        this.needRedraw(); // -- call to drawLayer
    };
    this.onDrawLayer = function (info){
    // -- custom  draw
        var ctx = info.canvas.getContext('2d');
        ctx.clearRect(0, 0, info.canvas.width, info.canvas.height);
        ctx.font = "20px Verdana";
        ctx.fillStyle = "rgba(255,255,255)";
        // ctx.fillText("Taipei MRT", 100, 50);
        for (var i = 0; i < districtData.length; i++) {
            var d = districtData[i];
            dot = info.layer._map.latLngToContainerPoint([d.lat, d.lon]);
            // hexString = d[2].toString(16);
            // hex = parseInt(hexString, 16);
            ctx.beginPath();
            //ctx.arc(dot.x, dot.y, 10, 0, Math.PI * 2);
            ctx.fillText(d.address, (dot.x-50), dot.y);
            ctx.fillStyle = "rgba(255,255,255)";
            // ctx.fillStyle = colorMRT(d.line_code);
            ctx.fill();
            ctx.closePath(); 
        }
    } 
}
