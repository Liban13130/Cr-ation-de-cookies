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
    console.log(newCookie);
    createCookie(newCookie)
}

function createCookie(newCookie){
    document.cookie
}