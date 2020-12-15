export type CallbackFunction = (required: any, ...optional: any[]) => any;

export type CallbackDict = Record<string, CallbackFunction>;

export type ZMQMessage = Record<string, string>;
