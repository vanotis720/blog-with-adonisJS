import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class extends BaseSeeder {
  public async run() {
    const uniqueKey = 'name'

    await Category.updateOrCreateMany(uniqueKey, [
      {
        name: 'général',
        slug: 'general',
        description: 'Nouvelles, articles et histoire technologique de grandes entreprises',
      },
      {
        name: 'Api, Framework & library',
        slug: 'api-framework-library',
        description: 'API, framework et bibliothèque populaires utilisés dans les entreprises de haute technologie',
      },
      {
        name: 'Déploiement & Git Ops',
        slug: 'deployement-git-ops',
        description: 'Guide dans le choix d\'hebergement adequat et technique de deploiement moderne',
      },
      {
        name: 'projects',
        slug: 'Projets',
        description: 'Réalisation pas à pas d\'un projet complet dans un langage,  framwork ou bibliotheque particulier',
      },
    ])
  }
}
