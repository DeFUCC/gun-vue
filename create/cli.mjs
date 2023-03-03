#!/usr/bin/env node

import { execSync } from 'child_process'

function runCommand(command) {
  try {
    execSync(`${command}`, { stdio: 'inherit' })
  } catch (e) {
    console.error(`Error in ${command}:`, e)
    return false
  }
  return true
}

const folder = process.argv[2];
const gitCheckout = `git clone --depth 1 --sparse https://github.com/defucc/gun-vue/create`
const installDeps = `cd ${folder} && pnpm i`

console.log(`Cloning the template from ${folder}`)
const checkedOut = runCommand(gitCheckout)
if (!checkedOut) process.exit(-1)

console.log("Installing")
const installedDeps = runCommand(installDeps)
if (!installedDeps) process.exit(-1)

console.log('Welcome to Gun-Vue!')
console.log(`cd ${folder} && pnpm i`)