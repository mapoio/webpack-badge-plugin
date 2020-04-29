import http from 'http'
import https from 'https'
import _ from 'lodash'
import { BadgeFactory } from 'gh-badges'

http.globalAgent.maxSockets = https.globalAgent.maxSockets = 50

export class BadgePlugin {
  constructor(badges = [], options = {}) {
    this.badgeList = badges
    this.Barge = new BadgeFactory()
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap('BadgePlugin', (compilation) => {
      if (!Array.isArray(this.badgeList)) {
        compilation.errors.push(new Error('badgeList must be array'))
        return
      }
      this.badgeList.forEach(item => {
        const { fileName, ...props } = item
        const badge = this.Barge.create(props)
        compilation.assets[fileName] = {
          source: function() { return badge },
          size: function() { return badge.length }
        }
      })
    })
  }
}

export default BadgePlugin