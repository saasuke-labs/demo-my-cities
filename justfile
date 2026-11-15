# My Cities: build and preview commands. Run `just` to list them.

# The Gengo commit this site is built with (same as .github/workflows/deploy.yml).
gengo_ref := "770ea4b2278c60a755c4df36e7da7a71f48d7754"

set shell := ["bash", "-euo", "pipefail", "-c"]

export PATH := justfile_directory() + "/.bin:" + env_var("PATH")

default:
    @just --list

# Build the pinned Gengo into ./.bin (needs Go 1.24 or newer)
init:
    rm -rf .gengo
    git clone https://github.com/saasuke-labs/gengo .gengo
    cd .gengo && git checkout {{gengo_ref}} && go build -o ../.bin/gengo ./cmd/main.go
    rm -rf .gengo

# Generate the site into ./dist
build:
    rm -rf dist
    gengo generate --manifest gengo.yaml --output dist --plain | grep -E '^(File|Generated|Warning)'

# Build, then serve ./dist at http://localhost:3000 with live reload
serve: build
    gengo serve --site dist --watch
