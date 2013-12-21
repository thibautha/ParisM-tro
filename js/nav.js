var Main = false;
var box="";

jQuery(function($) {
  "use strict";

  $('.events').on("click", "a", function(event) {   
        var $this = $(this);
        event.preventDefault();
        var locB = $this.attr("href");
        test(locB);
      });

  $('.navi').on("click", "a", function(event) { 
        var $this = $(this);
        event.preventDefault();
        var locB = $this.attr("href");
        test(locB);
      });

  function test(variable){
      var query = variable.split('?');
      var cfA=query[0];
      var cfB=query[1];
      var testA=cfA.split('&')[0];
      if(testA=="drop"){
        Main=false;constructor(cfA,cfB)
      }else{
        Main=true;loader(cfA);
      };
    };

  function constructor(chemin,conf){
    var i,visu,strat=('<div class="relative" id="elementList"><div id="Slide" class="navigation"><a id="prev" href="prev" class="hide4">précédent</a><a id="next" href="next">suivant</a></div>');
    var bn=(conf.split('&')[0]);
    var ty=(conf.split('&')[1]);
    $.getJSON('js/base.json',function(data){
      var nbEvent=data.years[bn].events[ty].histoire.length;
      for (i=0;i<nbEvent;i++){
                            visu=0;
                            if(data.years[bn].events[ty].histoire[i].media=="jpg")
                            {
                              visu=(
                                '<img src="images/'+data.years[bn].events[ty].histoire[i].identifiant+'.'+data.years[bn].events[ty].histoire[i].media+'">'
                                  )
                            }
                            else{
                              visu=(
                                'video width="100%" loop autoplay> <source src="./video/'+data.years[bn].events[ty].histoire[i].identifiant+'.'+data.years[bn].events[ty].histoire[i].media+'" type="video/'+data.years[bn].events[ty].histoire[i].media+'" /> </video>'
                                    )
                                };
                            strat+=(
                              '<div id="slide'+i+'" class="oneEvent hide4"><section id="media_important">'+visu+'</section><aside id="infos"><div id="titre"><h2>'+data.years[bn].events[ty].histoire[i].titre+'</h2></div><div id="description_media"><div id="description"><p>'+data.years[bn].events[ty].histoire[i].text+'</p></div><div id="lignes_evt"><p>'+data.years[bn].annee+'</p><div class="line'+data.years[bn].events[ty].ligne+'"><p>'+data.years[bn].events[ty].ligne+'</p></div></div></aside></div>'
                                    );
                          };
      box=(
        strat+'</div><div id="footer"><div id="btn_sociaux"><div><div></div><div><div id="custom-tweet-button"><a href="https://twitter.com/share" class="twitter-share-button" data-url="http://lienpage.html" data-text="Une expérience incroyable retraçant lhistoire du métro" data-lang="fr">Tweeter</a></div><div class="fb-share-button" data-href="http://lienpage.html" data-type="button_count"></div></div></div>'
        );
        loader(chemin,nbEvent);
       });
    };

  function loader(cfA,navN){
    var InV=(cfA.split('&')[0]) ;
    var OutV=(cfA.split('&')[1]);
    if(InV=="drop"){
      $.when(
        $.ajax(
          $('#'+OutV).fadeOut()).done(
            function(){
              var contenu=box;
              $('#'+InV).html(contenu);
              $('#'+InV).fadeIn();
              Map.init();
              nav(navN);
              verif();
            }
          )
        );
    }
    else{
      $.when(
        $.ajax(
          $('#'+OutV).fadeOut()).done(
          function(){
            $('#BackButton').addClass("hidde");
            $('#'+InV).fadeIn();
            Map.init();
          }
        )
      );
    }

  };

  function nav(g){
    $('#slide0').removeClass("hide4");
    $('#BackButton').removeClass("hidde");
    var rang=0;
    var j=g-1;
   $('#Slide').on("click","a",function(event){
          var $this = $(this);
          event.preventDefault();
          var locD = $this.attr("href");
         if(locD=="next"){
           if(rang<j){
             $('#slide'+rang).addClass("hide4");
             rang++;
             $('#slide'+rang).removeClass("hide4");
           }
           else{

            }
          }
          else{
            if(rang>0){
             $('#slide'+rang).addClass("hide4");
             rang--;
             $('#slide'+rang).removeClass("hide4");
           }
           else{

            }
         }
         if(rang==0){
           $('#prev').addClass('hide4');
         }
         else{
           $('#prev').removeClass('hide4');
         };
         if(rang==j){
           $('#next').addClass('hide4');
         }
         else{
           $('#next').removeClass('hide4');
         };
    });

  };

  $('#cel2').on("mouseover", function(){
    $('#hide3').css("display", "block");
  });
  $('#cel2').on("mouseout", function(){
    $('#hide3').css("display", "none");
  });
  $('#cel1').on("mouseover", function(){
    $('#hide2').css("display", "block");
  });
  $('#cel1').on("mouseout", function(){
    $('#hide2').css("display", "none");
  });
  $('#col1').on("mouseover", function(){
    $('#hide').css("display", "block");
  });
  $('#col1').on("mouseout", function(){
    $('#hide').css("display", "none");
  });

});

