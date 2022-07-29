#!/bin/bash
# runtime / upgrade notes

# everything works fine for node@v16 (so far)
nvm use 16

# bug with latest version or something stupid for yarn for the interactive upgrade
npm install -g yarn@v1.16.0

# a for all
yarn upgrade-interactive --latest