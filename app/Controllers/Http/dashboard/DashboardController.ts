import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category';

export default class DashboardController {

    async home({ view }: HttpContextContract) {
        return view.render('dashboard/home')
    }

    async articles({ view }: HttpContextContract) {
        return view.render('dashboard/articles')
    }

    async categories({ view }: HttpContextContract) {
        const categories = await Category.all();
        return view.render('dashboard/categories', { categories });
    }
}
