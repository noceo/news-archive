import { PrismaClient, MediaType } from '@prisma/client'
import { uploadImage } from '../helpers/image'

const prisma = new PrismaClient()

async function saveArticleToDatabase(article) {
  let media = []
  if (article.media && article.media.length > 0) {
    const uploadPromises = await Promise.allSettled(
      article.media.map((asset) => uploadImage(asset.url))
    )
    media = uploadPromises.map((promise) => {
      const fileExtension = promise.value.split('.').pop()
      const type = ['png', 'jpeg', 'jpg'].includes(fileExtension)
        ? MediaType.IMAGE
        : MediaType.VIDEO
      if (promise.status === 'fulfilled') {
        return {
          url: promise.value,
          type,
        }
      }
      return
    })
  }

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
      categories: {
        create: article.categories.map((category) => {
          return {
            category: {
              connectOrCreate: {
                where: { name: category },
                create: { name: category },
              },
            },
          }
        }),
      },
      media: {
        create: media,
      },
    },
  })
  console.log('Saved article to database', savedArticle.title)
}

async function checkArticleForRedundancy(title, author, publisher) {
  const redundantRecord = await prisma.article.findFirst({
    where: {
      title: {
        equals: title,
      },
    },
  })

  return redundantRecord !== null
}

export { saveArticleToDatabase, checkArticleForRedundancy }
