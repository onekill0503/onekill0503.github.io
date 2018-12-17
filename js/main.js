$(document).ready(function(){

    var bot_api = "737566323:AAEAHJZCts8bwGk7ZHewXTeIlSZMrj0JNUg";
    var channel = "@zerocodenotif";

    $("#contact-data").on('submit' , function(e){
        $("#contact-data").addClass("loading");
        var emptyInputs = $(this).find("input, textarea")
            .not('[type="hidden"]')
            .filter(function() {
              return $(this).val() == "";
            });
          if (emptyInputs.length) {
            $("#contact-data").removeClass("loading");
            $(".ui.warning").fadeIn();
            setTimeout(function(){
                $(".ui.warning").fadeOut();
            } , 3000)
          }else{
            var ser = $(this).serializeArray();
            var pesan = ''
            $(ser).each(function(i , f){
                pesan = pesan + f.name + " : " + f.value + " \n";
            });
            $.ajax({
                type: 'post',
                data: 'chat_id='+channel+"&text="+pesan,
                url: 'https://api.telegram.org/bot' + bot_api + '/sendMessage',
                success: function(res){
                    $(".ui.success").fadeIn();
                    console.log(res);
                    $("#contact-data").removeClass("loading");
                    setTimeout(function(){
                        $(".ui.success").fadeOut();
                    } , 3000);
                },
                error: function(res){
                    $(".ui.error").fadeIn();
                    console.log(res);
                    $("#contact-data").removeClass("loading");
                    setTimeout(function(){
                        $(".ui.error").fadeOut();
                    } , 3000)
                }
            })
          }
        e.preventDefault();
    })

    var bannerh = $(".banner").height() + 50;

    $("#more").on('click' , function(){
       $("html").animate({
           scrollTop: bannerh ,
       } , 1000); 
    });

    // Side Bar Toggle
    $(".sidebar-nav").click(function(){
        $(".ui.sidebar").sidebar('toggle');
    })
    // ---------=----------

    // Stiky Navbar
    $(window).scroll(function(){

        let scrollTop = $(window).scrollTop();

        if (scrollTop >= 65){
            $("#header-fix").css({'display': 'block'});
        }else{
            $("#header-fix").css({'display' : 'none'});
        }

    })
    // ----------=-----------

    $(".item-nav").on('click' , function(){
        // Get Value of Offset Top
        var target = $(this).attr('target');
        var tujuan = $(target);

        // Get Value of Offset Top
        $('html').animate({
            scrollTop: tujuan.offset().top - 50 , 
        } , 1000);
    });
    $(".mobile-nav").on('click',function(e){
        // Remove Original Event
        e.preventDefault();

        // Hiding Side bar
        $(".ui.sidebar").sidebar('hide');
        
        // Get Value of Offset Top
        var target = $(this).attr('target');
        var tujuan = $(target);


        // Go to Element
        $('html').animate({
            scrollTop: tujuan.offset().top - 50 , 
        } , 1000);
    });
})