const tmp = require("tmp");
const { appendFile } = require("fs");
const { open } = require("fs/promises");

const writeToTmpFile = ({ data }) =>
  new Promise((resolve, reject) =>
    tmp.file((err, path, fd, cleanup) => {
      if (err) throw reject(err);

      appendFile(path, `export default ${JSON.stringify(data)}`, () => {
        resolve({
          path,
          fd,
          cleanup,
        });
      });
    })
  );

/**
 * Returns file object. Don't forget to close. file.close()
 * @param {string} path
 * @returns file object
 */
const getFile = async ({ path }) => await open(path, "r");

module.exports = {
  writeToTmpFile,
  getFile,
};
