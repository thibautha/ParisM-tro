var periode=1;
var lastPeriod=1;
var scrollEnable=true;
var periodes=new Array;
var year=1900;
$(document).ready(function(){
        $.getJSON('js/base.json', function(data) {
                $nombrePeriodes=data.years.length;
                for (var k in data.years){
                        periodes.push(data.years[k].annee);
                }
                
                var temp;                                                // tri du tableau pour le remettre dans l'ordre
                var bonOrdre=false;
                do{
                        bonOrdre=true;
                        for(i=0;i<periodes.length-1;i++){
                                if(periodes[i]>periodes[i+1]){
                                        temp=periodes[i];
                                        periodes[i]=periodes[i+1];
                                        periodes[i+1]=temp;
                                        bonOrdre=false;
                                }
                        }
                }while(bonOrdre==false);
                for(var ir=0; ir<periodes.length; ir++){
                        $("#mainMap>div>div:last-child>div>div:nth-child(3)>div").prepend("<span>"+periodes[ir]+"</span>");
                        $("#linesPart>div:first-child>div").prepend("<span>"+periodes[ir]+"</span>");
                }
                $("#linesPart .events").css("height",($nombrePeriodes)*50+190+'px');
                for (var x=1; x<=20; x++){
                        var tab=new Array;
                        for (var i in data.years){
                                for (var j in data.years[i].events) {
                                        if(data.years[i].events[j].ligne==x){
                                                tab.push(data.years[i]);
                                        }
                                }
                        }
                        $min=2031;
                        $place=$nombrePeriodes;
                        for(t=0; t<tab.length; t++){
                                if(tab[t].annee<$min){
                                        $min=tab[t].annee;
                                }
                        }
                        for(m=0; m<periodes.length; m++){
                                if(periodes[m]==$min){
                                        $place=m;
                                }
                        }
                        for(v=0; v<periodes.length; v++){
                                for(t=0; t<tab.length; t++){
                                        if(tab[t].annee==periodes[v]){
                                                //$("#linesPart>div>div.events>div:nth-child("+x+")>div").append("<a class='lineEvt' href='#' style='top:"+(v*50)+"px'><span></span><span>"+tab[t].description+"</span></a>");
                                                for (var bn in data.years){
                                                        if(data.years[bn].annee==tab[t].annee){
                                                                for (var ty in data.years[bn].events){
                                                                        if(data.years[bn].events[ty].ligne==x){
                                                                                $("#linesPart>div>div.events>div:nth-child("+x+")>div").append("<a class='lineEvt e"+(v+1)+"' href='drop&main?"+bn+"&"+ty+"' style='top:"+((v*50)-((($nombrePeriodes)*50+190)-(($nombrePeriodes-$place)*50+190)))+"px'><span></span><span>"+data.years[bn].events[ty].description+"</span></a>")
                                                                        }
                                                                }
                                                        }
                                                }
                                        }
                                }
                        }
                        $(".lineEvt").addClass('inactive');
                        $(".lineEvt.e1").removeClass('inactive').addClass('active');
                        $("#linesPart>div>div.events>div:nth-child("+x+")>div").css("height",($nombrePeriodes-$place)*50+190+'px');
                }
                verifierActifs("first");
                preventLink();
                replaceLeft();
          });

        // GESTION DU SROLL DE LA MAIN PAGE
        var mousewheelevtbis = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
        faireEffect();
        function faireEffect(){        
                $(window).bind(mousewheelevtbis, function(e){
                        scroller(e,"none");
                });
                $("#mainMap>div>div:last-child>div>div:nth-child(4)").bind('click', function(e){
                        scroller(e, "top");
                });
                $("#mainMap>div>div:last-child>div>div:nth-child(2)").bind('click', function(e){
                        scroller(e, "bottom");
                });
                document.onkeydown = function applyKey(event){
                    if ( event.keyCode == 40 ){
                        scroller(event,"top");
                    }
                    if ( event.keyCode == 38 ){
                        scroller(event,"bottom");
                    }                         
                }
        }
        verifierActifs();
        $top=$("#linesPart .events").position().top;
        function scroller(e,direct){
                if(direct=="none"){
                    var evt = window.event || e;
                    evt = evt.originalEvent ? evt.originalEvent : evt;               
                    var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta;
                }
                if(direct=="top"){
                        var delta=1;
                }
                if(direct=="bottom"){
                        var delta=0;
                }
                if(e=="anywhere"){
                        var delta=false;
                }
                    $top=$("#linesPart .events").position().top;
                    if(($top-20)%50==0){

                            if(delta > 0 && $top!=20 && scrollEnable==true && e!="anywhere") { //up
                                    $(window).unbind();
                                    scrollEnable=false;
                                    periode--;
                                    year=periodes[(periode-1)];
                                    replaceLeft();
                                        lastPeriod=periode+1;
                                    $(".lineEvt").removeClass('active').addClass('inactive');
                                    $(".lineEvt.e"+periode).removeClass('inactive').addClass('active');
                                    $("#mainMap>div>div:last-child>div>div:nth-child(3)>div").animate({bottom:(-($("#mainMap>div>div:last-child>div>div:nth-child(3)>div").position().top)-($("#mainMap>div>div:last-child>div>div:nth-child(3)>div").height())+80)+"px"},600);
                                    $("#linesPart>div:first-child>div").animate({bottom:(-($("#linesPart>div:first-child>div").position().top)-($("#linesPart>div:first-child>div").height())+38)+"px"},600);
                                    Map.init();
                                    $("#linesPart .events").stop().animate({top: ($top+50)+"px"}, 1000, 'easeInOutQuart', setTimeout(function(){faireEffect();}, 1500));
                                    verifierActifs("up");

                            }
                            if(delta <= 0 && ($("#linesPart .events").height()+$top)!=260 && scrollEnable==true && e!="anywhere"){ //down
                                    $(window).unbind();
                                    scrollEnable=false;
                                    periode++;
                                    year=periodes[(periode-1)];
                                    replaceLeft();
                                    lastPeriod=periode-1;
                                    $(".lineEvt").removeClass('active').addClass('inactive');
                                    $(".lineEvt.e"+periode).removeClass('inactive').addClass('active');
                                    $("#mainMap>div>div:last-child>div>div:nth-child(3)>div").animate({bottom:(-($("#mainMap>div>div:last-child>div>div:nth-child(3)>div").position().top)-($("#mainMap>div>div:last-child>div>div:nth-child(3)>div").height()))+"px"},600);
                                    $("#linesPart>div:first-child>div").animate({bottom:(-($("#linesPart>div:first-child>div").position().top)-($("#linesPart>div:first-child>div").height()))+"px"},600);
                                    Map.init();
                                    $("#linesPart .events").stop().animate({top: ($top-50)+"px"}, 1000, 'easeInOutQuart', setTimeout(function(){faireEffect();}, 1500));
                                    verifierActifs("down");

                            }
                            console.log(direct);
                            if((e=='anywhere' || e=='anywhere2') && direct>=1){
                                periode=periode+direct;
                                lastPeriod=periode+1;
                                year=periodes[(periode-1)];
                                replaceLeft();
                                $(".lineEvt").removeClass('active').addClass('inactive');
                                $(".lineEvt.e"+periode).removeClass('inactive').addClass('active');
                                $("#linesPart .events").stop().animate({top: ($top-(50*direct))+"px"}, 1000, 'easeInOutQuart', function(){
                                    verifierActifs("first1");
                                });
                                $("#mainMap>div>div:last-child>div>div:nth-child(3)>div").animate({bottom:(-($("#mainMap>div>div:last-child>div>div:nth-child(3)>div").position().top)-($("#mainMap>div>div:last-child>div>div:nth-child(3)>div").height())+40-(40*direct))+"px"},600);
                                $("#linesPart>div:first-child>div").animate({bottom:(-($("#linesPart>div:first-child>div").position().top)-($("#linesPart>div:first-child>div").height())+19-(19*direct))+"px"},600);
            
                            }else if((e=='anywhere' || e=='anywhere2') && direct<=1){
                                var direct1=Math.abs(direct);
                                periode=periode-direct1;
                                lastPeriod=periode-1;
                                year=periodes[(periode-1)];
                                replaceLeft();
                                $(".lineEvt").removeClass('active').addClass('inactive');
                                $(".lineEvt.e"+periode).removeClass('inactive').addClass('active');
                                $("#linesPart .events").stop().animate({top: ($top+(50*direct1))+"px"}, 1000, 'easeInOutQuart', function(){
                                    verifierActifs("first");
                                });
                                $("#mainMap>div>div:last-child>div>div:nth-child(3)>div").animate({bottom:(-($("#mainMap>div>div:last-child>div>div:nth-child(3)>div").position().top)-($("#mainMap>div>div:last-child>div>div:nth-child(3)>div").height())+40+(40*(Math.abs(direct1))))+"px"},600);
                                $("#linesPart>div:first-child>div").animate({bottom:(-($("#linesPart>div:first-child>div").position().top)-($("#linesPart>div:first-child>div").height())+19+(19*(Math.abs(direct))))+"px"},600);  
                                
                            }
                            preventLink();
                        }

                        
        }
        function passPeriod(){
                    var po;
                                                if($(this).hasClass("first")){
                                                        po=3;
                                                }else if($(this).hasClass("second")){
                                                        po=2;
                                                }else if($(this).hasClass("third")){
                                                        po=1;
                                                }else if($(this).hasClass("fourth")){
                                                        po=0;
                                                }
                                        
                    var min=(periodes.length)-1;
                    var actual=0;
                    var scroll;
                    for(var tyu=0; tyu<periodes.length; tyu++){
                        if(periodes[tyu]==year){
                            actual=tyu;
                        }
                        if(periodes[tyu]>=(1900+(po*32)+(po)) && periodes[tyu]<periodes[min]){
                            min=tyu;
                        }
                       
                    }
                    
                    scroll=min-actual;

                    if(scroll!=0){
                       scroller('anywhere',scroll);
                    }
        }
                function passPeriod1(heyy){
                        var po2;
                        if(heyy=='true2'){
                                if(year<=1932){
                                        po2=1;
                                }else if(year<=1965){
                                        po2=2;
                                }else if(year<=1998){
                                        po2=3;
                                }else if(year<=2030){
                                        po2=3;
                                }
                        }else if(heyy=='true1'){
                                var today;
                                if(year<=1932){
                                        po2=0;
                                }else if(year<=1965){
                                        po2=0;
                                }else if(year<=1998){
                                        po2=1;
                                }else if(year<=2030){
                                        po2=2;
                                }
                        }

                        var min=(periodes.length)-1;
            var actual=0;
            var scroll;
            for(var tyu=0; tyu<periodes.length; tyu++){
                if(periodes[tyu]==year){
                                        actual=tyu;
                }
                if(periodes[tyu]>=(1900+(po2*32)+(po2)) && periodes[tyu]<periodes[min]){
                    min=tyu;
                }
            }
                    
            scroll=min-actual;

            if(scroll!=0){
                scroller('anywhere2',scroll);
            }
                }
        $("#mainMap>div>div:first-child>div").bind('click', passPeriod);
                $("#mainMap>div>div:last-child>div>div:nth-child(1)").bind('click', function(){
                        passPeriod1('true2');
                });
                $("#mainMap>div>div:last-child>div>div:nth-child(5)").bind('click', function(){
                        passPeriod1('true1');
                });
        function verifierActifs(toop){
                var variable=0;
                var first=0;
                if(toop>0){
                    variable=100;
                    alert ('ok');
                    
                }else if(toop<0){
                    variable=100;

                }else if(toop=="up"){
                    variable=100;
                }else if(toop=="first"){
                    first=50;
                }else if(toop=="first1"){
                    first=0;
                }else{
                    variable=0;
                }
                for(var i=1; i<=20; i++){
                        if(($("#linesPart .events").height()-$("#linesPart>div>div.events>div:nth-child("+i+")>div").height()+$("#linesPart .events").position().top+variable)>100-first){
                                $("#linesPart>div>div.lines>div:nth-child("+i+")").addClass("inactive");
                                $("#linesPart>div>div.events>div:nth-child("+i+")>div").addClass("inactive");
                        }else{
                                $("#linesPart>div>div.lines>div:nth-child("+i+")").removeClass("inactive");
                                $("#linesPart>div>div.events>div:nth-child("+i+")>div").removeClass("inactive");
                        }
                }
                
        }
        function preventLink(){
                $(".lineEvt").on('click',function(e){
                        if($(this).hasClass("active") == true){
                                return true;
                        } else if ($(this).hasClass("inactive") == true){
                                e.preventDefault();
                        }
                });
        }

        function replaceLeft(){
                $(".echelle>span").animate({bottom:(((year-1900)/130)*100)-1+'%'},300);
                $('#mainMap>div>div:first-child>div').removeClass('active');
                if(year<=1932){
                        $('#mainMap>div>div:first-child>div:nth-child(5)').addClass('active');
                }else if(year<=1965){
                        $('#mainMap>div>div:first-child>div:nth-child(4)').addClass('active');
                }else if(year<=1998){
                        $('#mainMap>div>div:first-child>div:nth-child(3)').addClass('active');
                }else{
                        $('#mainMap>div>div:first-child>div:nth-child(2)').addClass('active');
                }
        }


        // GESTION DU SROLL DE LA PAGE EVENT
        $("#elementList>div>div:first-child>div:last-child").stop().animate({left: "0"}, 200);
        var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
        $('#elementList').bind(mousewheelevt, function(e){
            var evt = window.event || e;     
            evt = evt.originalEvent ? evt.originalEvent : evt;               
            var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta;

            if(delta > 0) { //up
                    if ($('#elementList>div').attr("class")!="one"){
                            $("#elementList>div>div>div:last-child").animate({left: "-100%"},200,function(){
                                switch($('#elementList>div').attr("class")){
                                                   case ("two"):$('#elementList>div').stop().animate({top: "0"}, 400, function(){$('#elementList>div').attr("class","one");afficherInfos("one")});break;
                                                   case ("three"):$('#elementList>div').stop().animate({top: "-100%"}, 400, function(){$('#elementList>div').attr("class","two");afficherInfos("two")});break;
                                                   case ("four"):$('#elementList>div').stop().animate({top: "-200%"}, 400, function(){$('#elementList>div').attr("class","three");afficherInfos("three")});break;
                                                   case ("five"):$('#elementList>div').stop().animate({top: "-300%"}, 400, function(){$('#elementList>div').attr("class","four");afficherInfos("four")});break;
                                           }
                                   });
                        }
            }
            else{ //down
                    $lng=$('#elementList>div>*').length;
                    if ($lng==1 && $('#elementList>div').attr("class")=="one" || $lng==2 && $('#elementList>div').attr("class")=="two" || $lng==3 && $('#elementList>div').attr("class")=="three" || $lng==4 && $('#elementList>div').attr("class")=="four" || $lng==5 && $('#elementList>div').attr("class")=="five"){
                        console.log("Dernier event");
                }else{
                        $("#elementList>div>div>div:last-child").animate({left: "-100%"},200,function(){
                                switch($('#elementList>div').attr("class")){
                                                   case ("one"):
                                                           if($('#elementList>div>*').length>=2){
                                                                   $('#elementList>div').stop().animate({top: "-100%"}, 400, function(){$('#elementList>div').attr("class","two");afficherInfos("two")});
                                                           }break;
                                                   case ("two"):
                                                           if($('#elementList>div>*').length>=3){
                                                                   $('#elementList>div').stop().animate({top: "-200%"}, 400, function(){$('#elementList>div').attr("class","three");afficherInfos("three")});
                                                           }break;
                                                   case ("three"):
                                                           if($('#elementList>div>*').length>=4){
                                                                   $('#elementList>div').stop().animate({top: "-300%"}, 400, function(){$('#elementList>div').attr("class","four");afficherInfos("four")});
                                                           }break;
                                                   case ("four"):
                                                           if($('#elementList>div>*').length>=5){
                                                                   $('#elementList>div').stop().animate({top: "-400%"}, 400, function(){$('#elementList>div').attr("class","five");afficherInfos("five")});
                                                           }break;
                                           }
                                   });
                        }
            }   
        });
});
function afficherInfos(string){
        $("#elementList>div."+string+">div>div:last-child").stop().animate({left: "0"}, 200);
}