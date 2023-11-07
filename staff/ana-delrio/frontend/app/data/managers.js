function createUser(name, email, password) {
    const user = new User(generateId(), name, email, password)

    db.users.push(user)
}

function cloneUser(user) {
    if (!(user instanceof User)) throw new TypeError('user is not a User')

    return new User(user.id, user.name, user.email, user.password)
}

function findUserIndexById(id) {
    validateText(id, 'user id')

    const index = db.users.findIndex(function (user) { return user.id === id })

    return index
}


function findUserByEmail(email) {
    validateText(email, 'user email')

    const user = db.users.find(function (user) { return user.email === email })

    return user
}

function findUserById(id) {
    validateText(id, 'user id')

    const user = db.users.find(user => user.id === id)

    if (user)
        return cloneUser(user)

    return null
}

function updateUser(user) {
    if (!(user instanceof User)) throw new TypeError('user is not a User')

    const index = findUserIndexById(user.id)

    db.users[index] = cloneUser(user)
}

function clonePost(post) {
    if (!(post instanceof Post)) throw new TypeError('post is not a Post')

    // añadimos el id en primer lugar 
    return new Post(post.id, post.author, post.image, post.text, post.likes.map(email => email))
}

function getPosts() {
    return db.posts.map(clonePost)
}

function createPost(userId, image, text) {
    const post = new Post(generateId(), userId, image, text, [])

    db.posts.push(post)
}

function findPostById(id) {
    validateText(id, 'post id')
    // lo eliminamos porque no e sun numérico
    // if (index < 0) throw new RangeError('index lower than 0')

    // buscamos el post en el array con un find
    const post = db.posts.find(post => post.id === id)

    if (post)
        return clonePost(post)

    return null
}

// buscamos el índice del post con el id
function findPostIndexById(id) {
    validateText(id, 'post id')

    // esto nos trae en índice del post
    const index = db.posts.findIndex(post => post.id === id)

    return index
}


function updatePost(post) {
    if (!(post instanceof Post)) throw new TypeError('post is not a Post')

    const index = findPostIndexById(post.id)

    // actualizamos el post completamente
    db.posts[index] = clonePost(post)
}