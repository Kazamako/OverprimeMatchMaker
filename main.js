const bgImg = new Image();

window.onload = function(){
    // 背景画像
    bgImg.src = "background.jpg";
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


function randomMatch(){
    // List <- UserName & ELO
   var userlist = [
        [document.getElementById("username1").value, document.getElementById("userelo1").value],
        [document.getElementById("username2").value, document.getElementById("userelo2").value],
        [document.getElementById("username3").value, document.getElementById("userelo3").value],
        [document.getElementById("username4").value, document.getElementById("userelo4").value],
        [document.getElementById("username5").value, document.getElementById("userelo5").value],
        [document.getElementById("username6").value, document.getElementById("userelo6").value],
        [document.getElementById("username7").value, document.getElementById("userelo7").value],
        [document.getElementById("username8").value, document.getElementById("userelo8").value],
        [document.getElementById("username9").value, document.getElementById("userelo9").value],
        [document.getElementById("username10").value, document.getElementById("userelo10").value],
        ];
    
    var randomlist = [];

    // Random
    randomlist = shuffle(userlist);

    // Calc Average ELO
    var alphaELO = (Number(randomlist[0][1]) + Number(randomlist[1][1]) + Number(randomlist[2][1]) + Number(randomlist[3][1]) + Number(randomlist[4][1])) / 5; 
    var bravoELO = (Number(randomlist[5][1]) + Number(randomlist[6][1]) + Number(randomlist[7][1]) + Number(randomlist[8][1]) + Number(randomlist[9][1])) / 5; 

    // CANVAS
    var canvas = document.getElementById("preview");
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 500, 200);
    ctx.drawImage(bgImg, 0, 0)
    ctx.font = '20px Arial';
    ctx.fillStyle = '#F0F0F0';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    // Generate Picture
    var alphax1 = 10;
    var alphax2 = 80;
    ctx.fillText("Aチーム ave:" + alphaELO, alphax1, 10);
    ctx.fillText(randomlist[0][1], alphax1, 50);
    ctx.fillText(randomlist[1][1], alphax1, 80);
    ctx.fillText(randomlist[2][1], alphax1, 110);
    ctx.fillText(randomlist[3][1], alphax1, 140);
    ctx.fillText(randomlist[4][1], alphax1, 170);
    ctx.fillText(randomlist[0][0].substr(0,9), alphax2, 50);
    ctx.fillText(randomlist[1][0].substr(0,9), alphax2, 80);
    ctx.fillText(randomlist[2][0].substr(0,9), alphax2, 110);
    ctx.fillText(randomlist[3][0].substr(0,9), alphax2, 140);
    ctx.fillText(randomlist[4][0].substr(0,9), alphax2, 170);
    var bravox1 = 250;
    var bravox2 = 320;
    ctx.fillText("Bチーム ave:" + bravoELO, bravox1, 10);
    ctx.fillText(randomlist[5][1], bravox1, 50);
    ctx.fillText(randomlist[6][1], bravox1, 80);
    ctx.fillText(randomlist[7][1], bravox1, 110);
    ctx.fillText(randomlist[8][1], bravox1, 140);
    ctx.fillText(randomlist[9][1], bravox1, 170);
    ctx.fillText(randomlist[5][0].substr(0,9), bravox2, 50);
    ctx.fillText(randomlist[6][0].substr(0,9), bravox2, 80);
    ctx.fillText(randomlist[7][0].substr(0,9), bravox2, 110);
    ctx.fillText(randomlist[8][0].substr(0,9), bravox2, 140);
    ctx.fillText(randomlist[9][0].substr(0,9), bravox2, 170);

    // Output
    document.getElementById("kekka").value =
        "Aチーム aveELO : " + alphaELO + "\n" +
        padd(randomlist[0][1]) + " : " + randomlist[0][0] + "\n" + 
        padd(randomlist[1][1]) + " : " + randomlist[1][0] + "\n" + 
        padd(randomlist[2][1]) + " : " + randomlist[2][0] + "\n" + 
        padd(randomlist[3][1]) + " : " + randomlist[3][0] + "\n" + 
        padd(randomlist[4][1]) + " : " + randomlist[4][0] + "\n" + 
        "―――――――――――――――――――――" + "\n" +
        "Bチーム aveELO : " + bravoELO + "\n" +
        padd(randomlist[5][1]) + " : " + randomlist[5][0] + "\n" + 
        padd(randomlist[6][1]) + " : " + randomlist[6][0] + "\n" + 
        padd(randomlist[7][1]) + " : " + randomlist[7][0] + "\n" + 
        padd(randomlist[8][1]) + " : " + randomlist[8][0] + "\n" + 
        padd(randomlist[9][1]) + " : " + randomlist[9][0] 
}

function eloMatch(){
}


const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  
function padd(val) {
    var len = 4;        //
    for(var i = 0; i < len; i++){
        val = val + " ";
    } 
    return val.substr(0,len);
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = src;
    });
  }
