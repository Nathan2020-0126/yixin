

var qiniu = require('qiniu');
let accessKey="B_txmassPvlVLvyt08k1s0oEZKZJD2-czzqvta4d";
let secretKey="di-j-8xiWwK2_2T69OaHnnp316F-2dSq3pJYohKo";

var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var config = new qiniu.conf.Config();
//config.useHttpsDomain = true;
config.zone = qiniu.zone.Zone_z0;
var bucketManager = new qiniu.rs.BucketManager(mac, config);

var bucket = 'yiyi';
// @param options 列举操作的可选参数
//                prefix    列举的文件前缀
//                marker    上一次列举返回的位置标记，作为本次列举的起点信息
//                limit     每次返回的最大列举文件数量
//                delimiter 指定目录分隔符
var options = {
  limit: 10,
  prefix: '2017/',
};
bucketManager.listPrefix(bucket, options, function(err, respBody, respInfo) {
  if (err) {
    console.log(err);
    throw err;
  }
  if (respInfo.statusCode == 200) {
    //如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
    //指定options里面的marker为这个值
    var nextMarker = respBody.marker;
    var commonPrefixes = respBody.commonPrefixes;
    console.log(nextMarker);
    console.log(commonPrefixes);
    var items = respBody.items;

    const fs = require("fs");
    const path = "../../photos";
  

    fs.readdir(path, function (err, files) {
        if (err) {
            return;
        }

        items.forEach(function(item) {
            console.log(item.key);
            fs.stat(path + "/" + item.key, function (err, stats) {
                if (err) {
                    return;
                }
                if (stats.isFile()) {
                    arr.push(item.key);
                }
            })
            // console.log(item.putTime);
            // console.log(item.hash);
            // console.log(item.fsize);
            // console.log(item.mimeType);
            // console.log(item.endUser);
            // console.log(item.type);
          });
          fs.writeFile("output.json", JSON.stringify(arr, null, "\t"));

    });




  } else {
    console.log(respInfo.statusCode);
    console.log(respBody);
  }
});