var express = require("express");
var app = express(); //產生Express Application 物件

//連線到伺服器的根目錄/public
app.use(express.static(__dirname + '/public'));

//將頁面title存在陣列中
var pages = ['about', 'product', 'service', 'news', 'contact'];

//將存放的title頁面指定導向首頁
for(var i=0 ; i<pages.length ; i++){
    app.get('/'+ pages[i] , function(req, res){
        res.sendFile(__dirname + "/public/index.html")
    })
}

app.listen(80, function(){
    console.log("啟動")
})

