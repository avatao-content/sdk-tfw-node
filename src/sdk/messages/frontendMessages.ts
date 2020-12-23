import {
  ZMQMessage,
  FrontendDashboardInput,
  FrontendSiteInput,
} from "../../types";

export function prepareFrontendSiteMessage(
  paramDict: FrontendSiteInput,
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
