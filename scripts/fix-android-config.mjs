import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const stringsPath = path.join(root, 'android', 'app', 'src', 'main', 'res', 'values', 'strings.xml')
const capacitorJsonPath = path.join(
  root,
  'android',
  'app',
  'src',
  'main',
  'assets',
  'capacitor.config.json',
)

async function updateStrings() {
  const xml = await readFile(stringsPath, 'utf8')
  const nextXml = xml
    .replace(/<string name="app_name">.*?<\/string>/, '<string name="app_name">Sıla</string>')
    .replace(
      /<string name="title_activity_main">.*?<\/string>/,
      '<string name="title_activity_main">Sıla</string>',
    )

  await writeFile(stringsPath, nextXml, 'utf8')
}

async function updateCapacitorJson() {
  const json = JSON.parse(await readFile(capacitorJsonPath, 'utf8'))
  json.appName = 'Sıla'
  await writeFile(capacitorJsonPath, `${JSON.stringify(json, null, '\t')}\n`, 'utf8')
}

await Promise.all([updateStrings(), updateCapacitorJson()])
