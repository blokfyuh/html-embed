import Embed from './embed'
import { API } from './types'

const { version } = require('../package.json')

class WidgetBot {
  public version = version
  public embeds = [] as API[]
  public server: string
  public channel: string
  public shard: string

  constructor(server: string, channel: string, shard: string, dom_id?: string) {
    this.server = server;
    this.channel = channel;
    this.shard = shard;

    this.register(dom_id)

    document.addEventListener('DOMContentLoaded', this.register.bind(this))
  }

  public register(dom_id?: string) {
    const widgetbots = dom_id ? [document.getElementById(dom_id)] : document.getElementsByTagName('widgetbot') as any

    for (const embed of widgetbots) {
      const { root } = new Embed(embed, this.server, this.channel, this.shard)
      this.embeds.push(root)
    }
  }
}

export default WidgetBot
