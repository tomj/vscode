/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// tslint:disable-next-line: no-standalone-editor
import { SimpleWorkspaceContextService as StandaloneWorkspaceContextService, SimpleConfigurationService as StandaloneConfigurationService } from 'vs/editor/standalone/browser/simpleServices';
import { IEnvironmentService, IExtensionHostDebugParams, IDebugParams } from 'vs/platform/environment/common/environment';
import { URI } from 'vs/base/common/uri';
import { Event } from 'vs/base/common/event';
import { IPCClient, IMessagePassingProtocol } from 'vs/base/parts/ipc/node/ipc';

export class SimpleWorkspaceContextService extends StandaloneWorkspaceContextService { }
export class SimpleConfigurationService extends StandaloneConfigurationService { }

export class SimpleEnvironmentService implements IEnvironmentService {
	_serviceBrand: any;
	args = { _: [] };
	execPath: string;
	cliPath: string;
	appRoot: string;
	userHome: string;
	userDataPath: string;
	appNameLong: string;
	appQuality?: string;
	appSettingsHome: string;
	appSettingsPath: string;
	appKeybindingsPath: string;
	settingsSearchBuildId?: number;
	settingsSearchUrl?: string;
	globalStorageHome: string;
	workspaceStorageHome: string;
	backupHome: string;
	backupWorkspacesPath: string;
	workspacesHome: string;
	isExtensionDevelopment: boolean;
	disableExtensions: boolean | string[];
	builtinExtensionsPath: string;
	extensionsPath: string;
	extensionDevelopmentLocationURI?: URI;
	extensionTestsPath?: string;
	debugExtensionHost: IExtensionHostDebugParams;
	debugSearch: IDebugParams;
	logExtensionHostCommunication: boolean;
	isBuilt: boolean;
	wait: boolean;
	status: boolean;
	log?: string;
	logsPath: string;
	verbose: boolean;
	skipGettingStarted: boolean;
	skipReleaseNotes: boolean;
	skipAddToRecentlyOpened: boolean;
	mainIPCHandle: string;
	sharedIPCHandle: string;
	nodeCachedDataDir?: string;
	installSourcePath: string;
	disableUpdates: boolean;
	disableCrashReporter: boolean;
	driverHandle?: string;
	driverVerbose: boolean;
}

export class SimpleIPCClient extends IPCClient {
	constructor() {
		super(new SimpleMessagePassingProtocol(), '');
	}
}

export class SimpleMessagePassingProtocol implements IMessagePassingProtocol {
	onMessage: Event<Buffer> = Event.None;
	send(buffer: Buffer): void { }
}
