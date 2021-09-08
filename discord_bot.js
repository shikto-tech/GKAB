let channelID = "884864014176370772"
let bot_token = "ODg0ODYzMzU1ODg0NTM5OTM0.YTerOA.6RysGIIhcdO5lCR1QO4eFV178aY"

let url = "https://discordapp.com/api/channels/" + channelID + "/messages"
let headers = { "Authorization":"Bot " + bot_token, "User-Agent":"myBotThing (http://some.url, v0.1)", "Content-Type":"application/json", }

function DISCORD_SEND(messsage) {
    messsage = messsage || ""
    const request = new XMLHttpRequest();
    request.open("POST", url);

    //request.setRequestHeader('Content-type', 'application/json');
    //request.setRequestHeader(headers);

    request.setRequestHeader('Authorization', "Bot " + bot_token);
    request.setRequestHeader('User-Agent', "myBotThing (http://some.url, v0.1)");
    request.setRequestHeader('Content-type', 'application/json');

    const params = {
      content: messsage
    }

    request.send(JSON.stringify(params));
  }