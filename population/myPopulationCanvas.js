myPopulationCanvas = function(){
    this.onLayerDidMount = function (){      
        // -- prepare custom drawing    
        console.log('start')
    };
    this.onLayerWillUnmount  = function(){
        // -- custom cleanup    
        console.log('end')
    };
    this.setData = function (time){
    // -- custom data set
        fetch('/count/'+time)
        .then(res => res.json())
        .then(web => {
            data = web[0].locationCount;  
            this.date = time;
            console.log(time);
            this.needRedraw(); // -- call to drawLayer
        })    
    };
    this.onDrawLayer = function (info){
    // -- custom  draw
        var ctx = info.canvas.getContext('2d');
        ctx.clearRect(0, 0, info.canvas.width, info.canvas.height);
        var count = 0;
        //var randomNum = Math.floor((Math.random() * 255) + 1);
        var randomNum = 0;
        var time = this.date != undefined ? (this.date.slice(0,8)+"d"+this.date.slice(8,10)+"h"+this.date.slice(10)+"m"): "Date";
        ctx.font = "30px Verdana";
        ctx.fillStyle = "rgba(255,255,255)";
        ctx.fillText(time, 100, 50);
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            if (d[2] > 100)
                if (info.bounds.contains([d[0], d[1]])) {
                    dot = info.layer._map.latLngToContainerPoint([d[0], d[1]]);
                    hexString = d[2].toString(16);
                    hex = parseInt(hexString, 16);
                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(255,116,"+randomNum+", "+d[2]/500+")";
                    //ctx.fillStyle = "rgba("+d[2]/max*255+","+d[2]/max*255+","+d[2]/max*255+")";
                    ctx.fill();
                    ctx.closePath();
                    count++;
                }
        }
        console.log(count);
    } 
}
