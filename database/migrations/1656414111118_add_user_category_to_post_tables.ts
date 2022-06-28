import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('category_id').unsigned().references('id').inTable('categories')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('user_id')
      table.string('category_id')
    })
  }
}
