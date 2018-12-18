$(document).ready(function(){
    var base = "http://localhost/sematic/"

    $("#form-testi").on('submit' , function(e){
        var ini = $(this);
        $(this).addClass("loading");
        e.preventDefault();
        var emptyInputs = $(this).find("input, textarea")
            .not('[type="hidden"]')
            .filter(function() {
              return $(this).val() == "";
            });
          if (emptyInputs.length) {
            ini.removeClass("loading");
            $(".warning").fadeIn();
            setTimeout(function(){$(".warning").fadeOut();}, 3000);
          }else{
            $.ajax({
                type: 'POST',
                url: 'server/api.php?ac=testi',
                data: ini.serialize() + "&token=" + getUrlParams('token'),
                success: function(response){
                    console.log(response);
                    var res = JSON.parse(response);
                    if (res.status == 'success'){
                        ini.removeClass("loading");
                        $(".success").fadeIn();
                        setTimeout(function(){
                            $(".success").fadeOut();
                        }, 3000);
                    }else{
                        ini.removeClass("loading");
                        $(".error").fadeIn();
                        setTimeout(function(){
                            $(".error").fadeOut();
                        }, 3000);
                    }
                },
                error: function(res){
                    ini.removeClass("loading");
                    $(".error").fadeIn();
                    setTimeout(function(){
                        $(".error").fadeOut();
                    }, 3000);
                }
            })
          }
    });

    function getUrlParams(param){
        var getParam = window.location.search.split('?');
        var paramArray = getParam[1].split('&');
        for (var i = 0; i < paramArray.length; i++){
            var sparam = paramArray[i].split('=');
            if (sparam[0] == param){
                if (sparam[1] != ''){
                    return decodeURI(sparam[1]);
                }else{
                    return null;
                }
            }
        }
        return null;
    }

    $.ajax({
        type: 'POST',
        url : 'server/api.php',
        data: "key=" + getUrlParams('token'),
        success: function(response){
            var res = JSON.parse(response);
            if (res.status == 'valid'){
                console.log(res.status);
            }else{
                console.log(res.status);
                window.location.href = base + 'index.html';
            }
        }
    })


});