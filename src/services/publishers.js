import Faz from './scrapers/faz'
import NYTimes from './scrapers/nytimes'

const faz = new Faz()
const nytimes = new NYTimes()

const publishers = {
  FAZ: 'FAZ',
  NY_TIMES: 'NY_TIMES',
}

const scrapers = [faz, nytimes]

export { publishers, scrapers }
