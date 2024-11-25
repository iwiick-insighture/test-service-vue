// eslint-disable-next-line @typescript-eslint/no-require-imports
const { writeFileSync } = require('fs')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { resolve, join } = require('path')

const deployManifest = {
  version: 1,
  resources: [],
}

const distPath = resolve(__dirname, '../dist')
writeFileSync(join(distPath, 'deploy-manifest.json'), JSON.stringify(deployManifest, null, 2))

console.log('Deploy manifest created successfully.')
