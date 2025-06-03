init:
    curl -fsSL https://raw.githubusercontent.com/saasuke-labs/gengo/main/install/install.sh | bash
    export PATH="$HOME/.local/bin:$PATH"

generate:
    gengo generate --manifest gengo.yaml --output ./site


serve:
    gengo serve --site ./site --watch
