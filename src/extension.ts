import * as vscode from 'vscode';
import { TerraformCompletionProvider } from "./TerraformCompletionProvider";

const TF_MODE: vscode.DocumentFilter = { language: 'terraform', scheme: 'file' };

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(TF_MODE, new TerraformCompletionProvider(), '.'));
}