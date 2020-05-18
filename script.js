//let main = document.querySelector('.main');
var arrOfStates = [];
var classButtons = document.querySelector('#addCategories');
var urlcategories = 'http://api.icndb.com/categories';
var urlrandom = 'https://api.chucknorris.io/jokes/random';
var urlanimal = 'https://api.chucknorris.io/jokes/random?category=animal';
var urlcareer = 'https://api.chucknorris.io/jokes/random?category=career';
var urlcelebrity = 'https://api.chucknorris.io/jokes/random?category=celebrity';
var urldev = 'https://api.chucknorris.io/jokes/random?category=dev';
var urlquerySearch = 'https://api.chucknorris.io/jokes/search?query=';
var GlobalArrayOfFavorites = [];



window.onload = function(){  
  if (JSON.parse(localStorage.getItem('CurrentState')) != undefined){
    var NewStateArr = JSON.parse(localStorage.getItem('CurrentState'))
    RememberLast(NewStateArr);
  }
  if (JSON.parse(localStorage.getItem('FavoriteTab')) != undefined){
    var LikedTabs = JSON.parse(localStorage.getItem('FavoriteTab'))
    RememberLikedTabs(LikedTabs,LikedTabs.length);
  }
  randomFact();
}

function RememberLast(arr){
    document.getElementById('exampleRadios2').checked = arr[0]
    document.getElementById("btnid0").setAttribute("class", arr[1]);
    document.getElementById("btnid1").setAttribute("class", arr[2]);
    document.getElementById("btnid2").setAttribute("class", arr[3]);
    document.getElementById("btnid3").setAttribute("class", arr[4]);

    document.getElementById('gridCheck1').checked = arr[5];
    document.getElementById('gridCheck1Input').value = arr[6];
    document.getElementById('exampleRadios1').checked = arr[7];
    if (arr[6] != ''){
      document.getElementById("gridCheck1Input").setAttribute('class','form-control SearchInput');
    }


    /* document.getElementById("btnid0").setAttribute("class", "btn btn-secondary");
  document.getElementById("btnid1").setAttribute("class", "btn btn-secondary");
  document.getElementById("btnid2").setAttribute("class", "btn btn-secondary");
  document.getElementById("btnid3").setAttribute("class", "btn btn-secondary");
    */

}

function randomFact(urlgiven) {
    // We call the Web Service via AJAX
    var xmlhttp = new XMLHttpRequest();
    var url = '';   
    /*if(document.querySelector('.RadioRandom').labels[0].control.checked == true){
      url = urlrandom;
    }*/
    if(document.getElementById("btnid0").className == 'btn btn-secondary'){
      url = urlanimal;
    }
    if(document.getElementById("btnid1").className == 'btn btn-secondary'){
      url = urlcareer;
    }
    if(document.getElementById("btnid2").className == 'btn btn-secondary'){
      url = urlcelebrity;
    }
    if(document.getElementById("btnid3").className == 'btn btn-secondary'){
      url = urldev;
    }
    if(document.querySelector("#gridCheck1Input").value != ''){
      url = urlquerySearch+document.querySelector("#gridCheck1Input").value;
    }
    if(document.getElementById('exampleRadios1').checked == true){
      url = urlrandom;
    }



    xmlhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        //if(this.status == 200) {
        var json = JSON.parse(this.responseText);
        // We parse the JSON response
        //if(document.querySelector('.RadioRandom').labels[0].control.checked == true){
          giveRando(json);
        //}
        //parseJson(json);
      }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

document.querySelector(".categoriesSelector").addEventListener('click',function(){
  document.getElementById("btnid0").setAttribute("class", "btn btn-secondary");
  document.getElementById("btnid1").setAttribute("class", "btn btn-secondary");
  document.getElementById("btnid2").setAttribute("class", "btn btn-secondary");
  document.getElementById("btnid3").setAttribute("class", "btn btn-secondary");
})

document.querySelector(".GenerateJoke").addEventListener('click',function(){
  //if (document.querySelector('.RadioRandom').labels[0].control.checked == true){
    arrOfStates.push(document.getElementById('exampleRadios2').checked)//!!!!!
    arrOfStates.push(document.getElementById("btnid0").className);//!!!!!
    arrOfStates.push(document.getElementById("btnid1").className)
    arrOfStates.push(document.getElementById("btnid2").className);
    arrOfStates.push(document.getElementById("btnid3").className);
    arrOfStates.push(document.getElementById('gridCheck1').checked);
    arrOfStates.push(document.getElementById('gridCheck1Input').value);
    arrOfStates.push(document.getElementById('exampleRadios1').checked)
    localStorage.setItem('CurrentState',JSON.stringify(arrOfStates));


    randomFact();
  //}
})


function giveRando(json) {
  if (document.getElementById('gridCheck1Input').value != ''){
    var random = Math.floor(Math.random() * (Math.floor(json.result.length) - Math.ceil(0) + 1)) + Math.ceil(0);
    document.querySelector('.joketext').innerHTML = json.result[random].value;
    if (json.result[random].categories.length == 0){
      document.querySelector(".topicktext").innerHTML = 'RANDOM';
    }
    if (json.result[random].categories.length != 0){
      document.querySelector(".topicktext").innerHTML = json.result[random].categories;
    }
    document.querySelector("#linkid").innerHTML = "ID:"+json.result[random].id;
    document.querySelector("#linkid").href = json.result[random].id;
    document.querySelector("#TimeCount").innerHTML = "Last update: "+(parseInt(json.result[random].updated_at)-parseInt(json.result[random].created_at))+" hours ago";
  }
  else {
    document.querySelector('.joketext').innerHTML = json.value;
    if (json.categories[0] != undefined){
      document.querySelector(".topicktext").innerHTML = json.categories[0];
    }
    if (json.categories[0] == undefined){
      document.querySelector(".topicktext").innerHTML = 'RANDOM';
    }
    
    document.querySelector("#linkid").innerHTML = "ID:"+json.id;
    document.querySelector("#linkid").href = json.id;
    document.querySelector("#TimeCount").innerHTML = "Last update: "+(parseInt(json.updated_at)-parseInt(json.created_at))+" hours ago";

  }
  document.querySelector(".topicktext").style.textAlign = "right";
}


  /*function giveBack(json) {
    for (let i =0;i < json.value.length;i++){
      var buttonelement = document.createElement('button');
      buttonelement.setAttribute("type", "button");
      buttonelement.setAttribute("class", "btn btn-secondary disabled");
      buttonelement.setAttribute("id", "btnid"+i);
      buttonelement.innerHTML = json.value[i];
      classButtons.appendChild(buttonelement);
    }
    
  }*/

  document.getElementById("btnid0").addEventListener('click',function(){
    document.getElementById("btnid0").setAttribute("class", "btn btn-secondary");
    document.getElementById("btnid1").setAttribute("class", "btn btn-secondary disabled");
    document.getElementById("btnid2").setAttribute("class", "btn btn-secondary disabled");
    document.getElementById("btnid3").setAttribute("class", "btn btn-secondary disabled");
    document.querySelector(".categoriesSelector").control.checked = 'true';
    document.querySelector("#exampleRadios1").checked = false;
    document.getElementById("gridCheck1").checked = false;
    document.getElementById("gridCheck1Input").setAttribute('class','form-control SearchInput invisible');
    document.getElementById("gridCheck1Input").value = '';

    
    
  })

  document.getElementById("btnid1").addEventListener('click',function(){
    document.getElementById("btnid1").setAttribute("class", "btn btn-secondary");
    document.getElementById("btnid0").setAttribute("class", "btn btn-secondary disabled");
    document.getElementById("btnid2").setAttribute("class", "btn btn-secondary disabled");
    document.getElementById("btnid3").setAttribute("class", "btn btn-secondary disabled");
    document.querySelector(".categoriesSelector").control.checked = 'true';
    document.querySelector("#exampleRadios1").checked = false;
    document.getElementById("gridCheck1").checked = false;
    document.getElementById("gridCheck1Input").setAttribute('class','form-control SearchInput invisible');
    document.getElementById("gridCheck1Input").value = '';
  })

  document.getElementById("btnid2").addEventListener('click',function(){
    document.getElementById("btnid2").setAttribute("class", "btn btn-secondary");
    document.getElementById("btnid0").setAttribute("class", "btn btn-secondary disabled");
    document.getElementById("btnid1").setAttribute("class", "btn btn-secondary disabled");
    document.getElementById("btnid3").setAttribute("class", "btn btn-secondary disabled");
    document.querySelector(".categoriesSelector").control.checked = 'true';
    document.querySelector("#exampleRadios1").checked = false;
    document.getElementById("gridCheck1").checked = false;
    document.getElementById("gridCheck1Input").setAttribute('class','form-control SearchInput invisible');
    document.getElementById("gridCheck1Input").value = '';
  })

  document.getElementById("btnid3").addEventListener('click',function(){
    document.getElementById("btnid3").setAttribute("class", "btn btn-secondary");
    document.getElementById("btnid0").setAttribute("class", "btn btn-secondary disabled");
    document.getElementById("btnid1").setAttribute("class", "btn btn-secondary disabled");
    document.getElementById("btnid2").setAttribute("class", "btn btn-secondary disabled");
    document.querySelector(".categoriesSelector").control.checked = 'true';
    document.querySelector("#exampleRadios1").checked = false;
    document.getElementById("gridCheck1").checked = false;
    document.getElementById("gridCheck1Input").setAttribute('class','form-control SearchInput invisible');
    document.getElementById("gridCheck1Input").value = '';
  })
  
  document.querySelector('#gridCheck1').addEventListener('click',function(){
    document.querySelector('#gridCheck1Input').setAttribute('class','form-control SearchInput');
    document.getElementById("btnid0").setAttribute("class", "btn btn-secondary disabled");
    document.getElementById("btnid1").setAttribute("class", "btn btn-secondary disabled");
    document.getElementById("btnid2").setAttribute("class", "btn btn-secondary disabled");
    document.getElementById("btnid3").setAttribute("class", "btn btn-secondary disabled");
    document.querySelector('#exampleRadios2').checked = false;
    document.querySelector('#exampleRadios1').checked = false;

    
  })

  document.querySelector('#exampleRadios1').addEventListener('click',function(){
    document.querySelector('#exampleRadios2').checked = false;
    document.getElementById("btnid0").setAttribute("class", "btn btn-secondary disabled");
    document.getElementById("btnid1").setAttribute("class", "btn btn-secondary disabled");
    document.getElementById("btnid2").setAttribute("class", "btn btn-secondary disabled");
    document.getElementById("btnid3").setAttribute("class", "btn btn-secondary disabled");
    document.getElementById("gridCheck1").checked = false;
    document.getElementById("gridCheck1Input").setAttribute('class','form-control SearchInput invisible');
    document.getElementById("gridCheck1Input").value = '';
  });


document.getElementById('heartid').addEventListener('click',function(){
  var OneFavorite = [];
  document.getElementById('heartid').setAttribute('class','fa fa-heart');
  OneFavorite.push(document.querySelector('#linkid').innerHTML);
  OneFavorite.push(document.querySelector('#linkid').innerHTML);
  OneFavorite.push(document.querySelector('.joketext').innerHTML);
  OneFavorite.push(document.querySelector('.topicktext').innerHTML);
  OneFavorite.push(document.querySelector('#TimeCount').innerHTML);
  if (JSON.parse(localStorage.getItem('FavoriteTab')) != undefined){
    GlobalArrayOfFavorites = JSON.parse(localStorage.getItem('FavoriteTab'));
  }
  GlobalArrayOfFavorites.push(OneFavorite);
  

  localStorage.setItem('FavoriteTab',JSON.stringify(GlobalArrayOfFavorites));
  /*funcStart */
  //DrawLiked(OneFavorite);
  //RememberLikedTabs(OneFavorite);
  RememberLikedTabs(GlobalArrayOfFavorites,GlobalArrayOfFavorites.length);
  /*funcEnd */
  //localStorage.setItem('FavoriteTab',JSON.stringify(GlobalArrayOfFavorites));
})

var ok = true;
function RememberLikedTabs(OneFavorite,len){
//function DrawLiked(OneFavorite,len){
  var AllColumn = document.querySelector('.secondcol');
//document.querySelector('.secondcol').children.length-
var arrleng = document.querySelector('.secondcol').children.length-1;
  for (let i =arrleng;i >= arrleng-(len-2);i--){
    if (AllColumn.children[i] == undefined){
      break;
    }
    if (AllColumn.children[i].className == 'row justify-content-center' ){
      AllColumn.removeChild(AllColumn.lastChild);
    }
  }

  for (let i =0;i <OneFavorite.length;i++){
  var SecondRow = document.createElement('div');
  SecondRow.setAttribute("class", "row justify-content-center");

  var CardBody = document.createElement('div');
  CardBody.setAttribute("class", "card-body");
  CardBody.style.border = '1px solid #F8F8F8';
  CardBody.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
  CardBody.style.borderRadius = '10px';
  CardBody.style.display = 'flex';
  CardBody.style.flexDirection = 'row';
  CardBody.style.backgroundColor = '#fff';
  CardBody.style.width = 'auto';
  
  
  
  var AskFont = document.createElement('div');
  AskFont.setAttribute("class", "askfont");

  var AskFontI = document.createElement('i');
  AskFontI.setAttribute("class", "fa fa-comments-o");
  AskFontI.setAttribute("aria-hidden", "true");

  var AllContent = document.createElement('div');
  AllContent.setAttribute("class", "allcontent");
  AllContent.style.display = 'flex';
  AllContent.style.flexDirection = 'column';
  AllContent.style.paddingLeft = '40px';
  AllContent.style.width = '405px';
  //AllContent.style.height = '190px';//---------------------------------------
  AllContent.style.height = 'auto';//---------------------------------------
  AllContent.style.left = '240px';//???
  AllContent.style.top = '602px';//???
  AllContent.style.fontFamily = 'Roboto';
  AllContent.style.fontStyle = 'normal';
  AllContent.style.fontWeight = '500';
  AllContent.style.size = '10px';
  AllContent.style.lineHeight = '14px';
  AllContent.style.color = '#ABABAB';


  /*width: 405px;
  height: 24px;
  left: 240px;
  top: 602px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  color: #ABABAB;*/


  var IdLink = document.createElement('div');
  IdLink.setAttribute("class", "allcontent");
  //IdLink.style.width = '405px';
  //IdLink.style.height = '24px';
  //IdLink.style.fontFamily = 'Roboto';
  //IdLink.style.fontStyle = 'normal';
  //IdLink.style.fontWeight = '500';
  //IdLink.style.fontSize = '10px';
  //IdLink.style.fontSize = '14px';
  //IdLink.style.color = '#ABABAB';
  
  var P1 = document.createElement('p');

  var Alinkid = document.createElement('a');
  Alinkid.setAttribute("id", "linkid");
  Alinkid.setAttribute("href", OneFavorite[i][0]);
  Alinkid.innerHTML = OneFavorite[i][1];
  Alinkid.style.fontSize = '10px';
  Alinkid.style.textAlign = 'left';
  

  var Joketext = document.createElement('div');
  Joketext.setAttribute("class", "joketext");


  var P2 = document.createElement('p');
  P2.innerHTML = OneFavorite[i][2];
  P2.style.fontSize = '1rem';
  P2.style.fontWeight = '400';
  P2.style.lineHeight = '1.5';
  P2.style.color = '#212529';
  P2.style.textAlign = 'left';

  var Topicktext = document.createElement('div');
  Topicktext.setAttribute("class", "topicktext");


  var P3 = document.createElement('p');
  P3.innerHTML = OneFavorite[i][3];  
  P3.style.textAlign = 'right';
  P3.style.fontSize = '1rem';
  P3.style.fontWeight = '400';
  P3.style.lineHeight = '1.5';
  P3.style.color = '#212529';


  var CreatedAt = document.createElement('div');
  CreatedAt.setAttribute("class", "createdAt");

  var P4 = document.createElement('p');
  P4.setAttribute("id", "TimeCount");
  P4.innerHTML = OneFavorite[i][4];  
  P4.style.fontSize = '1rem';
  P4.style.fontWeight = '400';
  P4.style.lineHeight = '1.5';
  P4.style.color = '#212529';
  P4.style.textAlign = 'left';

  var Likefont = document.createElement('div');
  Likefont.setAttribute("class", "likefont");

  var LikefontI = document.createElement('i');
  LikefontI.setAttribute("class", "fa fa-heart");
  LikefontI.setAttribute("aria-hidden", "true");
  LikefontI.setAttribute("id", "heartid");
  LikefontI.style.textAlign = 'right';
  LikefontI.addEventListener('click',function(event){
    AllColumn.removeChild(event.target.parentElement.parentElement.parentElement);
    for (let j =0;j <OneFavorite.length;j++ ){
      if (OneFavorite[j][0] == event.target.parentElement.parentElement.childNodes[1].childNodes[0].innerText){
        OneFavorite.splice(j, 1);
        localStorage.setItem('FavoriteTab',JSON.stringify(OneFavorite));
        //array.splice(index, 1);
      }
    }
    //OneFavorite
  });

  AllColumn.appendChild(SecondRow);
  SecondRow.appendChild(CardBody);
  CardBody.appendChild(AskFont);
  AskFont.appendChild(AskFontI);
  CardBody.appendChild(AllContent);
  AllContent.appendChild(IdLink);
  IdLink.appendChild(P1);
  P1.appendChild(Alinkid);
  AllContent.appendChild(Joketext);
  Joketext.appendChild(P2);
  AllContent.appendChild(Topicktext);
  Topicktext.appendChild(P3);
  AllContent.appendChild(CreatedAt);
  CreatedAt.appendChild(P4);
  CardBody.appendChild(Likefont);
  Likefont.appendChild(LikefontI);
  }
}

/*function RememberLikedTabs(arr,len){
  for (let i =0;i <len;i++){
    DrawLiked(arr[i],len);
  }
}*/



/*<div class="card-body">
      <div class="askfont">
        <i class="fa fa-comments-o" aria-hidden="true"></i>
      </div>
      <div class="allcontent">
        <div class="idlink">
          <p><a id ='linkid' href="https://www.google.com/webhp?authuser=1">https://www.google.com/webhp?authuser=1</a></p>
        </div>
        <div class="joketext">
          <p>TextTextTextTextTextTextTextTextTextTextTextTextTextText</p>
        </div>
        <div class="topicktext">
          <p>topic</p>
        </div>
        <div class="createdAt">
          <p id = "TimeCount">LastUpdate<p>
        </div>
      </div>
      <div class="likefont">
        <i class="fa fa-heart-o" id='heartid' aria-hidden="true"></i>
      </div>
  </div>
*/



  function parseJson(json) {
    var fact = "<b>" + json["value"].joke + "</b>";
    document.getElementById("data").innerHTML = fact;
  }

  // Finally we add a click event listener on the logo of Chuck Norris
  // to load a new random fact when the user will click on it
  /*document.getElementById("logo").addEventListener("click", function() {
    randomFact();
  });*/

//randomFact();


 