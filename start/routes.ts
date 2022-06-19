/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/login', 'AuthController.loginPage').as('login')
Route.get('/signup', 'AuthController.registerPage').as('register')
Route.post('/login', 'AuthController.login').as('auth.login')
Route.post('/signup', 'AuthController.register').as('auth.register')

Route.group(() => {
    Route.get('/create', 'BlogController.create').as('blog.create')
    Route.post('/create', 'BlogController.store').as('blog.store')
    Route.get('/edit/:id', 'BlogController.edit').as('blog.edit')
    Route.post('/edit/:id', 'BlogController.update').as('blog.update')
    Route.delete('/edit/:id', 'BlogController.destroy')

    Route.get('/dashboard', ({ view }: HttpContextContract) => {
        return view.render('dashboard/home')
    }).as('dashboard')

    Route.get('/dashboard/articles', ({ view }: HttpContextContract) => {
        return view.render('dashboard/home')
    }).as('articles.index')

    Route.get('dashboard/categories', ({ view }: HttpContextContract) => {
        return view.render('dashboard/home')
    }).as('categories.index')

    Route.get('logout', 'AuthController.logout').as('auth.logout')

}).middleware('auth')

Route.get('/', 'BlogController.home').as('home')
Route.get('/articles', 'BlogController.index').as('blog.index')
Route.get('/article/:id', 'BlogController.show').as('blog.show')

Route.get('/categories', ({ view }: HttpContextContract) => {
    return view.render('category/index')
}).as('category.index')

Route.get('/about', ({ view }: HttpContextContract) => {
    return view.render('about')
}).as('about')



