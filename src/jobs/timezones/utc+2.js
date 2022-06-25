import Faz from '../../services/scrapers/faz'

const faz = new Faz()

export default {
  scrapers: [faz],
  timeDifference: 2,
}
