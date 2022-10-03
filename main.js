prediction = "";

Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src=" '+data_uri+'"/>';
    }
   
    );
}

console.log("ml5 version:" , ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/USVoUEQbD/model.json" , modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded!");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data = "The prediction is" + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error , result)
{
    if(error)
    {
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("captured_image").innerHTML = result[0].label;
        prediction = result[0].label;
        speak();
        if(result[0].label == "best")
        {
            document.getElementById("emoji").innerHTML = "&#128077;";
        }
        if(result[0].label == "victory")
        {
            document.getElementById("emoji").innerHTML = "&#9996";
        }
        if(result[0].label == "amazing")
        {
            document.getElementById("emoji").innerHTML = "&#128076;";
        }
        if(result[0].label == "bad")
        {
            document.getElementById("emoji").innerHTML = "&#128078;";
        }
        if(result[0].label == "yo")
        {
            document.getElementById("emoji").innerHTML = "&#129304;";
        }
    }
}



