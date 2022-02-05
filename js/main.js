const bgImg = new Image();

window.onload = function(){
  // チーム分け背景画像読み込み
  bgImg.src = "image/background.jpg";
  // Canvas準備
  var canvas = document.getElementById("preview");
  var ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 200;
  // 背景画像読込後にCanvasに描画
  bgImg.onload = () => {
    canvas.width = bgImg.width;
    canvas.height = bgImg.height;
    ctx.drawImage(bgImg, 0, 0);
  }
}

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// 完全ランダムチーム分け
function randomMatch(){
  // ユーザリストの取得
  var userlist = getUserList();
  // ランダムにチームを振り分ける
  var teamlist = createTeamList();
  // チーム毎に平均値を算出する
  var averageList = calcAverageELO(userlist, teamlist);

  // 画像に出力する
  outputTeam(userlist, teamlist, averageList);
}

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// ELOを考慮したチーム分け
function eloMatch(){
  var userlist = [];
  var teamlist = [];
  var averagelist = [];
  var teamlistGood = [0,0,0,0,0,0,0,0,0,0];     // 最良チーム
  var diffELOGood = 99999999;                   // 最良チームのELO差異

  // ユーザリストの取得
  userlist = getUserList();
  // ELOの数値を若干ランダム化する
  var ELORANDOM = 0.05;         // ELOのランダム化範囲
  for (var i = 0; i < userlist.length; i++){
    var plusflg = Math.floor(Math.random()*2);
    var plusnum = Math.floor(Math.random()*Number(userlist[i][1])*ELORANDOM);
    if(plusflg == 0){
      userlist[i][1] = Number(userlist[i][1]) + plusnum;
    }else{
      userlist[i][1] = Number(userlist[i][1]) - plusnum;
    }
  }

  // 毎回同じチームにならないように完全ランダムのチーム分けを[loop]回数行って、
  // 2チームのELO合計値の差が一番小さくなるものを出力する。
  for (var loop = 0; loop < 10; loop++){
    // ランダムにチームを振り分ける
    teamlist = createTeamList();
    // チーム毎に平均値を算出する
    averagelist = calcAverageELO(userlist, teamlist);

    // チームの平均が近ければ採用する
    if(diffELOGood > Math.abs(averagelist[0] - averagelist[1])){
      diffELOGood = Math.abs(averagelist[0] - averagelist[1]);
      teamlistGood = teamlist;
    }
  }
  // 画像に出力する
  outputTeam(userlist, teamlistGood, calcAverageELO(userlist, teamlistGood));
}

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// 画面からユーザリストを取得して返す
function getUserList(){
  var userlist = [
    [document.getElementById("username1").value,  document.getElementById("userelo1").value],
    [document.getElementById("username2").value,  document.getElementById("userelo2").value],
    [document.getElementById("username3").value,  document.getElementById("userelo3").value],
    [document.getElementById("username4").value,  document.getElementById("userelo4").value],
    [document.getElementById("username5").value,  document.getElementById("userelo5").value],
    [document.getElementById("username6").value,  document.getElementById("userelo6").value],
    [document.getElementById("username7").value,  document.getElementById("userelo7").value],
    [document.getElementById("username8").value,  document.getElementById("userelo8").value],
    [document.getElementById("username9").value,  document.getElementById("userelo9").value],
    [document.getElementById("username10").value, document.getElementById("userelo10").value],
  ];
  return userlist
}

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// ランダムにチーム分けを行った結果を返す（0:Aチーム、1:Bチーム）
function createTeamList(){
  var teamlist = [0,0,0,0,0,0,0,0,0,0];
  while( 5 > sum(teamlist)){
    var rand = Math.floor(Math.random()*10);
    teamlist[rand] = 1;
  }
  return teamlist;
}

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// リスト内合計値計算
var sum = function(arr){
  var total = 0, i = 0, len = 0;
  if(Object.prototype.toString.call(arr) !== '[object Array]') return;
  for (i = 0, len = arr.length; i < len; i++) { total += arr[i]; }
  return total;
};

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// チーム毎に平均値を算出する（list[Aチーム, Bチーム])
function calcAverageELO(userlist, teamlist){
  var averageList = [0,0];
  var aTeam = 0;
  var bTeam = 0;
  for(var i = 0; i < userlist.length; i++){
    if(teamlist[i] == 0){
      aTeam = Number(aTeam) + Number(userlist[i][1]);
    }
    else{
      bTeam = Number(bTeam) + Number(userlist[i][1]);
    }
  }
  aTeam = (aTeam / 5);
  bTeam = (bTeam / 5);
  aTeam.toFixed(1);   //小数点1桁に整形
  bTeam.toFixed(1);
  averageList = [aTeam, bTeam];
  return averageList;
} 

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// 画面にチーム振り分けの結果を出力する
function outputTeam(userlist, teamlist, averagelist){
  // CANVAS準備
  var canvas = document.getElementById("preview");
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 500, 200);
  ctx.drawImage(bgImg, 0, 0)
  ctx.font = '20px sans-serif';
  ctx.fillStyle = '#87ceeb';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';

  // 座標指定
  var alphax1 = 10;
  var alphax2 = 80;
  var bravox1 = 260;
  var bravox2 = 320;
  var y = 50;

  // 画面に出力
  ctx.fillText("Aチーム　ave:" + averagelist[0], alphax1, 10);
  for(var i = 0; i < userlist.length; i++){
    if(teamlist[i] == 0){
      ctx.fillText(userlist[i][1], alphax1, y);
      ctx.fillText(userlist[i][0], alphax2, y, 150);
      y = y + 30;
    }
  }
  y = 50;                       // 座標初期化
  ctx.fillStyle = '#f08080';    //　色変更
  ctx.fillText("Bチーム　ave:" + averagelist[1], bravox1, 10);
  for(var i = 0; i < userlist.length; i++){
    if(teamlist[i] == 1){
      ctx.fillText(userlist[i][1], bravox1, y);
      ctx.fillText(userlist[i][0], bravox2, y, 150);
      y = y + 30;
    }
  }
}

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// ELOを取得する処理（未実装）
// クロスドメイン対策でheroku上にseleniumで値を取得するアプリケーションを用意して
// そこ経由でELOを取得する
$(function(){
  $(document).ajaxSend(function() {
    $("#overlay").fadeIn(300);　
  });

  $("#gelo").on("click", function(event){
    let id = $("#userelo1").val();
    $.ajax({
      type: "GET",
      url: "https://reshtml.herokuapp.com/",
      data: { "id" : id }
      //,dataType : "json"
    }).done(function(data){
      setTimeout(function(){
        $("#overlay").fadeOut(300);
      },500);
      alert(data);
    }).fail(function(XMLHttpRequest, status, e){
      alert(e);
    });
  });
});