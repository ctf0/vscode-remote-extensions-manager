import * as vscode from 'vscode';
import TreeGroup from '../Tree/TreeGroup';
import TreeItem from '../Tree/TreeItem';
import * as utils from '../utils';

export default class ExtensionsProvider implements vscode.TreeDataProvider<TreeGroup | TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<TreeGroup | TreeItem | undefined | null | void> = new vscode.EventEmitter<TreeGroup | TreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<TreeGroup | TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: TreeGroup | TreeItem): vscode.TreeItem {
        return element;
    }

    async getChildren(element?: TreeGroup | TreeItem): Promise<(TreeGroup | TreeItem)[]> {
        if (!element) {
            const allExtensions: vscode.Extension<any>[] = vscode.extensions.all.filter((ext) => !ext.id.startsWith('vscode.'));
            const defaultExtensions: string[] = utils.defaultExtensions;

            const selectedExtensions = this
                .sortAlpha(allExtensions.filter(ext => defaultExtensions.includes(ext.id.toLowerCase())))
                .map(ext => new TreeItem(ext, true));

            const availableExtensions = this
                .sortAlpha(allExtensions.filter(ext => !defaultExtensions.includes(ext.id.toLowerCase())))
                .map(ext => new TreeItem(ext, false));

            return [
                new TreeGroup('Saved Extensions', selectedExtensions),
                new TreeGroup('Installed Extensions', availableExtensions)
            ];
        }

        if (element instanceof TreeGroup) {
            return element.extensions;
        }

        return [];
    }

    sortAlpha(list: vscode.Extension<any>[]): vscode.Extension<any>[] {
        return list.sort((a, b) => a.packageJSON.name.toLowerCase().localeCompare(b.packageJSON.name.toLowerCase()))
    }
}
