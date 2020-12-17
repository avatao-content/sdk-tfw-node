import { ZMQMessage, LayoutName, TerminalMenuItemName } from "../../types";

export function prepareAskReloadSiteMessage(
  needConfirmationPrompt: boolean,
): ZMQMessage {
  return {
    key: "frontend.site",
    askReloadSite: needConfirmationPrompt,
  };
}

export function prepareSetDocumentTitleMessage(title: string): ZMQMessage {
  return {
    key: "frontend.site",
    documentTitle: title,
  };
}

export function prepareSetEnabledLayoutsMessage(
  layouts: LayoutName[],
): ZMQMessage {
  return {
    key: "frontend.dashboard",
    enabledLayouts: layouts,
  };
}

export function prepareSetLayoutMessage(layout: LayoutName): ZMQMessage {
  return {
    key: "frontend.dashboard",
    layout: layout,
  };
}

export function prepareHideBotMessagesMessage(
  hideMessages: boolean,
): ZMQMessage {
  return {
    key: "frontend.dashboard",
    hideMessages: hideMessages,
  };
}

export function prepareSetIframeUrlMessage(url: string): ZMQMessage {
  return {
    key: "frontend.dashboard",
    iframeUrl: url,
  };
}

export function prepareShowIframeUrlBarMessage(
  showUrlBar: boolean,
): ZMQMessage {
  return {
    key: "frontend.dashboard",
    showUrlBar: showUrlBar,
  };
}

export function prepareSetTerminalMenuItemMessage(
  menuItem: TerminalMenuItemName,
): ZMQMessage {
  return {
    key: "frontend.dashboard",
    terminalMenuItem: menuItem,
  };
}
