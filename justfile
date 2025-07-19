default:
    just list

# This is how the repo was created and synced to GitHub
# Don't run it again
# 
init:
    #!/usr/bin/env zsh
    cd ~/projects
    git clone https://github.com/jackyzha0/quartz.git
    cd quartz
    npm i
    quartz create --strategy new --directory content --links shortest
    git remote set-url origin https://github.com/utensil/quartz.git
    git remote add upstream https://github.com/jackyzha0/quartz.git || true
    git remote -v
    npx quartz sync --no-pull

dev:
    watchexec --restart -w quartz.config.ts -- npx quartz build --serve

sync:
    jj bs v4 -r @- && jj psb v4
