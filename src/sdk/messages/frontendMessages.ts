import {
  ZMQMessage,
  FrontendDashboardInput,
  FrontendSiteOptions,
} from "../../types";

export function prepareFrontendSiteMessage(
  paramDict: FrontendSiteOptions,
): ZMQMessage {
  return {
    key: "frontend.site",
    ...paramDict,
  };
}

export function prepareFrontendDashboardMessage(
  paramDict: FrontendDashboardInput,
): ZMQMessage {
  return {
    key: "frontend.dashboard",
    ...paramDict,
  };
}
