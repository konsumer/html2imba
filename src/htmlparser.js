// TODO: rewrite in imba, I'm still new to it

import { Parser } from 'htmlparser2'

export const parse = (html) => new Promise((resolve, reject) => {
  let out = ''
  let indent = 0
  const parser = new Parser({
    onopentag: (name, attribs) => {
      out += `${'  '.repeat(indent)}<${name}`
      const tribs = []
      Object.keys(attribs).forEach(a => {
        if (a === 'class') {
          out += `.${attribs.class.split(' ').join('.')}`
        } else if (a === 'id') {
          out += `#${attribs.id}`
        } else {
          tribs.push(` ${a}=${JSON.stringify(attribs[a])}`)
        }
      })
      out += `${tribs.join('')}>\n`
      indent += 2
    },

    ontext: (text) => {
      const t = text.trim()
      if (t && t !== '') {
        out = out.substring(0, out.length - 1) + ' ' + JSON.stringify(t)
      }
    },

    onclosetag: (tagname) => {
      out += '\n'
      indent -= 2
    },

    onerror: reject,

    onend: () => {
      resolve(out)
    }
  })
  parser.write(html)
  parser.end()
})
