// 最終課題を制作しよう
let chus = [];
let startTime;
let gameStart = false;
let level = 1;
let levelCLear = false;

function setup()
{
  //レベルが上がった時にネズミが残らないようにする
  chus = [];


  createCanvas(windowWidth, windowHeight);

  //レベル別の対応
  let chuCount;
  let speed;

  if(level == 1)
  {
    chuCount = 1;
    speed = 2;
  }
  else if(level == 2)
  {
    chuCount = 3;
    speed = 2.5;
  }
  else if(level == 3)
  {
    chuCount = 3;
    speed = 4;
  }

//chu(mouse)を3体作る
  for(let i = 0; i < chuCount; i++)
  {
    chus.push
    ({
      x: random(width),
      y: random(height),
      vx: random (-speed, speed),
      vy: random (-speed, speed),
      found: false,
      lightStart: 0
    });
  }

  startTime = millis();
}


function draw()
{
  background(0);

  if(!gameStart)
  {
    textFont("Courier New");
    textAlign(CENTER, CENTER);

    textAlign(CENTER, CENTER);

    textSize(80);
    fill(255, 255, 0);
    text("Find the MOUSE!!", width/2, height/4);

    textSize(25);
    fill(255);
    text("・暗闇の中から3匹のネズミを見つけ出せ！", width/2, height*1/3 + 30);

    textSize(25);
    fill(255);
    text("・ネズミを1秒間照らすと捕獲できる！", width/2, height*1/3 + 80);

    textSize(25);
    fill(255);
    text("・最初の3秒でネズミの動きを覚えるのだ！", width/2, height/2 + 30);

    textSize(25);
    fill(255);
    text("Level 1-3", width/2, height/2 + 80);

    textSize(30);
    fill(255);
    text("SPACEキーを押して始めよう", width/2, height*3/4 + 80);

    return;
  }


  let elapsed = (millis() - startTime) / 1000;

  background(30);

  fill(255);

  for(let chu of chus)
  {
    if(!chu.found)
    {
      chu.x += chu.vx;
      chu.y += chu.vy;
    }
    
//chuの壁反射
    if(chu.x < 20 || chu.x > width - 20)
    {
      chu.vx = -chu.vx;
    }

    if(chu.y < 20 || chu.y > height - 20)
    {
      chu.vy = -chu.vy;
    }

    if(elapsed < 3)
    {
      fill(255);
      ellipse(chu.x, chu.y, 15, 15);
    }
    else
    {
      //マウスとchuの距離定義
      let d = dist(mouseX, mouseY, chu.x, chu.y);
      //
        //
       if(!chu.found && d < 30)
       {
        if(chu.lightStart == 0)
            {
              chu.lightStart = millis();
            }
           if(millis() - chu.lightStart >= 1000)
            {
              chu.found = true;
            }
       }
       //
         else if(!chu.found)
        {
          chu.lightStart = 0;
        }
       //
       if(chu.found)
        {
          fill(255, 0, 0);
          ellipse(chu.x, chu.y, 15, 15);
        }
        else if(d < 30)
        {
          fill(255);
          ellipse(chu.x, chu.y, 15, 15);
        }
      }

      let foundCount = 0;
      

      for(let chu of chus)
        {
          if(chu.found)
            {
              foundCount++;
            }

         }
         textSize(25);
         fill(255);
         text("Found: " + foundCount + "/" + chus.length, width/8 - 50, height/8);


        //ネズミ全員発見
         if(foundCount == chus.length)
            {
              //最終のクリア
              if(level == 3)
              {
                background(0);

                fill(255, 255, 0);
                textSize(50);
                textAlign(CENTER, CENTER);
                text("YOU WIN!!", width/2, height/2);

                return;
              }
              //レベルをクリアしました
              levelClear = true;

              for(let chu of chus)
              {
                fill(255, 0, 0);
                ellipse(chu.x, chu.y, 15, 15);
              }

              fill(255, 255, 0);
              textSize(50);
              textAlign(CENTER, CENTER);
              text("LEVEL" + level + " CLEAR!", width/2, height/2);

              textSize(30);
              text("Press S to start the Next Level...", width/2, height/2 + 200);

              return;
            }

            textSize(30);
            fill(255);
            text("LEVEL" + level, width/2, height/8);
  }

  


//電気が消える
  if(elapsed >= 3)
    {  //電灯を書く
      noStroke();
      fill(255, 255, 150, 10);
      circle(mouseX, mouseY, 100);
      fill(255, 255, 150, 20);
      circle(mouseX, mouseY, 75);
      fill(255, 255, 130, 80);
      circle(mouseX, mouseY, 30);
    }

}

function keyPressed()
{
  //ゲーム開始時
  if(key == ' ')
  {
    gameStart = true;
    startTime = millis();
  }

  //レベル更新時
  if((key == 's' || key == 'S') && levelClear)
  {
    level++;

    levelCLear = true;
    startTime = millis();

    chus = [];

    setup();

  }
}

function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
}
