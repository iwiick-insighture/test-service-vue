// eslint-disable-next-line @typescript-eslint/no-require-imports
const { writeFileSync, readdirSync } = require('fs')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { resolve, join } = require('path')

const distPath = resolve(__dirname, '../dist')

// Read the files in the dist directory to populate resources
const files = readdirSync(distPath)

const resources = files.map((file) => {
  return {
    path: '/',
    filename: file,
  }
})

const deployManifest = {
  version: 1,
  resources,
}

// Write the deploy-manifest.json to the dist directory
writeFileSync(join(distPath, 'deploy-manifest.json'), JSON.stringify(deployManifest, null, 2))

console.log('Deploy manifest created successfully:', join(distPath, 'deploy-manifest.json'))
