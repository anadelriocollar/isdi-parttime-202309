

// presentation (view)

var registerView = document.getElementById('register')

registerView.style.display = 'none'

var registerLoginLink = registerView.querySelector('a')

registerLoginLink.onclick = function (event) {
    event.preventDefault()

    registerView.style.display = 'none'
    loginView.style.display = 'block'
}

var registerForm = registerView.querySelector('form')




registerForm.onsubmit = function (event) {
    event.preventDefault()

    var emailInput = registerForm.querySelector('#email')
    var nameInput = registerForm.querySelector('#name')
    var passwordInput = registerForm.querySelector('#password')

    var email = emailInput.value 
    var name = nameInput.value
    var password = passwordInput.value

    var userRegistered = registerUser(name, email, password)

    if (!userRegistered){
        alert('User already exists')
    } 

    nameInput.value = ''
    emailInput.value = ''
    passwordInput.value = ''

    registerView.style.display = 'none'
    loginView.style.display = 'block'
}


    

// login

var loginView = document.getElementById('login')
var loginRegisterLink = loginView.querySelector('a')

loginRegisterLink.onclick = function (event) {
    event.preventDefault()

    loginView.style.display = 'none'
    registerView.style.display = 'block'
}

var loginForm = loginView.querySelector('form')

loginForm.onsubmit = function (event) {
    event.preventDefault()

    var emailInput = loginForm.querySelector('#email')

    var email = emailInput.value

    var foundUser = null 
    // NULL en booleano se interpreta como un FALSE, su negado TRUE
    
    for (var i = 0; i < users.length && !foundUser; i++) {
        var user = user[i]

        if (user.email === email)
        foundUser = user
    }
    
    if(!foundUser) {
     alert('User nor found')

    return

    }
    
    var passwordInput = loginForm.querySelector('#password')

    var password = passwordInput.value

    if (foundUser.password !== password) {
        alert('Wrong credentials')

        return
    }

    emailInput.value = ''
    passwordInput.value = ''

    var homeTitle = homeView.querySelector('h1')
    
    homeTitle.innerText = 'Hello, ' + foundUser.name + '!'
    

    loginView.style.display = 'none'
    homeView.style.display = 'block'

}


// home

var homeView = document.getElementById('home')

homeView.style.display = 'none'

// TODO show user name logged in when entering in Home (Hello, >name<!)