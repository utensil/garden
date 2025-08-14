default:
    just list

# This is how the repo was created and synced to GitHub
# Don't run it again
# 
init:
    #!/usr/bin/env bash
    cd ~/projects
    git clone https://github.com/jackyzha0/quartz.git
    cd quartz
    npm i
    quartz create --strategy new --directory content --links shortest
    git remote set-url origin https://github.com/utensil/quartz.git
    git remote add upstream https://github.com/jackyzha0/quartz.git || true
    git remote -v
    npx quartz sync --no-pull

prep:
    npm i

build:
    npx quartz build

dev:
    watchexec --restart -w quartz.config.ts -w quartz.layout.ts -w content -- npx quartz build --serve

sync:
    jj bs v4 -r @- && jj psb v4

# create a new note
new TITLE="new note":
    #!/usr/bin/env bash
    is_working_copy_empty=$(jj status|grep -F 'Working copy (@)'|grep -F '(empty)')
    [[ -z $is_working_copy_empty ]] || jj new
    NOTE_ID=$(jj log -r @ -T 'change_id.short()' --no-graph)
    DATE=$(date "+%Y-%m-%d")
    mkdir -p content/notes
    cp -f templates/notes.md content/notes/$NOTE_ID.md
    sed -i '' -e 's/TITLE/{{TITLE}}/g' -e "s/DATE/$DATE/g" content/notes/$NOTE_ID.md
    echo "New note at content/notes/$NOTE_ID.md"
