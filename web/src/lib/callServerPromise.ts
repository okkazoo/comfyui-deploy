export async function callServerPromise<T>(promise: Promise<T>): Promise<T> {
  try {
    return await promise;
  } catch (e) {
    console.error(e);
    throw e;
  }
} 