status="";
object=[];

function preload(){
    video=createVideo("vedio.mp4");
}

function setup(){
    canvas=createCanvas(500,400);
    canvas.center();
    video.hide()
}

function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLaoded);
    document.getElementById("status").innerHTML="Status : Detecting object";
}

function modelLaoded(){
    console.log('model  is laoded');
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        object=results;
    }
}

function draw(){
    image(video,0,0,500,400);
    if(status !=""){
        objectDetector.detect(video, gotResult);
        r= ramdom(255);
        g= random(255);
        b= random(255);
        for(i=0;i<object.length;i++){
        document.getElementById("status").innerHTML="Status : Object Detected";
        document.getElementById("no_of_object").innerHTML="Number of object"+objects.length;
        fill("#fff");
        percent=floor(object.confidence * 100);
        text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
        noFill();
        stroke(r,g,b);
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}