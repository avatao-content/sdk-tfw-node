import { ZMQMessage } from "../../types";

export function prepareChatBotSendMessage(
  messageContent: string,
  originator?: string,
): ZMQMessage {
  return {
    key: "message.send",
    originator: originator ? originator : "avataobot",
    message: messageContent,
  };
}

export function prepareChatBotQueueMessage(
  messageContents: string[],
  originator?: string,
): ZMQMessage {
  var messages: ZMQMessage[] = [];
  messageContents.forEach((content) => {
    messages.push({
      originator: originator ? originator : "avataobot",
      message: content,
    });
  });

  var message = {
    key: "message.queue",
    originator: originator ? originator : "avataobot",
    messages: messages,
  };
  return message;
}
