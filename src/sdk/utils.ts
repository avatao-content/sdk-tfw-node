export function log(message: string): void {
  if (process.env.SDKTEST === "true") {
    console.log(message);
  }
}
