import NYTimes from '../../services/scrapers/nytimes'

const nytimes = new NYTimes()

export default {
  scrapers: [nytimes],
  timeDifference: -4,
}
