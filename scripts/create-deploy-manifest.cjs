// eslint-disable-next-line @typescript-eslint/no-require-imports
const { writeFileSync, readdirSync } = require('fs')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { resolve, join } = require('path')

function generateDeployManifest() {
  const distPath = resolve(__dirname, '../dist')

  // Read the files in the dist directory
  const files = readdirSync(distPath)

  // Create resources array with proper format
  const resources = files.map((file) => ({
    // Remove leading slash as AWS doesn't expect it
    path: file,
    // eTag is required by AWS
    eTag: Date.now().toString(),
    // Required properties for AWS deploy manifest
    content: {
      encoding: null,
      contentType: getContentType(file),
    },
  }))

  const deployManifest = {
    version: 1,
    // time is a required field
    time: new Date().toISOString(),
    resources,
  }

  try {
    writeFileSync(join(distPath, 'deploy-manifest.json'), JSON.stringify(deployManifest, null, 2))
    console.log('Deploy manifest created successfully:', join(distPath, 'deploy-manifest.json'))
  } catch (error) {
    console.error('Error creating deploy manifest:', error)
  }
}

// Helper function to determine content type
function getContentType(filename) {
  const ext = filename.split('.').pop().toLowerCase()
  const contentTypes = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    json: 'application/json',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    ico: 'image/x-icon',
  }
  return contentTypes[ext] || 'application/octet-stream'
}

generateDeployManifest()
