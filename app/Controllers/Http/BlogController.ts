import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import PostValidator from 'App/Validators/PostValidator'

export default class BlogController {

    async index({ view }: HttpContextContract) {
        const posts = await Post.all()
        return view.render('blog/index', {
            posts
        })
    }

    async create({ view }: HttpContextContract) {
        return view.render('blog/create')
    }

    async store({ request, response, session }: HttpContextContract) {
        const data = await request.validate(PostValidator)
        const post = await Post.create({...data, online: data.online || false})

        session.flash({ success: 'Post created successfully' })

        return response.redirect().toRoute('home')
    }

    async edit({ params, view }: HttpContextContract) {
        const post = await Post.findOrFail(params.id)
        return view.render('blog/edit', {
            post
        })
    }

    async update({ params, request, response, session }: HttpContextContract) {
        const post = await Post.findOrFail(params.id)
        const data = await request.validate(PostValidator)
        post
            .merge({...data, online: data.online || false})
            .save()
        
        session.flash({ success: 'Post updated successfully' })
        return response.redirect().toRoute('home')
    }
        
}
