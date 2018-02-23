$(function () {
    draw_album();
})

function draw_album() {
    $.getJSON("../photo/photos.json", function (data) {

        let htmlstr = album_render_function(data);
        let $albumContainer = $(".album-container");
        $albumContainer.html(htmlstr);
        goto_albums();
        $albumContainer.find("[data-album]").click(function () {
            showAlbumDetail(this,data);
        });
    });
}

function showAlbumDetail(element,data) {
    let $imagesContainer = $(".album-detail");
    var e = $(element);
    let albumId = e.attr("data-album");
    

    for (let i = 0; i < data.length; i++) {
        if (data[i].id == albumId) {
            let imageClass = (data[i].classname == null || data[i].classname == "") ? "col-2" : data[i].classname;
            let imagesHtmlStr = img_render_function(data[i].photos, data[i].prefix, imageClass);
            $imagesContainer.html(imagesHtmlStr);
            $(".images-container .album-title h2").html(data[i].title);
            goto_images();

            $imagesContainer.find("a.lightbox-link").fancybox({
                "hideOnOverlayClick": false
            });

        }
    }
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
    htmlstr += '<a  data-album="' + album.id + '" title="' + album.title+'">';
    htmlstr +='<img src="' + img_href + '">';
    htmlstr +='</a>';
    htmlstr += '<div class="caption">';
    htmlstr += '<span data-album="' + album.id + '">' + album.title + ' ' + album.photos.length + '</span>';
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
    htmlstr += '<p>' + (image.text == null) ? "" : image.text + '</p>';
    htmlstr += '</div>';
    htmlstr += '</div>';
    htmlstr += '</div>';
    return htmlstr;
}

