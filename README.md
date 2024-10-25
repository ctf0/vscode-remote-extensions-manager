# Remote Extensions Manager

https://github.com/user-attachments/assets/3f247628-2a0c-4398-8490-11d40b83d2cf

> built with [bolt](https://bolt.new/)

An extension to help manage which VS Code extensions should be automatically installed on remote server. a more or less of a companion to [Visual Studio Code Remote - SSH
](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)

> Back-Story

sadly vscode doesnt offer any way to manage/list installed extensions on remote server "at least to my knowledge", so to get around that i made this extension.

> Features

- A List with all the installed & saved extensions to enable/disable.
- Auto-Sync the `remote.SSH.defaultExtensions` configuration when clicking on one of the listed extensions.

> Usage

- Focus the `Remote Extensions Manager` view.
- toggle extensions you want to auto-install on remote server.
- Connect to your SSH server, and all the selected extensions will be automatically installed.
