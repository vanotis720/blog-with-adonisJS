import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DashboardController {

    async home({ view }: HttpContextContract) {
        return view.render('dashboard/home')
    }

    async articles({ view }: HttpContextContract) {
        return view.render('dashboard/articles')
    }

    async categories({ view }: HttpContextContract) {
        return view.render('dashboard/categories')
    }
}
