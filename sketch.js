let balloon,balloonImage1,bg;
let height,database;

function preload(){

    bg = loadImage("cityImage.png")
    balloonImage1 = loadAnimation("HotAirBallon01.png","HotAirBallon02.png","HotAirBallon03.png");

}
function setup(){
    database = firebase.database();
    createCanvas(1400,600);
    
    balloon = createSprite(100,500);
    balloon.addAnimation("HotAirBallon",balloonImage1);
    balloon.scale = 0.5;

    let balloonHeight = database.ref('balloon/height');
    balloonHeight.on('value',readHeight,showError);

    
}
function draw(){
    background(bg);
    if(height !==undefined){
            if(keyDown(LEFT_ARROW)){
                writeHeight(-10,0)
                balloon.addAnimation("HotAirBallon",balloonImage1);
               
            }
            if(keyDown(RIGHT_ARROW)){
                writeHeight(10,0)
                balloon.addAnimation("HotAirBallon",balloonImage1);
               

            }
            if(keyDown(UP_ARROW)){
                writeHeight(0,-10)
                balloon.addAnimation("HotAirBallon",balloonImage1);
               
            }
            if(keyDown(DOWN_ARROW)){
                writeHeight(0,10)
                balloon.addAnimation("HotAirBallon",balloonImage1);
                
            }
            drawSprites(); 
    }


}
function writeHeight(x,y){
    database.ref('balloon/height').set({'x':height.x+x,'y':height.y+y})
}
function readHeight(data){
    height = data.val();
    balloon.x = height.x;
    balloon.y = height.y
}
function showError(){
    console.log("Error in writing to the database")
}