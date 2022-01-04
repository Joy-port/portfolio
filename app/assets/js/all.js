AOS.init({
  once: true,
});

const cardList = document.querySelector('.card-list');
const category = document.querySelectorAll('.js-category');

let data = [
  {
    date: new Date(20211110).getTime(),
    title: "Taiwan UBiker",
    type: "websites",
    description: "使用 javascript 與 TDX API 資料串連，顯示台灣各地自行車景點或是附近自行車站點",
    ghPage: "https://github.com/Joy-port/taiwan-Ubiker/",
    siteLink:"https://joy-port.github.io/taiwan-Ubiker/",
    img: "./assets/images/taiwanBike.png",
    like:"",
    icon:"favorite_border",
    likeNum:0
  },
  {
    date: new Date(20220103).getTime(),
    title: "Taiwan Traveler",
    type: "websites",
    description: "使用 Vue Cli 製作單頁式網站，展現旅遊觀光景點",
    ghPage: "https://github.com/Joy-port/travel-guide/",
    siteLink:"https://joy-port.github.io/travel-guide/",
    img: "./assets/images/taiwanTravelVue.png",
    like:"",
    icon:"favorite_border",
    likeNum:0
  },
  {
    date: new Date(20210728).getTime(),
    title: "Exhibinection",
    type: "websites",
    description: "為展覽架設近期相關展覽說明與內容，技術使用 html/css 與 樣板語言 ejs 做樣式管理，加上 bootstrap 5 客製化，為多頁式響應(RWD)靜態網頁",
    ghPage: "https://github.com/Joy-port/week6-exhibinection",
    siteLink:"http://exhibinection.joycheng.io/",
    img: "./assets/images/exhibinection.png",
    like:"",
    icon:"favorite_border",
    likeNum:0
  },
  {
    date: new Date(20210828).getTime(),
    title: "Doyoga",
    type: "websites",
    description: "為瑜伽教室提供課程介紹、課程預約功能之網站，使用 html/css 與 樣板語言 ejs 做樣式管理，加上 bootstrap 5 客製化，為多頁式響應(RWD)靜態網頁",
    ghPage: "https://github.com/Joy-port/week8-doyoga",
    siteLink:"http://doyoga.joycheng.io/",
    img: "./assets/images/doyoga.png",
    like:"",
    icon:"favorite_border",
    likeNum:0,
  },
  {
      date: new Date(20211107).getTime(),
      title: "Taiwan Traveler",
      type: "websites",
      description: "展現台灣觀光旅遊景點，使用 html/css 與 樣板語言 ejs 做樣式管理，加上 bootstrap 5 客製化，為多頁式響應(RWD)靜態網頁",
      ghPage: "https://github.com/Joy-port/thef2e-week1",
      siteLink:"https://joy-port.github.io/thef2e-week1/",
      img: "./assets/images/taiwanTravel.png",
      like:"",
      icon:"favorite_border",
      likeNum:0
  },
  {
    date: new Date(20210807).getTime(),
    title: "Todolist",
    type: "widgets",
    description: "可換樣式顏色的 To Do List清單",
    ghPage: "https://github.com/Joy-port/hex-todolist",
    siteLink:"https://todolist.joycheng.io/",
    img: "./assets/images/todolist.gif",
    like:"",
    icon:"favorite_border",
    likeNum:0
  }
];

//渲染畫面
function update(data){
  let str = '';
  data.forEach(function (item){
    const content = ` <li class="card flex-grow-1" data-title="${item.title}" data-date="${item.date}">
    <div class="CTA-container | js-icon ">
        <a href="#" class="d-flex">
            <span class="material-icons-outlined card-icon ${item.like}" data-icon="like">
                ${item.icon}
            </span>
        </a>
        <a href="${item.ghPage}" class="d-flex">
            <span class="material-icons-outlined card-icon" data-icon="ghPage">
                share
            </span>
        </a>
    </div>
    <img class="card-img-top card-img" src="${item.img}" alt="website img">
    <div class="card-body" >
        <a href="${item.siteLink}" class="card-title stretched-link" target="_blank">${item.title}</a>
        <div class="card-subtitle">${item.type}</div>
        <p class="card-content"> ${item.description}</p>
    </div>
</li>`;

    str += content;
  });
  cardList.innerHTML = str;
  iconListEvents();

}

//監聽類別按鈕
function categoryEvents(){
  category.forEach(function(item, index){
    category[index].addEventListener('click', changeCategory, false);
  });
}
//監聽icon 按鈕 -> 渲染之後才能監聽
function iconListEvents(){
  const iconList = document.querySelectorAll('.js-icon');

  iconList.forEach(function(item, index){
    iconList[index].addEventListener('click', clickLikeBtn, false);
  });
}

//分類按鈕功能
function changeCategory(e){
  e.preventDefault();
  if(e.target.nodeName !== "A"){
  return ;
  };
  const categoryList = e.target.closest("UL").querySelectorAll("li");
  categoryList.forEach(function(item){
  item.setAttribute("class","");
  });

 let filterData = [];
 const categoryType= e.target.dataset.type;

 switch(categoryType){
    case("all"):
      e.target.closest("LI").classList.add('active');
      update(data);
      break;
    case("like"):
      e.target.closest("LI").classList.add('active');
      filterData = data.filter((item)=>{
      return item.like === "selected";
      });
      update(filterData);
      break;
    default:
      e.target.closest("LI").classList.add('active');
      filterData = data.filter((item)=>{
        return e.target.dataset.type === item.type;
        });
      update(filterData);
      break;
 };

}


//愛心按鈕變色+加數量
function clickLikeBtn(e){
  if(e.target.dataset.icon !== "like"){
    return ;
  };
  //換顏色
  let cardTitle = e.target.closest("LI").dataset.title;
  console.log(cardTitle);
  data.forEach(function(item, index){
    e.preventDefault();
  
  if(cardTitle === item.title){
    if(item.like =="selected"){
      item.icon = "favorite_border";
      item.like = "";
      item.likeNum -= 1;
    }else{
      item.like = "selected";
      item.icon = "favorite";
      item.likeNum += 1;
    };
  };

});
  update(data);
  console.log(data);

}

//初始化設定
function init(){
  update(data);
  categoryEvents();
}

init();