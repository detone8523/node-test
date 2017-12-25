function pageChange(url){
    // XMLHttpRequest為原生物件，專門用來和伺服器做連線
    var req = new XMLHttpRequest();
    //設定連線方式和連線網址
    req.open("get", url);
    //load事件，偵測連線的狀態
    req.onload = function(){
        var content = document.getElementById("content");
        content.innerHTML = req.responseText;
    };
    //送出連線
    req.send();
}

function loadingShow(callback){
    //loading動畫開始
    $(".loading-block").animate({height:'100%'},600,function(){
        //轉場更換資料
        pageChange(callback);
        $(this).animate({top:'100%'},900,function(){
            //loading動畫結束
            $(this).css({'height':'0','top':'0'});
        });
    });
}

$(function(){
    //載入頁面時，判斷pathname是否為首頁，並置換state
    var pathName = location.pathname.replace(/\//g, '')
    if(pathName == '' || pathName == 'index.html'){
        loadingShow('home.html');
        history.replaceState({ title : 'index'}, '', '');
    }
    else{
        loadingShow(pathName+'.html');
        history.replaceState({ title : pathName}, '', '');
    }
    
    $('header li').on('click', function(){
        var thisId = $(this).attr('id');
        //根據li的id給予pageChange檔案名稱
        loadingShow(thisId + '.html');
        
        //更換
        history.pushState({ title : thisId }, "", thisId);
    })
})

window.onpopstate = function(event){
    if(event.state.title == 'index'){
        loadingShow('home.html')
    }
    else{
        loadingShow(event.state.title+'.html');
    }
}

