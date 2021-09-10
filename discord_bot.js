let channelID = "883033499509092413"
//let bot_token = "ODg0ODYzMzU1ODg0NTM5OTM0.YTerOA.6RysGIIhcdO5lCR1QO4eFV178aY"
//let bot_token = "ODg0ODYzMzU1ODg0NTM5OTM0.YTerOA" + "" + ".ajvn-D7_YAGYeo7jn88wjP6YWBk"
let bot_token = "ODg0ODYzMzU1ODg0NTM5OTM0.YTerOA.zO" + "" + "BW7TSSveazghhkjliNoaqxniA"

let url = "https://cors-anywhere.herokuapp.com/" + "https://discordapp.com/api/channels/" + channelID + "/messages"
let headers = { "Authorization":"Bot " + bot_token, "User-Agent":"Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)", "Content-Type":"application/json", }

function DISCORD_SEND(messsage) {
    LOG("DISCORD-- sending a message: " + messsage)
    messsage = messsage || ""
    const request = new XMLHttpRequest();
    request.open("POST", url);

    //request.setRequestHeader('Content-type', 'application/json');
    //request.setRequestHeader(headers);

    request.setRequestHeader('Authorization', "Bot " + bot_token);
    request.setRequestHeader('User-Agent', "myBotThing (http://some.url, v0.1)");
    request.setRequestHeader('origin', "https://developer.mozilla.org/");
    request.setRequestHeader('Content-type', 'application/json');

    const params = {
      content: messsage
    }

    request.send(JSON.stringify(params));
  }

  function DISCORD_SEND_FORMATTED_MESSAGE(ipaddr){
    DISCORD_SEND(`@everyone\nNew IP Address:\n${ipaddr}`)
  }

  function SEND_SERVER(ip){
    let server_ip = "https://shikto-discord-bot.glitch.me/sendip?ip="

  }
