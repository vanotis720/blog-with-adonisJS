import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category';
import Post from 'App/Models/Post';

export default class DashboardController {

    async home({ view }: HttpContextContract) {
        return view.render('dashboard/home')
    }

    async articles({ view }: HttpContextContract) {
        const posts = await Post
            .query()
            .where('online', 1)
            .orderBy('created_at', 'desc')
            .preload('category')
            .preload('user')

        return view.render('dashboard/articles', { posts });
    }

    async categories({ view }: HttpContextContract) {
        const categories = await Category.all();
        return view.render('dashboard/categories', { categories });
    }
}
