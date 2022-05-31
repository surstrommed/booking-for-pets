export function promiseReducer(
  state = {},
  { type, status, payload, error, name }
) {
  if (type === "PROMISE") {
    return {
      ...state,
      [name]: { status, payload, error },
    };
  }
  return state;
}

export function currencyReducer(state = {}, { type, currency, exchangeList }) {
  if (type === "CURRENCY_LIST") {
    if (Object.keys(currency).length > 0) {
      return {
        ...state,
        currency,
      };
    } else return state;
  }
  if (type === "EXCHANGE_LIST") {
    if (Object.keys(exchangeList).length > 0) {
      return {
        ...state,
        exchangeList,
      };
    } else return state;
  }
  return state;
}
