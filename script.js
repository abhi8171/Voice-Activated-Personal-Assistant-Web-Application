let box = document.querySelector(".box");
let btn = document.querySelector("button");

const speakFunction = (input) => {
    window.speechSynthesis.cancel();
    let speakInput = new SpeechSynthesisUtterance(input);
    speakInput.rate = 1;
    speakInput.pitch = 1;
    speakInput.volume = 1;
    speakInput.lang = 'en-IN';
    window.speechSynthesis.speak(speakInput);
}
window.onload = () => {
    // speakFunction("Hello Abhi");
    greetingFunc();
}
const greetingFunc = () => {
    let date = new Date();
    let hour = date.getHours();

    if(hour >= 0 && hour < 12) {
        speakFunction("Good Morning Abhi! How can I help you !");
    }else if(hour >= 12 && hour < 16){
        speakFunction("Good Afternoon Abhi! How can I help you !");
    }else if(hour >=16 && hour < 20){
        speakFunction("Good Evening Abhi! How can I help you !");
    }else{
        speakFunction("Good Night Abhi! How can I help you !");
    }
}
const startVoiceInput = () => {
    if('webkitSpeechRecognition' in window){
        let recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.onstart = () => {
            box.classList.add("btn-box");
            btn.innerHTML = `<i class="fa-solid fa-microphone-lines"></i>`;
        };
        recognition.onresult = (e) => {
            // console.log(e.results[0][0].transcript);
            let spokenText = e.results[0][0].transcript;
            handleCommands(spokenText.toLowerCase());
        }
        recognition.onend = () => {
            box.classList.remove("btn-box");
            btn.innerHTML = `<i class="fa-solid fa-microphone-lines-slash"></i>`;
        };

        recognition.onerror = () => {
            box.classList.remove("btn-box");
            btn.innerHTML = `<i class="fa-solid fa-microphone-lines-slash"></i>`;
        };
        recognition.start();
    }else {
        console.log("Your browser does not support Voice Input!");
    }
}
btn.onclick = () => {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();  // Cancel ongoing speech if active
    }
    startVoiceInput();
}
const handleCommands = (command) => {
    if(command.includes("hello") || command.includes("hi") || command.includes("hey")){
        speakFunction("hello sir ! how can i help you !");
    }else if(command.includes("who are you") || command.includes("your name")){
        speakFunction("hello sir ! i am a virtual assistant developved by Mr. Abhishek Upadhyay");
    }else if(command.includes("youtube")){
        speakFunction("Opening youtube")
        window.open("https://www.youtube.com/");
    }else if(command.includes("instagram")){
        speakFunction("Opening instagram")
        window.open("https://www.instagram.com/");
    }else if(command.includes("whatsapp")){
        speakFunction("Opening whatsapp")
        window.open("https://www.whatsapp.com/");
    }else if(command.includes("facebook")){
        speakFunction("opening facebook")
        window.open("https://www.facebook.com/");
    }else if(command.includes("calculator")){
        window.open("calculator://");
    }else if(command.includes("time") || command.includes("tell me time")){
        let time = new Date().toLocaleString(undefined, {hour: 'numeric', minute: 'numeric'})
        speakFunction(time);
    }else if(command.includes("date") || command.includes("tell me date")){
        let time = new Date().toLocaleString(undefined, {day: 'numeric', month: 'long'})
        speakFunction(time);
    }else if(command.includes("chatgpt")){
        speakFunction("opening chatgpt")
        window.open("https://chatgpt.com/");
    }else if(command.includes("thank you") || command.includes("thanks") || command.includes("ok") || command.includes("good")){
        speakFunction("You're welcome! If you have any more questions, feel free to ask. I'm happy to help!");
    } 
    else{
        speakFunction(`this is what, i found for you on internet regarding ${command}`)
        window.open(`https://www.google.com/search?q=${command}`);
    }
}
