const { faker } = require('@faker-js/faker')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Create sample authors
  for (let i = 0; i < 10; i++) {
    const author = {
      name: faker.name.firstName() + faker.name.lastName(),
    }
    await prisma.author.create({ data: author })
  }

  // Create sample publishers
  let publishers = []
  for (let i = 0; i < 10; i++) {
    const publisher = {
      name: faker.company.companyName(),
    }
    publishers.push(publisher)
  }
  await prisma.publisher.createMany({
    data: publishers,
    skipDuplicates: true,
  })

  // Create sample categories
  const categories = [
    { name: 'Politics' },
    { name: 'Society' },
    { name: 'Economy' },
    { name: 'Tech' },
    { name: 'Science' },
    { name: 'Health' },
    { name: 'Sports' },
    { name: 'Culture' },
    { name: 'Literature' },
    { name: 'Movies/TV' },
    { name: 'Arts' },
    { name: 'Music' },
    { name: 'Food' },
    { name: 'Travel' },
  ]
  await prisma.category.createMany({
    data: categories,
  })

  // Create sample articles
  for (let i = 0; i < 10; i++) {
    const timestamp = new Date().toISOString()
    const randomPublisherId = Math.floor(Math.random() * 10) + 1
    const article = {
      title: faker.lorem.sentence(),
      subtitle: faker.lorem.sentence(),
      copy: faker.lorem.paragraphs(5),
      published_at: timestamp,
      checked_out_at: timestamp,
      publisher: {
        connect: { id: randomPublisherId },
      },
      authors: {
        create: [
          {
            author: {
              connect: { id: i + 1 },
            },
          },
        ],
      },
      categories: {
        create: [
          {
            category: {
              connect: { id: i + 1 },
            },
          },
        ],
      },
    }
    await prisma.article.create({ data: article })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
