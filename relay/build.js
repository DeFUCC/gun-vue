import * as esbuild from 'esbuild'

async function build() {
  try {
    const result = await esbuild.build({
      entryPoints: ['start.js'],
      bundle: true,
      platform: 'node',
      target: 'node18',
      outfile: 'dist/index.cjs',
      format: 'cjs',
      minify: true,
      metafile: true,
      define: {
        'process.env.RELAY_QR': 'true',
      }
    })

    console.log('Build completed successfully')
  } catch (error) {
    console.error('Build failed:', error)
    process.exit(1)
  }
}

build()
