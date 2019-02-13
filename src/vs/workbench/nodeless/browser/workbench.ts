/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// tslint:disable: all

import { localize } from 'vs/nls';

import { SimpleWorkspaceContextService, SimpleConfigurationService, SimpleEnvironmentService, SimpleIPCClient } from 'vs/workbench/nodeless/services/simpleServices';
import { Shell } from 'vs/workbench/electron-browser/shell';
import { NullLogService } from 'vs/platform/log/common/log';
import { InMemoryStorageService } from 'vs/platform/storage/common/storage';
import { IWindowConfiguration } from 'vs/platform/windows/common/windows';
import { ServiceCollection } from 'vs/platform/instantiation/common/serviceCollection';

// Simple Services
const workspaceService = new SimpleWorkspaceContextService();
const configurationService = new SimpleConfigurationService();
const environmentService = new SimpleEnvironmentService();
const logService = new NullLogService();
const storageService = new InMemoryStorageService();
const mainServices = new ServiceCollection();
const mainProcessClient = new SimpleIPCClient();

// Config
const configuration: IWindowConfiguration = Object.create(null);

// Create Shell
const shell = new Shell(document.body, {
	contextService: workspaceService,
	configurationService: configurationService,
	environmentService,
	logService,
	storageService
}, mainServices, mainProcessClient, configuration);

// Open Shell
shell.open();

// Inform user about loading issues from the loader
(<any>self).require.config({
	onError: err => {
		if (err.errorCode === 'load') {
			shell.onUnexpectedError(new Error(localize('loaderErrorNative', "Failed to load a required file. Please restart the application to try again. Details: {0}", JSON.stringify(err))));
		}
	}
});