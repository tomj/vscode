/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { BaseEditor } from 'vs/workbench/browser/parts/editor/baseEditor';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { IThemeService } from 'vs/platform/theme/common/themeService';
import { Dimension } from 'vs/base/browser/dom';
import { IStorageService } from 'vs/platform/storage/common/storage';
import { CustomEditorInput } from 'vs/workbench/contrib/customeditor/browser/customEditorInput';

export class CustomEditor extends BaseEditor {

	public static readonly ID: string = 'workbench.editor.customEditor';

	constructor(
		@ITelemetryService telemetryService: ITelemetryService,
		@IThemeService themeService: IThemeService,
		@IStorageService storageService: IStorageService) {
		super(CustomEditor.ID, telemetryService, themeService, storageService);
	}

	protected createEditor(parent: HTMLElement): void {
		const span = document.createElement('span');
		span.textContent = 'Hello Custom Editor';
		span.onclick = () => {
			(this.input as CustomEditorInput).setDirty();
		};

		parent.appendChild(span);
	}

	public layout(dimension: Dimension): void {
	}
}