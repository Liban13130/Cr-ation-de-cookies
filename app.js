const inputs = document.querySelectorAll('input')

inputs.forEach(input => { // POUR CHAQUE INPUT
    input.addEventListener('invalid', handleValidation)
    input.addEventListener('input', handleValidation)

})

function handleValidation(e){
    if(e.type === "invalid"){
        e.target.setCustomValidity("Con va !")
        return
    } else if(e.type === "input"){
        e.target.setCustomValidity("")
    }
}

const cookieForm = document.querySelector('form');
cookieForm.addEventListener('submit', handleForm)

function handleForm(e){
    e.preventDefault();

    const newCookie = {};

    inputs.forEach(input =>{
        const nameAttribute = input.getAttribute('name'); // On prend la valeur de l'input qui porte l'attribut name="name"
        newCookie[nameAttribute] = input.value
    })
    newCookie.expires = new Date(new Date().getTime()+ 7 * 24 * 60 * 60 * 1000)
    // console.log(newCookie);
    createCookie(newCookie)
    cookieForm.reset()

}

function createCookie(newCookie){

    if(doesCookieExist(newCookie.name)){
        createToast({name: newCookie.name, state: "modifié", color: "orangered"})
    }
    else{
        createToast({name: newCookie.name, state: "crée", color: "green"})
    }

    document.cookie = `${encodeURIComponent(newCookie.name)}=${encodeURIComponent(newCookie.value)};expires=${newCookie.expires.toUTCString()}` // Ici on crée le cookie son nom sa valeur et sa date d'expiration
}

function doesCookieExist(name){
    const cookies = document.cookie.replace(/\s/g, "").split(";"); // le replace enleve tout les espaces dans le tableau, 
                                                                   // le split retourne un tableau où les élément sont séparé a partir du ";" qui était présent
    const onlyCookiesName = cookies.map(cookie => cookie.split("=")[0]) // Ici pour chaque élément on split a partir de "=", grâce à ça le MAP nous retourne plusieurs tableau qui comprend
                                                                     // cookie et valeur ET nous on cherche le nom du cookie donc on rajoute l'index [0] 
    const cookiePresence = onlyCookiesName.find(cookie => cookie === //On boucle avec find pour voir dans chaque cookie si un nom existe deja 
    encodeURIComponent(name))
    return cookiePresence;

}

const toastContainer = document.querySelector('.toast')

function createToast({name, state, color}){
    const toastInfo = document.createElement('p');
    toastInfo.className = "toast-block";

    toastInfo.textContent = `Le Cookie ${name} a bien été ${state}.`
    toastInfo.style.background = color;
    toastContainer.appendChild(toastInfo);

    setTimeout(() => {
        toastInfo.remove()
    }, 3500)
}

const cookiesList = document.querySelector('.cookies-list')
const showList    = document.querySelector('.show')
const infoText    = document.querySelector('.info-txt')

showList.addEventListener('click', showCookies)

let lock = false

function showCookies(){
    const cookies = document.cookie.replace(/\s/g, "").split(";").reverse()
    console.log(cookies);
    if(!cookies[0]){
        if(lock) return;

        lock = true
        infoText.textContent = "Oh il n'y a pas de cookies... Créez en un !"
        
        setTimeout(() => {
            infoText.textContent = ""
            lock = false
        }, 3000);
        return
    }

    createElements(cookies)
}

function createElements(cookies){
    
    cookies.forEach(cookie => {
        const formatCookie = cookie.split('=')
        const listItem = document.createElement('li');
        
    })
}