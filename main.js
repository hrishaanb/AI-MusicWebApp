harry_potter = "";
peter_pan = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
song1Status = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
song2Status = "";
function setup () {
    canvas = createCanvas(600, 500);
    canvas.position(450, 200);
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
}
function modelLoaded () {
    console.log("Model Loaded!");
    posenet.on("pose", gotPoses);
}
function gotPoses (results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist X - " + leftWristX + ", Left Wrist Y - " + leftWristY + ", Right Wrist X - " + rightWristX + ", Right Wrist Y - " + rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score of Left Wrist - " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of Right Wrist - " + scoreRightWrist);
    }
}
function draw () {
    image(video, 0, 0, 600, 500);
    song1Status = harry_potter.isPlaying();
    fill("red");
    stroke("red");
    if (scoreLeftWrist > 0.2) {    
        circle(leftWristX, leftWristY, 20);
        peter_pan.stop();
        if (song1Status == "false") {
            harry_potter.play();
            document.getElementById("div_song_name").innerHTML = "Song Name - Harry Potter (Modified Version)";
        }
    }
    song2Status = peter_pan.isPlaying();
    if (scoreRightWrist > 0.2) {    
        circle(rightWristX, rightWristY, 20);
        harry_potter.stop();
        if (song2Status == "false") {
            peter_pan.play();
            document.getElementById("div_song_name").innerHTML = "Song Name - Peter Pan";
        }
    }
}
function preload () {
    harry_potter = loadSound("music.mp3");
    peter_pan = loadSound("music2.mp3")
}