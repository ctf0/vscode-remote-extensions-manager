import * as vscode from 'vscode';
import * as utils from '../utils';

export default class TreeItem extends vscode.TreeItem {
    constructor(
        public readonly extension: vscode.Extension<any>,
        public readonly isSelected: boolean
    ) {
        const { packageJSON: { displayName, name } } = extension

        const truncateLength: number = utils.truncateLength;
        const truncated = (displayName && displayName.length > truncateLength)
            ? `${displayName.substring(0, truncateLength)}...`
            : displayName

        super(truncated || name, vscode.TreeItemCollapsibleState.None);

        this.tooltip = `show more info`;
        this.contextValue = 'extension';
        this.command = {
            command: `${utils.PKG_NAME}.showExtension`,
            title: 'Lookup Extension',
            arguments: [this]
        };

        this.iconPath = new vscode.ThemeIcon(isSelected ? 'check' : 'add');
    }
}
