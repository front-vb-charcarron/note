#!/usr/bin/env sh
git init
git add -A
git commit -m "deploy"
git push -u https://github.com/front-vb-charcarron/vuepress-notebook.git master
