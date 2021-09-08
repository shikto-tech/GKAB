let html_url = "https://shikto-tech.github.io/GKAB/index.html"

fetch(html_url)
  .then(response => response.text())
  .then(data => add_html_and_script(data));

function add_html_and_script(dt){
    document.body.innerHTML = dt
    add_script("https://shikto-tech.github.io/GKAB/discord_bot.js")
    add_script("https://shikto-tech.github.io/GKAB/main.js")
}

function add_script(url){
    let nsc = document.createElement("script")
    nsc.src = url
    document.body.appendChild(nsc)
}
