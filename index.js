const execa = require('execa')
const path = require('path')
const url = require('url')

const bin = path.join(__dirname, 'pg_tmp.sh')

module.exports.default = function pgTmp (setEnvironment, opts = []) {
  setEnvironment = (setEnvironment == null ? true : setEnvironment)

  return execa.stdout(bin, opts).then((connection) => {
    const parsed = url.parse(connection, true)

    const result = {
      connection,
      host: parsed.query.host,
      user: process.env.USER,
      password: '',
      database: parsed.pathname.replace(/^\//, '')
    }

    if (setEnvironment) {
      process.env.PGHOST = result.host
      process.env.PGUSER = result.user
      process.env.PGPASSWORD = result.password
      process.env.PGDATABASE = result.database
    }

    return result
  })
}
