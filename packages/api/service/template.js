const { onGetByWithTheme } = require("../data/template");

const onGet = ({ caller }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await onGetByWithTheme({ caller });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  onGet,
};
