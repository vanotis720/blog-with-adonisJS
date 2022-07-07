import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Category from 'App/Models/Category'
import Post from 'App/Models/Post'
import PostValidator from 'App/Validators/PostValidator'

export default class BlogController {

    async home({ view, request }: HttpContextContract) {
        const page = request.input('page') || 1
        const posts = await Database.from(Post.table).paginate(page, 1)
        return view.render('index', {
            posts,
            page
        })
    }

    async index({ view, request }: HttpContextContract) {
        const page = request.input('page') || 1

        const posts = await Post
            .query()
            .where('online', 1)
            .orderBy('created_at', 'desc')
            .preload('category')
            .paginate(page, 4)
        posts.baseUrl('/articles')

        return view.render('articles/index', {
            posts,
            page
        })
    }

    async show({ view, params }: HttpContextContract) {
        const post = await Post.findOrFail(params.id)
        return view.render('articles/show', {
            post,
        })
    }

    async create({ view }: HttpContextContract) {
        const categories = await Category.query().orderBy('created_at', 'asc');
        return view.render('dashboard/create', { categories })
    }

    async store({ request, response, session, auth }: HttpContextContract) {
        const data = await request.validate(PostValidator)
        const slug = data.title.toLowerCase().replace(/\s/g, '-')
        const user_id = auth.user!.id
        const coverImage = request.file('thumbnail')!
        var thumbnail = '';

        if (coverImage) {
            // const path = `${process.cwd()}/public/uploads/`
            // await coverImage.move(path);
            await coverImage.moveToDisk('./')
            thumbnail = coverImage.fileName ? coverImage.fileName : 'default.png';
        }

        await Post.create({ ...data, online: data.online || true, slug: slug, userId: user_id, thumbnail: thumbnail })

        session.flash({ success: 'Post created successfully' })
        return response.redirect().toRoute('dashboard.articles')
    }

    async edit({ params, view }: HttpContextContract) {
        const post = await Post.findOrFail(params.id)
        return view.render('articles/edit', {
            post
        })
    }

    // async update({ params, request, response, session }: HttpContextContract) {
    //     const post = await Post.findOrFail(params.id)
    //     const data = await request.validate(PostValidator)
    //     post
    //         .merge({ ...data, online: data.online || false })
    //         .save()

    //     session.flash({ success: 'Post updated successfully' })
    //     return response.redirect().toRoute('home')
    // }

    async destroy({ params, response, session }: HttpContextContract) {
        const post = await Post.findOrFail(params.id)
        post.delete()
        session.flash({ success: 'Post deleted successfully' })
        return response.redirect().toRoute('home')
    }

    async saveFile({ request }) {
        const file = request.file('thumbnail', { extnames: ['jpg', 'png'], size: '2mb' })
        if (file) {
            const path = `${process.cwd()}/public/uploads/${file.clientName}`
            await file.move(path)
            return `/uploads/${file.clientName}`;
        }
        return '/uploads/default.png';
    }

}
