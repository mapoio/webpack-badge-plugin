import http from 'http'
import https from 'https'
import {BadgeFactory} from 'gh-badges'

http.globalAgent.maxSockets = https.globalAgent.maxSockets = 50

export class BadgePlugin {
  constructor(badges = [], options = {}) {
    this.badgeList = badges
    this.options = options
    this.Barge = new BadgeFactory()
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap('BadgePlugin', (compilation) => {
      if (!Array.isArray(this.badgeList)) {
        compilation.errors.push(new Error('badgeList must be array'))

        return undefined
      }
      this.badgeList.forEach(item => {
        const badge = this.Barge.create(item)

        compilation.assets[item.fileName] = {
          source() {return badge},
          size() {return badge.length}
        }
      })
    })
  }
}

export default BadgePlugin
