import NYTimes from '../../services/scrapers/nytimes'

const nytimes = new NYTimes()

export default {
  scrapers: [nytimes],
  std: -5,
  dst: -4,
  name: 'America/New_York',
}
