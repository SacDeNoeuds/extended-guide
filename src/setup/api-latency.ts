export const apiDefaults = {
  /** used to slow down the api calls, to see the loading states */
  preflightDelayInMs: 0,
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function delayApiCall() {
  await delay(apiDefaults.preflightDelayInMs)
}
