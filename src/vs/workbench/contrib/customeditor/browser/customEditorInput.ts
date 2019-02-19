/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { EditorInput, ConfirmResult, EditorModel } from 'vs/workbench/common/editor';
import { URI } from 'vs/base/common/uri';

export class CustomEditorInput extends EditorInput {

	static readonly ID: string = 'workbench.editorinputs.customEditorInput';

	private dirty: boolean;

	constructor(private name: string, private description: string) {
		super();
	}

	getResource(): URI {
		return URI.file('/Users/bpasero/Desktop/foo.txt');
	}

	setDirty(): void {
		this.dirty = true;
		this._onDidChangeDirty.fire();
	}

	isDirty(): boolean {
		return this.dirty;
	}

	confirmSave(): Promise<ConfirmResult> {
		return Promise.resolve(ConfirmResult.SAVE);
	}

	save(): Promise<boolean> {
		console.log('saving');

		return Promise.resolve(true);
	}

	revert(): Promise<boolean> {
		console.log('reverting');

		return Promise.resolve(true);
	}

	getTelemetryDescriptor(): object {
		return Object.create(null);
	}

	resolve(): Promise<EditorModel | null> {
		return Promise.resolve(null);
	}

	getTypeId(): string {
		return CustomEditorInput.ID;
	}

	getName(): string {
		return this.name;
	}

	getDescription(): string {
		return this.description;
	}

	matches(otherInput: any): boolean {
		if (super.matches(otherInput) === true) {
			return true;
		}

		if (otherInput) {
			if (!(otherInput instanceof CustomEditorInput)) {
				return false;
			}

			return otherInput === this;
		}

		return false;
	}
}