AOS.init({
  once: true,
});

const cardList = document.querySelector('.card-list');
const category = document.querySelectorAll('.js-category');

let data = [
  {
    date: new Date().getDate(),
    title: "Exhibinection",
    type: "websites",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, odio?",
    ghPage: "https://github.com/Joy-port/week6-exhibinection",
    siteLink:"http://exhibinection.joycheng.io/",
    img: "./assets/images/exhibinection.png",
    like:"",
    icon:"favorite_border",
    likeNum:0
    },
  {
    date: new Date().getDate(),
    title: "Doyoga",
    type: "websites",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, odio?",
    ghPage: "https://github.com/Joy-port/week8-doyoga",
    siteLink:"http://doyoga.joycheng.io/",
    img: "./assets/images/doyoga.png",
    like:"",
    icon:"favorite_border",
    likeNum:0,
    },
  {
    date: new Date().getDate(),
    title: "Todolist",
    type: "widgets",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, odio?",
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
    const content = ` <li class="card" data-title="${item.title}" data-date="${item.date}">
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
 
 let filterData = [];
 if(e.target.dataset.type === "all"){
  console.log("click"); 
  update(data);
  return ;
 }else if(e.target.dataset.type === "like"){
  filterData = data.filter((item)=>{
    return item.like === "selected";
   });
 }else if(e.target.dataset.type!=="like" || e.target.dataset.type!=="all"){
  filterData = data.filter((item)=>{
    return e.target.dataset.type === item.type;
   });
 };
 
 update(filterData);

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