var btn = document.querySelector(".btn");
var list = document.querySelector(".list");
var data =JSON.parse(localStorage.getItem("thing")) || [];
//從localstorage取出的資料都是string不易讀取資料 故藉此改成array or JSON

//點擊按鈕->資料存在localstorage以及渲染網頁
btn.addEventListener("click",addData);
//點擊刪除->被點擊的事項消失  資料綁定ul
list.addEventListener("click",toggleDone);
updateList(data);

//點擊按鈕->資料存在localstorage
function addData(e){
   //測試功能 console.log("333");
   e.preventDefault();
   //取消原本的預設行為
   var str = document.querySelector(".text").value;
   //能否取得輸入代辦事項的文字內容 測試console.log(str);
   var todo = {
       content: str
   };
   //content:待辦事項  陣列方便操控資料
   data.push(todo);
   //將資料塞進todo陣列裡
   updateList(data);
   //更新待辦事項跑迴圈->設為第幾筆資料
   localStorage.setItem("thing",JSON.stringify(data));
   //將待辦事項存在localstorage並字串化  因為localstorage只會存字串資料
};

//更新渲染代辦事項
function updateList(items){
    text = '';
    var len = items.length;
    for(var i = 0;len > i; i++){
        text += '<li><a href="#" data-index=' + i + ' />刪除</a> <span>' + items[i].content + '</span></li>';
    } 
    //data-index='i'->方便取哪一筆資料 刪除功能與其每一筆資料吻合

    list.innerHTML = text; 
    //渲染網頁
};

//刪除資料
function toggleDone(e){
    e.preventDefault();
    if(e.target.nodeName !== 'A'){return};
    //如果點選的nodeName性質不是a連結（刪除） 則中斷
    var index = e.target.dataset.index;
    //index->data-index
    data.splice(index, 1);
    //刪除  以index為起點 刪除一筆資料
    localStorage.setItem("thing",JSON.stringify(data));
    updateList(data);
};

