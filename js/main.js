var amount=0;
var stations=0;
var container=new Raphael(document.getElementById('canvas_map',600,600));
var pie1=new Raphael(document.getElementById('pie1'));
var pie2=new Raphael(document.getElementById('pie2'));
var count=0;
var Map={

	settings:{
		getLines:function(data,period){
			var indice=period;

			if (period<lastPeriod) {

				container.clear();
				$.each(data.lines, function(key, val) {

					// On récupère les éléments à afficher qui correspondent à la période
					for (var i = indice; i >0; i--) {
					
						if(i==val.period){	

						 	$.each(val.draw,function(key,val){
						 		// Création des lignes
						 		container.path(val[0].pathString).attr({"stroke":val[0].stroke,"stroke-width":val[0].strokeWidth}).toBack();
						 	});
						 	$.each(val.circles,function(key,val){
						 		// console.log(val);
						 		// Création des stations
						 		count++;
						 		console.log('nb'+count);
						 		container.circle(val.x,val.y,val.r).animate({fill:val.fill,stroke:val.stroke,"stroke-width":val.strokeWidth,"stroke-opacity":1});
						 	});

						}
					}
				});
				console.log(stations)
				Map.settings.drawed.call(this);

			}else{

				$.each(data.lines, function(key, val) {

					// On récupère les éléments à afficher qui correspondent à la période
					if(indice==val.period){	

					 	$.each(val.draw,function(key,val){
					 		// console.log(val);
					 		// Création des lignes
					 		Map.animateLine(container,val[0].pathString,{"stroke": val[0].stroke,"stroke-width":val[0].strokeWidth},val[0].duration);
					 	});
					 	$.each(val.circles,function(key,val){
					 		// console.log(val);
					 		// Création des stations
					 		container.circle(val.x,val.y,val.r).animate({fill:val.fill,stroke:val.stroke,"stroke-width":val.strokeWidth,"stroke-opacity":1},500);
					 	});

					}
				});
				Map.settings.drawed.call(this);

			}
		},
		drawed:function(){
			scrollEnable=true;
		}
	},

	init:function(){

		scrollEnable=false;

		// lecture du JSON
		$.getJSON("js/lines.json", function(data){
			// Callback
			Map.settings.getLines.call(this, data,periode);
        });

		Map.createPie();

	},

	animateLine:function(canvas, pathString,attr,duration){

		// Recup des paramètres
        var line = canvas.path(pathString).hide();
        var length = line.getTotalLength();

        // Animation step by step
        $('#canvas_map').animate({
            'to': 1
        }, {
            duration: duration,
            step: function(pos, fx) {
                var offset = length * fx.pos;
                var subpath = line.getSubpath(0, offset);
                canvas.path(subpath).attr(attr).toBack();
            },
        });	
	},

	createPie:function(){

		pie1.clear();
		pie2.clear();

		//text
	    textOutPie1 = pie1.text(100, 180, "NOMBRE DE KM").attr({
	        "font-size": 14,
            "fill": "#3f3f3f",
            "font-weight": 600,
            "font-family": "Open Sans"
	    });
	    textOutPie2 = pie2.text(100, 180, "NOMBRE DE STATIONS").attr({
	        "font-size": 14,
            "fill": "#3f3f3f",
            "font-weight": 600,
            "font-family": "Open Sans"
	    });

	    var backCircle = pie1.circle(100, 100, 50).attr({
	        "stroke": "#ccc",
            "stroke-width": 20
	    });
	    var backCircle = pie2.circle(100, 100, 50).attr({
	        "stroke": "#ccc",
            "stroke-width": 20
	    });


		$.getJSON("js/lines.json", function(data){

			$.each(data.lines, function(key, val) {

			if (periode==val.period) {

				amount=(val.km/100)*100;

				stations=(val.station);

				
				textInPie1 = pie1.text(100, 100, val.km).attr({
					"font-size": 18,
				    "fill": "#000000",
				    "font-weight": 200,
				    "font-family": "Open Sans"
				});
				textInPie2 = pie2.text(100, 100, stations).attr({
					"font-size": 18,
				    "fill": "#000000",
				    "font-weight": 200,
				    "font-family": "Open Sans"
				});

			}

			pie1.customAttributes.arc = function (xloc, yloc, value, total, R) {

			    var alpha = 360 / total * value,
					a = (90 - alpha) * Math.PI / 180,
					x = xloc + R * Math.cos(a),
					y = yloc - R * Math.sin(a),
					path;

			    if (total == value) {

			        path = [
						["M", xloc, yloc - R],
						["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
			        ];

			    } else {

			        path = [
						["M", xloc, yloc - R],
						["A", R, R, 0, +(alpha > 180), 1, x, y]
			        ];

			    }
			    return {
			        path: path
			    }
			}
			pie2.customAttributes.arc = function (xloc, yloc, value, total, R) {

			    var alpha = 360 / total * value,
					a = (90 - alpha) * Math.PI / 180,
					x = xloc + R * Math.cos(a),
					y = yloc - R * Math.sin(a),
					path;

			    if (total == value) {

			        path = [
						["M", xloc, yloc - R],
						["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
			        ];

			    } else {

			        path = [
						["M", xloc, yloc - R],
						["A", R, R, 0, +(alpha > 180), 1, x, y]
			        ];

			    }
			    return {
			        path: path
			    }
			}

			var pieLong = pie1.path().attr({
			    "stroke": "#e74c3c",
			    "stroke-width": 20,
			    arc: [100, 100, 0, 100, 50]
			});

			pieLong.animate({
			    arc: [100, 100, (amount/400)*100, 100, 50]
			}, 800);

			});

			var pieNb = pie2.path().attr({
			    "stroke": "#3f3f3f",
			    "stroke-width": 20,
			    arc: [100, 100, 0, 100, 50]
			});

			pieNb.animate({
			    arc: [100, 100, (stations/430)*100, 100, 50]
			}, 800);

		});
	}
}

Map.init();