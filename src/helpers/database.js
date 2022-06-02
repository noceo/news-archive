const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function saveArticleToDatabase(article) {
  let savedArticle = await prisma.article.create({
    data: {
      title: article.title,
      subtitle: article.subtitle,
      copy: article.copy,
      published_at: article.published_at,
      checked_out_at: article.checked_out_at,
      publisher: {
        connectOrCreate: {
          where: {
            name: article.publisher,
          },
          create: {
            name: article.publisher,
          },
        },
      },
      authors: {
        create: article.authors.map((author) => {
          return {
            author: {
              connectOrCreate: {
                where: { name: author.name },
                create: { name: author.name, type: author.type },
              },
            },
          }
        }),
      },
    },
  })
  console.log('Saved article to database', savedArticle.title)
}

module.exports = saveArticleToDatabase
