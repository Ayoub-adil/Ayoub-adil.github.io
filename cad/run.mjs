// Runs build_part.py with the local venv's Python (Windows or POSIX layout).
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

const venv = join(import.meta.dirname, '.venv')
const py = [join(venv, 'Scripts', 'python.exe'), join(venv, 'bin', 'python')].find(existsSync)
if (!py) {
  console.error('cad/.venv not found. Create it with: python -m venv cad/.venv && cad/.venv pip install build123d')
  process.exit(1)
}
const { status } = spawnSync(py, [join(import.meta.dirname, 'build_part.py')], { stdio: 'inherit' })
process.exit(status ?? 1)
