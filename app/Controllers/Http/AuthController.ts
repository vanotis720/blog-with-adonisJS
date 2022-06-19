import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {

    public async loginPage({ view }: HttpContextContract) {
        return view.render('auth/login')
    }

    public async registerPage({ view }: HttpContextContract) {
        return view.render('auth/register')
    }

    public async login({ request, auth, response, session }: HttpContextContract) {
        const data = await request.validate(LoginValidator)
        try {
            await auth.use('web').attempt(data['email'], data['password'])
            return response.redirect().toRoute('home')

        } catch (error) {
            session.flash({
                error: 'Informations d\'identification non valides'
            })
            return response.redirect().back()
        }
    }

    public async register({ request, auth, response }: HttpContextContract) {
        const data = await request.validate(RegisterValidator)
        const user = await User.create(data)
        await auth.login(user)
        return response.redirect().toRoute('home')
    }

    public async logout({ auth, response }: HttpContextContract) {
        await auth.logout()
        return response.redirect().toRoute('home')
    }
}
