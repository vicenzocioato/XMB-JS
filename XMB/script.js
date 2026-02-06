const audio = new Audio("audio_nav (1).mp3")
audio.preload = "auto"
const body = document.getElementById("body")
let indice = 6
const root = document.getElementById("root")
const aviso = document.getElementById("aviso")
const logo = document.getElementById("logo")


const itens = Array.from(document.querySelectorAll(".item-xmb"))
const subitens = Array.from(document.querySelectorAll(".sub-item"))

const data = document.getElementById('data')
const hora = document.getElementById("hora")
var currentTime = new Date()

data.innerText = currentTime.getDate() + "/" + (currentTime.getMonth() + 1)
hora.innerText = currentTime.getHours() + ":" + currentTime.getMinutes()

intro()
atualizar()


body.addEventListener("keydown", function (event) {
    const tecla = event.key;
    console.log(tecla)

    if (tecla === "ArrowRight") {
        if (indice < itens.length - 1) {
            audio.currentTime = 0;
            audio.play().catch(err => {
                console.error("Erro ao tentar reproduzir o áudio:", err);
            });
            indice++
            atualizar()
        }
    }

    if (tecla === "ArrowLeft") {
        if (indice > 0) {
            audio.currentTime = 0;
            audio.play().catch(err => {
                console.error("Erro ao tentar reproduzir o áudio:", err);
            });
            indice--
            atualizar()
        }
    }
    if (tecla === "ArrowDown") {
        subitens.forEach(item =>
            item.classList.remove("sub-item-selecionado")
        )
        subitens[indice].classList.add("sub-item-selecionado")

    }
    if (tecla === "ArrowUp") {

        subitens.forEach(item =>
            item.classList.remove("sub-item-selecionado")
        )


    }

    if (subitens[6].classList.contains("sub-item-selecionado")) {
        if (tecla == "Enter") {
            const overlay = document.createElement("div");
            overlay.id = "overlay-jogo";
            const jogo = document.createElement('iframe');
            jogo.src = `https://classicosps1.com.br/crash-bandicoot/`;
            jogo.allowFullscreen = true;
            overlay.appendChild(jogo)
            body.appendChild(overlay)

            const botao = document.createElement("button")
            botao.innerHTML = `<i class="fa-solid fa-xmark"></i>`
            overlay.appendChild(botao)


            botao.addEventListener('click', function (e) {
                e.preventDefault()
                jogo.remove()
                overlay.remove()
                botao.remove()
            })
        }
    }
})


function renderizar(inicio) {

    itens.forEach(item => {
        item.style.display = "none"
    })

    if (inicio > 0) {
        itens
            .slice(inicio, inicio + 4)
            .forEach(item => {
                item.style.display = "flex"
                item.style.opacity = "visible"
            })
    }
    else {
        itens
            .slice(inicio, inicio + 5)
            .forEach(item => {
                item.style.display = "flex"
                item.style.opacity = "visible"
            })
    }

    if (inicio >= 1) {
        itens[inicio - 1].style.display = "flex"
        itens[inicio - 1].style.opacity = "visible"
    }

}


function navegar(indice) {
    itens.forEach(item =>
        item.classList.remove('selecionado')
    )
    subitens.forEach(item =>
        item.classList.remove("sub-item-selecionado")
    )

    if (itens[indice]) {
        itens[indice].classList.add('selecionado')
    }
}

function atualizar() {
    const inicio = Math.max(0, Math.min(indice, itens.length - 4))

    renderizar(inicio)
    navegar(indice)
}


intro()

function intro() {

    const audio = new Audio("audio_startup.mp3")
    audio.currentTime = 0;
            audio.play().catch(err => {
                console.error("Erro ao tentar reproduzir o áudio:", err);
            });

    setTimeout(() => {
        showLogo()

        setTimeout(() => {
            showAviso()

            setTimeout(() => {
                showXMB()
            }, 5000)

        }, 9000)

    }, 500) 
}



function showLogo(){
    logo.style.opacity="1"
}

function showAviso(){
    logo.style.opacity="0"
    aviso.style.opacity="1"
}
function showXMB() {
    aviso.style.opacity="0"
    root.style.display='flex'

}
