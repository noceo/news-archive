const { faker } = require('@faker-js/faker')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  let authors = []
  for (let i = 0; i < 10; i++) {
    const author = {
      firstname: faker.name.firstName,
      lastname: faker.name.lastName,
      // TODO: Add articles, etc.
    }
    authors.add(author)
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
