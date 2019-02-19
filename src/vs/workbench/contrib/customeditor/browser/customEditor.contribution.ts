/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { EditorDescriptor, IEditorRegistry, Extensions as EditorExtensions } from 'vs/workbench/browser/editor';
import { CustomEditor } from 'vs/workbench/contrib/customeditor/browser/customEditor';
import { SyncDescriptor } from 'vs/platform/instantiation/common/descriptors';
import { Registry } from 'vs/platform/registry/common/platform';
import { CustomEditorInput } from 'vs/workbench/contrib/customeditor/browser/customEditorInput';
import { IWorkbenchActionRegistry, Extensions as WorkbenchActionExtensions } from 'vs/workbench/common/actions';
import { SyncActionDescriptor } from 'vs/platform/actions/common/actions';
import { Action } from 'vs/base/common/actions';
import { IEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';

const editorDescriptor = new EditorDescriptor(
	CustomEditor,
	CustomEditor.ID,
	'Custom Editor'
);

Registry.as<IEditorRegistry>(EditorExtensions.Editors)
	.registerEditor(editorDescriptor, [new SyncDescriptor(CustomEditorInput)]);

const actionRegistry = Registry.as<IWorkbenchActionRegistry>(WorkbenchActionExtensions.WorkbenchActions);

export class OpenCustomEditorAction extends Action {
	static readonly ID = 'workbench.action.openCustomEditor';
	static LABEL = 'Open Custom Editor';

	constructor(
		id: string, label: string,
		@IEditorService private readonly _editorService: IEditorService,
		@IInstantiationService private readonly _instantiationService: IInstantiationService
	) {
		super(id, label);
	}

	public async run(e?: any): Promise<any> {
		await this._editorService.openEditor(this._instantiationService.createInstance(CustomEditorInput, 'Hello', 'World'));
	}
}

const openViewletActionDescriptor = new SyncActionDescriptor(OpenCustomEditorAction, OpenCustomEditorAction.ID, OpenCustomEditorAction.LABEL);
actionRegistry.registerWorkbenchAction(openViewletActionDescriptor, 'Open Custom Editor');

