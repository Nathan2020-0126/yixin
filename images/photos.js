$.getJSON("photos.json", function (data) {
    console.log(data);
    let htmlstr = album_render_function(data);
  

    $(".img-box-ul").html(htmlstr);
    let img_width=$($("a.img-bg")[0]).width();
    $("a.img-bg").height(img_width);
    $("a.img-bg").fancybox({
        // Options will go here
    });

});


function album_render_function(data) {
    let albumn_htmlstr = "";
    for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        albumn_htmlstr += img_render_function(data[i]);
    }
    return albumn_htmlstr;
}

function img_render_function(img){
  let img_pre_href="http://images.hqglj.com/";
  let img_href="";
  img_href=img_pre_href + img.key;
  let htmlstr='<li><div class="img-box">';
  htmlstr +='<a class="img-bg" rel="example_group" href="' + img_href + '">';
  htmlstr +='<img style="display: inline;" src="' + img_href + '">';
  htmlstr +='</a>';
  htmlstr +='</div></li>';
  return htmlstr;
}

