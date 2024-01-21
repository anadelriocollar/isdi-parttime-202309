import logic from '../logic/index.js'
import { ContentError, DuplicityError, NotFoundError, CredentialsError } from '../logic/errors.js'

export default (req, res) => {
    try {
        // eliminamos los primeros 7 caracteres del token. Esto asume que los primeros 7 caracteres representan la palabra "Bearer" seguida de un espacio, y se están eliminando para obtener solo el ID del usuario
        const userId = req.headers.authorization.substring(7)

        logic.retrievePosts(userId, (error, posts) => {
            if (error) {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 404

                res.status(status).json({ error: error.constructor.name, message: error.message })

                return
            }
            res.json(posts)
        })

    } catch (error) {
        let status = 500

        if (error instanceof ContentError || error instanceof TypeError)
            status = 406

        res.status(status).json({ error: error.constructor.name, message: error.message })

    }

}