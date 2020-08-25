export const LS_KEYS = {
  IS_AUTHENTICATED: "isAuthenticated",
  ADDRESS_ID: "addressId",
  ACCOUNT_EMAIL: "accountEmail",
  ACCOUNT_ID: "accountId",
  ACCOUNT_ROLE: "accountRole",
  ACCOUNT_AUTH_TOKEN: "authToken"
};

export const setItem = (itemKey, itemValue) => {
  try {
    localStorage.setItem(itemKey, String(itemValue));
  } catch (err) {
    console.error(
      `Could not add ${itemKey} with value ${itemValue} to LocalStorage`
    );
    throw err;
  }
};

export const getItem = itemKey => {
  try {
    return String(localStorage.getItem(itemKey));
  } catch (err) {
    console.error(
      `Could not retrieve item with key ${itemKey} from LocalStorage`
    );
    throw err;
  }
};

export const clearAll = () => {
  try {
    localStorage.clear();
  } catch (err) {
    console.error("Could not clear LocalStorage");
    throw err;
  }
};
