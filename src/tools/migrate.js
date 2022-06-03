const CommandBase = require('../src/lib/command_base')
const providers = require('../src/lib/providers')
const app = providers.application()

const cmd = new CommandBase()
process.env.NODE_ENV = cmd.argument('env', 'dev')

app.initEnv()
app.loadConfig()
const run = async () => {
  const database = await app.initDatabase()

  await database.migrate(cmd.argument('file'))
  process.exit()
}
run();
