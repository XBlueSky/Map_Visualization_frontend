myDistrictCanvas = function(){
    this.onLayerDidMount = function (){      
        // -- prepare custom drawing    
        console.log('start')
    };
    this.onLayerWillUnmount  = function(){
        // -- custom cleanup    
        console.log('end')
    };
    this.setData = function (time, flag){
    // -- custom data set
        fetch('/district/'+time)
        .then(res => res.json())
        .then(web => {
            data = web[0].districtAllocate;  
            this.date = time;
            this.flag = flag;
            // console.log(time);
            // console.log(data);
            this.needRedraw(); // -- call to drawLayer
        })    
    };
    this.onDrawLayer = function (info){
    // -- custom  draw
        var ctx = info.canvas.getContext('2d');
        ctx.clearRect(0, 0, info.canvas.width, info.canvas.height);
        var count = 0;
        //var randomNum = Math.floor((Math.random() * 255) + 1);
        // var time = this.date != undefined ? (this.date.slice(0,7)+"d"+this.date.slice(8,9)+"m"+this.date.slice(10)+"s"): "Date";
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            if (d.d_id <= 48)
                if (info.bounds.contains(d.name)) {
                    dot = info.layer._map.latLngToContainerPoint(d.name);
                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
                    if (this.flag == 1)
                        ctx.fillStyle = colorPick(d.d_id);
                    else
                        ctx.fillStyle = "rgba(255,116,0)";
                    ctx.globalAlpha = 0.7;
                    ctx.fill();
                    ctx.closePath();
                    count++;
                }
        }
        ctx.font = "30px Verdana";
        ctx.fillStyle = "rgba(255,255,255)";
        ctx.fillText(time, 100, 50);
        console.log(count);
    } 
}

function colorPick(num){
    switch(num) {
        case 1:
            return '#f44336';
        case 2:
            return '#3f51b5';
        case 3:
            return '#009688';
        case 4:
            return '#ffeb3b';
        case 5:
            return '#e91e63';
        case 6:
            return '#2196f3';
        case 7:
            return '#4caf50';
        case 8:
            return '#ffc107';
        case 9:
            return '#9c27b0';
        case 10:
            return '#03a9f4';
        case 11:
            return '#8bc34a';
        case 12:
            return '#ff9800';
        case 13:
            return '#673ab7';
        case 14:
            return '#00bcd4';
        case 15:
            return '#cddc39';
        case 16:
            return '#ff5722';
        case 17:
            return '#f6685e';
        case 18:
            return '#6573c3';
        case 19:
            return '#33ab9f';
        case 20:
            return '#ffef62';
        case 21:
            return '#ed4b82';
        case 22:
            return '#4dabf5';
        case 23:
            return '#6fbf73';
        case 24:
            return '#ffcd38';
        case 25:
            return '#af52bf';
        case 26:
            return '#35baf6';
        case 27:
            return '#a2cf6e';
        case 28:
            return '#ffac33';
        case 29:
            return '#8561c5';
        case 30:
            return '#33c9dc';
        case 31:
            return '#d7e360';
        case 32:
            return '#ff784e';
        case 33:
            return '#aa2e25';
        case 34:
            return '#2c387e';
        case 35:
            return '#00695f';
        case 36:
            return '#b2a429';
        case 37:
            return '#a31545';
        case 38:
            return '#1769aa';
        case 39:
            return '#357a38';
        case 40:
            return '#b28704';
        case 41:
            return '#6d1b7b';
        case 42:
            return '#0276aa';
        case 43:
            return '#618833';
        case 44:
            return '#b26a00';
        case 45:
            return '#482880';
        case 46:
            return '#008394';
        case 47:
            return '#8f9a27';
        case 48:
            return '#b23c17';
    } 
}
