myRouteCanvas = function(){
    this.onLayerDidMount = function (){      
        // -- prepare custom drawing   
        console.log('start')
    };
    this.onLayerWillUnmount  = function(){
        // -- custom cleanup    
        console.log('end')
    };
    this.setData = function (district,time){
    // -- custom data set
        if (time.substring(10,12) == '10')
            fetch('/person/'+district+"/"+time.substring(0,10))
            .then(res => res.json())
            .then(web => {
                routeData = web;  
                // this.date = time;
                // console.log(time);
                this.needRedraw(); // -- call to drawLayer
            })    
        this.date = time;
        this.needRedraw();
    };
    this.onDrawLayer = function (info){
        // -- custom  draw
            var count = 0;
            //var randomNum = Math.floor((Math.random() * 255) + 1);
            // var time = this.date != undefined ? this.date : "Date";
            var time = this.date != undefined ? (this.date.slice(0,8)+"d"+this.date.slice(8,10)+"h"+this.date.slice(10)+"m"): "Date";
            var ctx = info.canvas.getContext('2d');
            ctx.clearRect(0, 0, info.canvas.width, info.canvas.height);
            ctx.font = "30px Verdana";
            ctx.fillStyle = "rgba(255,255,255)";
            ctx.fillText(time, 100, 50);
            //for (var i = 0; i < data.length; i++) {
            console.log(routeData.length)
            for (var i = 0; i < routeData.length; i++) {
                var item = routeData[i].info;
                var name = routeData[i].name;
                // if (color[name] == undefined){
                //     color[name] = getRandomColor();
                // }
                var nowDot = [];
                item = item.sort(function (a, b) {
                    return a.begin > b.begin ? 1 : -1;
                });
                    // console.log(item)
                    // asyncForEach(item, async (d,index)=>{
                item.forEach((d,index) =>{
                    if( parseInt(d.begin.substring(3,5)) < parseInt(this.date.substring(10,12))){
                        let lat = parseFloat(d.lat);
                        let lon = parseFloat(d.lon);
                        // console.log(info.bounds.contains([lat, lon]))
                        //if (info.bounds.contains([lat, lon])) {
                            let dot = info.layer._map.latLngToContainerPoint([lat, lon]);
                            // hexString = d[2].toString(16);
                            // hex = parseInt(hexString, 16);
                            ctx.beginPath();
                            // ctx.strokeStyle = color[name];
                            // ctx.fillStyle = color[name];
                            // ctx.globalAlpha = 0.5;
                            ctx.fillStyle = "rgba(255,116,0,0.005)";
                            ctx.lineWidth = 3;
                            ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = "rgb(255,116,0,0.1)";
                            if (index == 0)
                                ctx.moveTo(dot.x, dot.y);
                            else
                                ctx.moveTo(nowDot[0], nowDot[1]);
                            ctx.lineTo(dot.x, dot.y);
                            // ctx.stroke();
                            // ctx.fillStyle = "rgba("+d[2]/max*255+","+d[2]/max*255+","+d[2]/max*255+")";
                            // ctx.fill();
                            ctx.stroke();
                            ctx.closePath();
                            nowDot = [dot.x, dot.y];
                            count++;
                        //}
                    // }
                        //await waitFor(1000);
                    }
                })
            }
        // console.log(count);
    } 
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
