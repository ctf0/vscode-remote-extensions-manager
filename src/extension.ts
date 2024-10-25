import * as vscode from 'vscode';
import ExtensionsProvider from './Provider/ExtensionsProvider';
import TreeItem from './Tree/TreeItem';
import * as utils from './utils';

export function activate(context: vscode.ExtensionContext): void {
    const extensionsProvider = new ExtensionsProvider();

    utils.readConfig()

    vscode.window.registerTreeDataProvider(utils.PKG_NAME, extensionsProvider);

    context.subscriptions.push(
        vscode.commands.registerCommand(`${utils.PKG_NAME}.refresh`, () => extensionsProvider.refresh()),
        vscode.commands.registerCommand(`${utils.PKG_NAME}.showExtension`, async (item: TreeItem) => {
            const extension = item.extension

            let { id, packageJSON: { displayName } } = extension
            id = id.toLowerCase()

            vscode.commands.executeCommand('workbench.extensions.search', `@installed ${displayName}`);
        }),
        vscode.commands.registerCommand(`${utils.PKG_NAME}.toggleExtension`, async (item: TreeItem) => {
            const extension = item.extension

            let { id, packageJSON: { displayName } } = extension
            id = id.toLowerCase()

            const defaultExtensions: string[] = utils.defaultExtensions;

            const newExtensions = item.isSelected
                ? defaultExtensions.filter(item => item !== id)
                : [...defaultExtensions, id];

            await utils.config.update(
                utils.REMOTE_SSH,
                newExtensions,
                vscode.ConfigurationTarget.Global
            );

            // Show notification
            vscode.window.showInformationMessage(
                item.isSelected
                    ? `Removed (${displayName}) from remote extensions`
                    : `Added (${displayName}) to remote extensions`
            );
        })
    );

    vscode.workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration(utils.PKG_NAME) || e.affectsConfiguration(utils.REMOTE_SSH)) {
            utils.readConfig();
            vscode.commands.executeCommand(`${utils.PKG_NAME}.refresh`)
        }
    });
}
