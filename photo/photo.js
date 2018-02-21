$(function () {
    draw_album();
})

function draw_album() {
    $.getJSON("../photo/photos.json", function (data) {

        let htmlstr = album_render_function(data);
        let $albumContainer = $(".album-container");
        $albumContainer.html(htmlstr);
        goto_albums();
        $albumContainer.find("a.lightbox-link").fancybox();


        let $imagesContainer = $(".album-detail");
        $albumContainer.find("span[data-album]").click(function () {
            var e = $(this);
            let albumId = e.attr("data-album");

            for (let i = 0; i < data.length; i++) {
                if (data[i].id == albumId) {

                    let imagesHtmlStr = img_render_function(data[i].photos, data[i].prefix, data[i].classname);
                    $imagesContainer.html(imagesHtmlStr);
                    $(".images-container .album-title h2").html(data[i].title);
                    goto_images();

                    $imagesContainer.find("a.lightbox-link").fancybox({
                        "hideOnOverlayClick":false
                    });

                }
            }
        });

    });
}


function goto_images() {
    $(".album-container").hide();
    $(".images-container").show();
}
function goto_albums() {
    $(".images-container").hide();
    $(".album-container").show();
}

function changeDisplayModel(model) {
    var $imageItem = $(".album-detail .image");
    $imageItem.removeClass("col-1");
    $imageItem.removeClass("col-2");
    $imageItem.removeClass("col-3");
    $imageItem.removeClass("col-4");
    $imageItem.addClass(model);
}

function album_render_function(data) {
    let albumn_htmlstr = "";
    for (let i = 0; i < data.length; i++) {
        albumn_htmlstr += album_item_render_function(data[i]);
    }
    return albumn_htmlstr;
}

function album_item_render_function(album){
    let img_href = album.prefix + album.cover;
    let htmlstr ='<div class="album">';
    htmlstr +='<div class="thumbnail">';
    htmlstr += '<a  class="lightbox-link" rel="album" href="' + img_href + '" title="' + album.description+'">';
    htmlstr +='<img src="' + img_href + '">';
    htmlstr +='</a>';
    htmlstr +='<div class="caption">';
    htmlstr +='<span data-album="'+ album.id +'">' + album.title + '</span>';
    htmlstr += '</div>';
    htmlstr += '</div>';
    htmlstr += '</div>';
    return htmlstr;
}

function img_render_function(images, prefix,classname) {
    let albumn_htmlstr = "";
    for (let i = 0; i < images.length; i++) {
        albumn_htmlstr += img_item_render_function(images[i], prefix, classname);
    }
    return albumn_htmlstr;
}
function img_item_render_function(image, prefix, classname) {
    let img_href = prefix + image.link;
    let htmlstr = '<div class="image ' + classname +'">';
    htmlstr += '<div class="thumbnail">';
    htmlstr += '<a class="lightbox-link" rel="images" href="' + img_href + '" title="' + image.text +'">';
    htmlstr += '<img src="' + img_href + '">';
    htmlstr += '</a>';
    htmlstr += '<div class="caption">';
    htmlstr += '<p>' + image.text + '</p>';
    htmlstr += '</div>';
    htmlstr += '</div>';
    htmlstr += '</div>';
    return htmlstr;
}

