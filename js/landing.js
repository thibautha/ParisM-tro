var main= true;
var box;
console.log("main on init: ",main);
jQuery(function($) {"use strict";
       console.log("chargement de la page");

       $('.events').on("click", "a", function(event) {
             var $this = $(this);
              event.preventDefault();
              var locB = $this.attr("href");
              //$('#ShowAjax').addClass("hidde");
              var query = locB.split('?');
              var loc = query[0];
              var idi = query[1];
              
              console.log("click this idi: ",idi);
              console.log("click this loc: ",loc);
              //history.pushState(null, null, loc);
              test(loc,idi);

       });
       $('.BackButton').on("click", "a", function(event) {
              var $this = $(this);
              event.preventDefault();
              console.log("BackButton ok");
              var loc = $this.attr("href");
              var Nidi =0;
              test(loc,Nidi);
              //$('#container').load($this.attr("href") + " #main", function(data) {
              //console.log("c'est pas bon:", $this.attr("href"));
              //$("title").text($(data).filter("title").text());
       });

       function test(loca,idit) {
              if(loca=="event"){main=false;console.log("test: ",main);construct(idit);}else{main=true;console.log("test: ",main);load();};
       };
       function construct(iditi){console.log("construct idit: ",iditi);
              var One = iditi.split('&');
              var bn= One[0];
              var ty= One[1];
$.getJSON('js/base.json',  function(data) {
        var nbEvent,i,strat=('<div class="relative" id="elementList">');
              nbEvent=data.years[bn].events[ty].histoire.length;
              console.log("nbevenr",nbEvent);
              //.log(i);
              //console.log(data.years[bn].events[ty].histoire[1]);
             for (i=0;i<nbEvent;i++){
              strat+=('<section id="media_important"></section><aside id="infos"><div id="titre"><h2>'+data.years[bn].events[ty].histoire[i].titre+'</h2></div><div id="description_media"><div id="description">'+data.years[bn].events[ty].histoire[i].text+'</div><p>le nom de la sation</p><div id="lignes_evt"><div><p>'+data.years[bn].events[ty].ligne+'</p></div></div></aside>');};
       console.log(strat);
       box=(strat+'</div><div id="footer"><div id="btn_sociaux"><div><div></div><div><div id="custom-tweet-button"><a href="https://twitter.com/share" class="twitter-share-button" data-url="http://lienpage.html" data-text="Une expérience incroyable retraçant lhistoire du métro" data-lang="fr">Tweeter</a></div><div class="fb-share-button" data-href="http://lienpage.html" data-type="button_count"></div></div></div>');
       });
       console.log("construct: done");
       load()

/*       boligne=("<div><p>"+data.years[bn].events[ty].ligne+"</p></div>");
              bodescription=("<p>"+data.years[bn].events[ty].histoire[0].text+"</p>");
              botitre=("<h2>"+data.years[bn].events[ty].histoire[0].titre+"</h2>");*/
};
       function load(){console.log("load: ready");
       // var d=document.getElementByID("docu");
       // var e=document.getElementByID("container")

       if(main==true){$.when(
                     $.ajax(
                            $('#docu').fadeOut()).done(function(){
              //var contenu =("<div>plop</div>");
             // $('#docu').html(contenu);
              $('#container').fadeIn();console.log("container : in");
       }));}else{
              $.when(
                     $.ajax(
                            $('#container').fadeOut()).done(function(){
              var contenu =box;
              $('#docu').html(contenu);
              $('#docu').fadeIn();console.log("docu : in");

       }));
              };
};

});
