// import { Client } from '@widgetbot/embed-api'

import { API } from './types'
import { applyStyles, generateUUID, Shadow } from './util'

class Embed {
  id = generateUUID()
  iframe = document.createElement('iframe') as API

  constructor(readonly root: API, server?: string, channel?: string) {
    const { id, iframe } = this
    if (this.injected) return

    // const api = new Client({ id, iframe })

    const shadow = Shadow(root as any)
    shadow.appendChild(iframe)

    const { url, ...styles } = this.parseAttributes(root, server, channel)
    iframe.setAttribute('src', url)

//     this.setAPI(root, {
//       on: (e, c) => api.on(e, c),
//       emit: (e, d) => api.emit(e, d),
//       contentWindow: iframe.contentWindow,
//       contentDocument: iframe.contentDocument
//     })

    applyStyles(root, {
      display: 'inline-block',
      overflow: 'hidden',
      backgroundColor: '#F4F4F4',
      borderRadius: '7px',
      verticalAlign: 'top',
      ...styles
    })
    applyStyles(iframe, {
      border: 'none',
      width: '100%',
      height: '100%'
    })
  }

  get injected() {
    return 'emit' in this.root && 'on' in this.root
  }

  private parseAttributes(node: Element, server?: string, channel?: string) {
    server = server || node.getAttribute('server') || '299881420891881473'
    channel = channel || node.getAttribute('channel')
    const shard = node.getAttribute('shard') || 'https://e.widgetbot.io'

    const url = `${shard}/channels/${server}${
      channel ? `/${channel}` : ''
    }/?api=${this.id}`

    const width = node.getAttribute('width')
    const height = node.getAttribute('height')

    return {
      ...({width: width }),
      ...({height: height }),
      url
    }
  }

  private setAPI(element: Element, api) {
    Object.keys(api).forEach(key => (element[key] = api[key]))
  }
}

export default Embed
