import Faz from '../../services/scrapers/faz'

const faz = new Faz()

export default {
  scrapers: [faz],
  std: 1,
  dst: 2,
  name: 'Europe/Berlin',
}
