export function log(message: string) {
  if (process.env.SDKTEST === "true") {
    console.log(message);
  }
}
