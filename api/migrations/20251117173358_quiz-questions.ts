// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('quiz-questions', table => {
    table.increments('id')

    table.integer('quiz_id').unsigned().notNullable()
      .references('quizes.id').onDelete('cascade');
    table.jsonb('question_data').notNullable();
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('quiz-questions')
}
