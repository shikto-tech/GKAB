setInterval(Tick, 1000)
LOG("Started ticks")

let window_open = false
let TARGET_WINDOW;

let run_tick = true;

function Tick(){
    document.getElementById("indicator").style.background = (run_tick && document.getElementById("bot_active_checkbox").checked) ? "green" : "red"
    
    if(!document.getElementById("bot_active_checkbox").checked || document.getElementById("target_url").value == "" || !run_tick) return

    if(!window_open){
        TARGET_WINDOW = window.open(document.getElementById("target_url").value, "_blank")
        window_open = true
        LOG("Opened new window")

        setTimeout(() => {
            if(!window_open) return
            ClosePorts();
            LOG("Closed Ports")
            setTimeout(() => {
                DISCORD_SEND_FORMATTED_MESSAGE(GetActiveIP());
                LOG("Send discord message")
            }, 5000);
        }, 45000);
    }

    CheckLoginPage();
    CheckConnectionState();
    TerminalConnectionCheck();
    CheckMemory();
}

function TerminalConnectionCheck(){
    let lastText = TARGET_WINDOW.document.getElementById("terminal").children[0].children[2].children[TARGET_WINDOW.document.getElementById("terminal").children[0].children[2].children.length - 2].innerHTML
    if(lastText.includes("by remote host")){
        CloseWindow()
    }
}

function CheckConnectionState(){
    if(!run_tick) return;

    let nonetconfirmationtextbox = TARGET_WINDOW.document.getElementById("confirmation_content_container")
    if(nonetconfirmationtextbox != null){
        if(nonetconfirmationtextbox.innerHTML.includes("Connection failure has occurred.")){
            CloseWindow()
        }
    }
}

function CheckLoginPage(){
    if(!run_tick) return;
    let box = TARGET_WINDOW.document.getElementById("guestname")
    let button = TARGET_WINDOW.document.getElementById("btn_guest_join")
    if(button != null && box != null){
        box.value = "XT_TESTER_F1_PC"
        button.click();
        PauseTick(60000)
    }
}

function CheckMemory(){
    if(!run_tick) return;

    let memory_usage = parseFloat(TARGET_WINDOW.document.getElementsByClassName("info_mem bottom_status")[0].children[1].children[0].innerHTML)
    if(memory_usage == null){
        CloseWindow();
    }
    if(memory_usage < 2.0){
        var element = TARGET_WINDOW.document.getElementsByClassName("gi gi-reload3")[0].parentElement
        if(document.createEvent)
        {
        element.dispatchEvent(new Event('mousedown'));
        }
        else{
        element.fireEvent("onmousedown", event); 
        }

        PauseTick(30000)
    }
}

function PauseTick(mills){
    run_tick = false
    LOG("Paused tick for :" + mills)
    setTimeout(() => {
        LOG("Resumed tick")
        run_tick = true;
    }, mills);
}

function CloseWindow(){
    TARGET_WINDOW.close()
    LOG("Closed window")
    window_open = false
    PauseTick(3000)
}

function ClosePorts(){
    let all_remove_buttons = TARGET_WINDOW.document.getElementsByClassName("btn-remove_user_port")
    let doneCount = 0;
    let index = 0

    doRemove();
    
    function doRemove(){
        setTimeout(() => {
            if(doneCount < all_remove_buttons.length){
                doneCount++
                all_remove_buttons[index].click()
                index++
    
                setTimeout(() => {
                    TARGET_WINDOW.document.getElementById("g_cfrm_btn_yes").click()
                    doRemove()
                }, 2000);
            }else{
                setNewPort()
            }
        }, 1000);
    }

    function setNewPort(){
        TARGET_WINDOW.document.getElementById("portforward_port_input").value = 25565
        TARGET_WINDOW.document.getElementsByClassName("btn btn-secondary portforward_add_row_btn btn-sm")[0].click();
        setTimeout(_ => console.log(TARGET_WINDOW.document.getElementsByClassName("user_port")[0].children[6].innerHTML), 5000)
    }
}

function GetActiveIP(){
    LOG("Got IP")
    return TARGET_WINDOW.document.getElementsByClassName("user_port")[0].children[6].innerHTML
}

function LOG(message){
    message = message || ""
    document.getElementById("log_out").innerHTML 
    += "\n"
    + `[${GetTime()}]> `
    + message
}

function GetTime(){
    let today = new Date();

    let hh = formatZeroPlacement(today.getHours());
    let _mm = formatZeroPlacement(today.getMinutes());
    let ss = formatZeroPlacement(today.getSeconds());

    let dd = formatZeroPlacement(today.getDate());
    let mm = formatZeroPlacement(today.getMonth()+1); 
    const yyyy = today.getFullYear();    

    return (`${yyyy}-${mm}-${dd}@${hh}:${_mm}:${ss}`)
}

function formatZeroPlacement(input){
    if(input<10) 
    {
        input=`0${input}`;
    }
    return input
}



//TARGET_WINDOW.document.getElementsByClassName("info_mem bottom_status")[0].children[1].children[0].innerHTML
