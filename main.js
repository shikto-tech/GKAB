setInterval(Tick, 1000)

let window_open = false
let TARGET_WINDOW;

let run_tick = true;

function Tick(){
    if(!document.getElementById("bot_active_checkbox").checked || document.getElementById("target_url").value == "" || !run_tick) return

    if(!window_open){
        TARGET_WINDOW = window.open(document.getElementById("target_url").value, "_blank")
        window_open = true
    }

    let memory_usage = parseFloat(TARGET_WINDOW.document.getElementsByClassName("info_mem bottom_status")[0].children[1].children[0].innerHTML)
    if(memory_usage < 2.0){
        var element = TARGET_WINDOW.document.getElementsByClassName("gi gi-reload3")[0].parentElement
        if(document.createEvent)
        {
        element.dispatchEvent(new Event('mousedown'));
        }
        else{
        // Internet Explorer (I think)
        element.fireEvent("onmousedown", event); 
        }

        run_tick = false
        setTimeout(() => {
            run_tick = true;
        }, 15000);
    }
}

function CheckConnectionState(){

}

//TARGET_WINDOW.document.getElementsByClassName("info_mem bottom_status")[0].children[1].children[0].innerHTML