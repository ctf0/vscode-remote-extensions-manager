import vscode from 'vscode';

export let config: vscode.WorkspaceConfiguration
export let truncateLength: number
export let defaultExtensions: []

export const PKG_NAME = 'remoteExtensionsManager'
export const REMOTE_SSH = 'remote.SSH.defaultExtensions'

export function readConfig(): void {
    config = vscode.workspace.getConfiguration();

    truncateLength = config.get(`${PKG_NAME}.truncateLength`) || 20;
    defaultExtensions = config.get(REMOTE_SSH) || []
}
