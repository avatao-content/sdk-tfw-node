export type CallbackFunction = (required: any, ...optional: any[]) => any;

export type CallbackDict = Record<string, CallbackFunction>;

export type ZMQMessage = Record<string, any>;

export type LayoutName =
  | "terminal-ide-web"
  | "terminal-ide-vertical"
  | "terminal-web"
  | "ide-web-vertical"
  | "terminal-ide-horizontal"
  | "terminal-only"
  | "ide-only"
  | "web-only";

export type TerminalMenuItemName = "terminal" | "console";

export type DeployButtonKeys = "TODEPLOY" | "DEPLOYED" | "DEPLOYING" | "FAILED";
export type DeployButtonText = Record<DeployButtonKeys, string>;

export type FrontendSiteOptions = {
  title?: string;
  needConfirmPrompt?: boolean;
};

export type FrontendDashboardInput = {
  layout?: LayoutName;
  hideMessages?: boolean;
  iframeUrl?: string;
  showUrlBar?: boolean;
  terminalMenuItem?: TerminalMenuItemName;
  enabledLayouts?: LayoutName[];
};

export type FsmTriggerOptions = { force: boolean };

export type FrontendIdeOptions = {
  autoSaveInterval?: number;
  showDeployButton?: boolean;
  deployButtonText?: DeployButtonText;
};
