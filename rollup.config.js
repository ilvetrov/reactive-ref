import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.exports['.'].import,
        format: 'es',
        exports: 'named',
      },
    ],
    plugins: [typescript({ exclude: ['src/utils/**', '**.test.ts', '**.test.tsx'] })],
    external: ['react', 'react-dom'],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.exports['.'].require,
        format: 'cjs',
        exports: 'named',
      },
    ],
    plugins: [typescript({ declaration: false })],
    external: ['react', 'react-dom'],
  },
]
