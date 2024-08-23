export function resolvePromise(prms, promiseState) {
  promiseState.promise = prms;
  promiseState.data = null;
  promiseState.error = null;

  if (prms !== null) return prms.then(dataACB).catch(errorACB);

  function dataACB(rslt) {
    if (promiseState.promise === prms) {
      if (rslt === undefined) {
        promiseState.error = "Please enter a valid food name";
      }
      promiseState.data = rslt;
    }
  }
  function errorACB(err) {
    if (promiseState.promise === prms) {
      promiseState.error = err;
    }
  }
}
