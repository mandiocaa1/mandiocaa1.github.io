$(document).ready(function () {
    $("footer").load("files/footer.html");
    $("nav").load("files/nav.html");

    // ADICIONAR ÍCONE DE PLAY 
    $("audio").before("<i class=\"far fa-play-circle\"></i>");
    $(".gif").append("<i class=\"fas fa-play\"></i>");
    // ADICIONAR BOTÃO DE DOWNLOAD
    $('.back').append("<a><button style='margin: 0 auto; margin-top: 5px; width: 90%' class=\"baixar btn btn-block btn-default\"><i class='fas fa-arrow-alt-circle-down'></i> Baixar</button></a>");

    $("audio").on('ended', function () {
        $(this).siblings("i").toggleClass("fa-pause-circle fa-play-circle");
    });

    // $('.ativarTodos').click(function () {
    //     if (url == 'gifs') {
    //         $('.gif > img').click();
    //     } else {
    //         $('audio').click();
    //     }
    // });

    // BOTÃO DOWNLOAD

    var botoes = $(".back");

    //Adicionar o link para download a partir do endereço do áudio
    for (var i = 0; i < botoes.length; i++) {
        var b = $(botoes[i]);
        b.children("a").attr("href", b.children(".botao").children("audio").attr('src'));
        b.children("a").attr("download", '');
    }

    // -------

    $(".botao").click(function (e) {
        //Se tiver a classe 'baixar' significa que o botão de Download foi clicado e não o botão Play
        // if ($(e.target).hasClass("baixar")) return; //retorna para cancelar

        var play = $(this).children("audio")[0];

        var toggle = $(this).children("i")[0];
        $(toggle).toggleClass("fa-pause-circle fa-play-circle");
        if (play.paused == true) {
            play.play();
        } else {
            play.pause();
            play.currentTime = 0;
        }
    });

    // GIFS E IMAGEM DOWNLOAD
    //adiciona botão de download
    $('.backgif ,.backimg').append("<a><button style='margin: 0 auto; margin-top: 5px; width: 90%' class=\"baixar btn btn-block btn-default\"><i class='fas fa-arrow-alt-circle-down'></i> Baixar</button></a>");

    var gifs = $(".backgif");

    for (var i = 0; i < gifs.length; i++) {
        var b = $(gifs[i]);
        b.children("a").attr("href", b.children(".gif").children('img').attr('src').replace('/sprite', '').replace('.png', '.gif'));
        b.children("a").attr("download", '');
    }

    var gifs = $(".backimg");

    for (var i = 0; i < gifs.length; i++) {
        var b = $(gifs[i]);
        b.children("a").attr("href", b.children('.img').children("img").attr('src'));
        b.children("a").attr("download", '');
    }

    // 
    setTimeout(function () {
        $.ajax({
            url: "https://api.twitch.tv/kraken/streams/" + 'mandiocaa1',
            dataType: 'json',
            headers: {
                'Client-ID': '8as214cog5fxuqjdawgty1cn68ywjv'
            },
            success: function (channel) {
                if (channel["stream"] == null) {
                    $('#stream').html("<b>Stream <b style='color: red'>OFFLINE</span></b>");
                } else {
                    $('#stream').html("<b>Stream <span style='color: lightgreen'>ONLINE</span></b>");
                }
            }
        });
    }, 1500);

    $('.exit').click(function () {
        if ($(this).parent().hasClass('comentar')) { //Se for 'comentar' significa que este é o Exit do caixa de comentários
            $(this).parent().toggle('slide', { direction: 'right' }, 400);
            $('.naoCarregando').toggle('slide', { direction: 'right' }, 400);
            $('.toggleComentar').toggle('slide', { direction: 'right' }, 400);
        } else if ($(this).hasClass('toggleBaloes')) { //Se tiver 'toggleBaloes' significa que é o Exit dos balões de informações
            $('.baloes').css({ 'width': 410, 'height': 510 });
            $('.baloes').toggle('slide', { direction: 'right' }, 330);
            if ($(this).css('right') == '225px') {
                $(this).css('right', 5);
            } else {
                $(this).css('right', 225);
            }
            $(this).toggleClass('fa-arrow-right fa-arrow-left');
            setTimeout(function () {
                $('.baloes').css({ 'width': 0, 'height': 0 });
            }, 401);
        }
    });

    $('.toggleComentar').click(function () {
        $(this).toggle('slide', { direction: 'right' }, 400);
        $('.naoCarregando').toggle('slide', { direction: 'right' }, 400);
        $('.comentar').toggle('slide', { direction: 'right' }, 400);
    });

    setTimeout(function () {
        $('#collapse').click(function () {
            $('#MenuC').slideToggle();
            $('#MenuC').empty();
            $('#MenuC').html($('<ul></ul>').append($('nav > ul').html()));
        });
        updateNav();
    }, 500);

    $(window).on('resize', function () {
        updateNav();
    });

    $('img').attr('alt', 'Não foi possível carregar a imagem, recarregue a página ou baixe a imagem para ver');
    $('img').css({ 'font-size': 13, 'text-align': 'center' });

    if (url == 'gifs') {
        $('img').on('mousedown contextmenu', function (e) {
            e.preventDefault();
        });

        $('img').on('load', function () {
            $(this).siblings('.loader').remove();
        });

        $('.backimg').click(function (e) {
            if (!(e.target.tagName === 'IMG') && !(e.target.tagName == 'I')) return;

            var img = $(this).children('.gif').children('img')[0];
            var src = $(img).attr('src').replace('/sprite', '').replace('.png', '.gif');
            $(img).attr('src', src);

            $(img).siblings('i').removeClass();
            $(img).siblings('i').addClass('loader');
        });
    }
});

function updateNav() {
    if ($(window).width() <= 800) {
        $('nav > ul').hide();
        $('#collapse').show();
    } else {
        $('#collapse').hide();
        $('nav > ul').show();
        $('#MenuC').hide();
    }
}

//  MUDANDO TEXTO DE "AtivarTodos"

var url = location.pathname.substring(1).split('.')[0];
if (url == 'gifs') {
    $('.ativarTodos').html('Ativar todos');
    $('.ativarTodos').css('padding', '15');
}

if (url == 'imagens') {
    $('.ativarTodos').remove();
    $('.comentar').css('top', 37);
    $('.toggleComentar').css('top', 0);
    $('.naoCarregando').css('top', 0);
    $('.qntAudios').css('top', 37);
    $('.qntGIF').css('top', 74);
    $('.qntImg').css('top', 111);

    $('.backimg').css('height', 244);
    $('.backimg').css('width', 270);
}