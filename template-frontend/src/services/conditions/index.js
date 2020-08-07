// Mock data
import conditions from "../../data/conditions";

export const getAllConditionsByAccountId = accountId => {
  // TODO retrieve from server instead of local file
  return new Promise(resolve => {
    // Make request to backend (see conditions file in /data for expected output)
    setTimeout(() => {
      resolve({
        // Change
        conditions
      });
    }, 700);
  });
};
