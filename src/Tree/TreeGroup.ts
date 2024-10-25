import * as vscode from 'vscode';
import TreeItem from './TreeItem';

export default class TreeGroup extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly extensions: TreeItem[]
    ) {
        super(
            label,
            extensions.length > 0
                ? vscode.TreeItemCollapsibleState.Expanded
                : vscode.TreeItemCollapsibleState.None
        );

        this.contextValue = 'group';
        this.description = `(${extensions.length})`;
    }
}
