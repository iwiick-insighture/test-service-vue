// eslint-disable-next-line @typescript-eslint/no-require-imports
const { writeFileSync, readdirSync } = require('fs')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { resolve, join } = require('path')

function generateDeployManifest() {
  const distPath = resolve(__dirname, '../dist')

  // Read the files in the dist directory
  const files = readdirSync(distPath)

  // Map files to the correct Amplify manifest format
  const artifacts = {
    baseDirectory: 'dist',
    files: files.filter((file) => file !== 'deploy-manifest.json'),
  }

  const deployManifest = {
    // Amplify requires version as a string
    version: '1.0',
    // appBuild contains the artifact information
    appBuild: {
      artifacts: artifacts,
      buildSteps: [],
    },
  }

  try {
    writeFileSync(join(distPath, 'deploy-manifest.json'), JSON.stringify(deployManifest, null, 2))
    console.log('Deploy manifest created successfully:', join(distPath, 'deploy-manifest.json'))
  } catch (error) {
    console.error('Error creating deploy manifest:', error)
  }
}

generateDeployManifest()
