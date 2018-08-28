myMRTCanvas = function(){
    this.onLayerDidMount = function (){      
        // -- prepare custom drawing   
        fetch('/MRT')
        .then(res => res.json())
        .then(web => { 
            MRTData = web;
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
        ctx.font = "50px Verdana";
        ctx.fillStyle = "rgba(255,255,255)";
        // ctx.fillText("Taipei MRT", 100, 50);
        for (var i = 0; i < MRTData.length; i++) {
            var d = MRTData[i];
            dot = info.layer._map.latLngToContainerPoint([d.lat, d.lon]);
            // hexString = d[2].toString(16);
            // hex = parseInt(hexString, 16);
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2);
            // ctx.globalAlpha = 0.7;
	    ctx.fillStyle = colorMRT(d.line_code);
            ctx.fill();
            ctx.strokeStyle = colorMRT(d.line_code);
            if (i == 0 || d.line_code != MRTData[i-1].line_code)
                ctx.moveTo(dot.x, dot.y);
            else{
                if (d.station_name_en == 'Sanchong Elementary School'){
                    preDot = info.layer._map.latLngToContainerPoint([25.063274,121.500762]);
                    ctx.moveTo(preDot.x, preDot.y);
                }
                else{
                    preDot = info.layer._map.latLngToContainerPoint([MRTData[i-1].lat, MRTData[i-1].lon]);
                    ctx.moveTo(preDot.x, preDot.y);
                }
            }
            ctx.lineTo(dot.x, dot.y);
            ctx.stroke();
            ctx.closePath(); 
        }
    } 
}

function colorMRT(lineCode){
    switch(lineCode) {
        case 'BR':
            return '#c48c31';
        case 'R':
            return '#e3002c';
        case 'G':
            return '#008659';
        case 'O':
            return '#f8b61c';
        case 'BL':
            return '#0070bd';
    } 
}
