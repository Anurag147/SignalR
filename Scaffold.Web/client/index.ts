import * as signalR from "@microsoft/signalr";
import { CustomLogger } from "./customLogger";

var counter = document.getElementById("viewCounter");

var dvName = document.getElementById("dvName");

let btnJoinYellow = document.getElementById("btnJoinYellow");
let btnJoinBlue = document.getElementById("btnJoinBlue");
let btnJoinOrange = document.getElementById("btnJoinOrange");
let btnTriggerYellow = document.getElementById("btnTriggerYellow");
let btnTriggerBlue = document.getElementById("btnTriggerBlue");
let btnTriggerOrange = document.getElementById("btnTriggerOrange");

// create connection
let connection = new signalR.HubConnectionBuilder()
    .configureLogging(new CustomLogger())
    .withUrl("/hub/view")
    .build();

    let btn = document.getElementById("incrementView");
let viewCountSpan = document.getElementById("viewCount");

btn.addEventListener("click", function (evt) {
    // send to hub
    connection.invoke("IncrementServerView");
});

// client events
connection.on("incrementView", (val) => {
    viewCountSpan.innerText = val;

    if (val % 10 === 0) connection.off("incrementView");
});

// on view update message from client
connection.on("viewCountUpdate", (value: number) => {
    counter.innerText = value.toString();
});

btnJoinYellow.addEventListener("click", () => { connection.invoke("JoinGroup", "Yellow"); });
btnJoinBlue.addEventListener("click", () => { connection.invoke("JoinGroup", "Blue"); });
btnJoinOrange.addEventListener("click", () => { connection.invoke("JoinGroup", "Orange"); });

btnTriggerYellow.addEventListener("click", () => { connection.invoke("TriggerGroup", "Yellow"); });
btnTriggerBlue.addEventListener("click", () => { connection.invoke("TriggerGroup", "Blue"); });
btnTriggerOrange.addEventListener("click", () => { connection.invoke("TriggerGroup", "Orange"); });

// client events
connection.on("triggerColor", (color) => {
    document.getElementsByTagName("body")[0].style.backgroundColor = color;
});


// notify server we're watching
function notify(){
    connection.send("notifyWatching");
}

// start the connection
function startSuccess(){
    console.log("Connected.");
    notify();
    connection.invoke("IncrementServerView");
    //Invoke a function
connection
.invoke("getFullName", "Anurag", "Asthana")
.then((name: string) => { dvName.innerText = name; });
}


function startFail(){
    console.log("Connection failed.");
}

connection.start().then(startSuccess, startFail);