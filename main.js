setInterval(Tick, 1000)
let window_open = false
let TARGET_WINDOW;

function Tick(){
    if(!document.getElementById("bot_active_checkbox").checked || document.getElementById("target_url").value == "") return

    if(!window_open){
        TARGET_WINDOW = window.open(document.getElementById("target_url").value, "_blank")
        window_open = true
    }

    
}

function CheckConnectionState(){

}