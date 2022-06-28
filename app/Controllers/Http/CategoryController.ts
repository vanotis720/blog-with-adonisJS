// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Category from "App/Models/Category"

export default class CategoryController {
    async index({ view }) {
        const categories = await Category.query()
            .preload('posts', (query) => query
                .where('online', 1)
                .orderBy('created_at', 'desc')
            )

        return view.render('categories/index', { categories })
    }

    async show({ params, view }) {
        const category = await Category.query().where('slug', params.slug)
            .preload('posts', (query) => query
                .where('online', 1)
                .orderBy('created_at', 'desc')
        ).first()
        return view.render('categories/show', { category })
    }
}
