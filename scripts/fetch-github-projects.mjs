import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const command = 'gh repo list sak-124 --limit 200 --json name,url,isPrivate,updatedAt,description,primaryLanguage'
const stdout = execSync(command, { encoding: 'utf8' })
const repos = JSON.parse(stdout)

writeFileSync('data/github-repos.json', JSON.stringify(repos, null, 2))
console.log(`Saved ${repos.length} repositories to data/github-repos.json`)
