const errors = require("./errors");
const {handleSuccess} = require("./utils");
const {uploadToS3} = require('./aws');

/**
 * @description checks if test includes value
 * @param {[*]} test
 * @param {int} oldError
 * @param {int} newError
 * @param {*} value
 * @returns {int | null}
 */
const getError = (test, oldError, newError, value) =>
    test.includes(value) ? oldError : newError;

/**
 * @description validates whether a file is valid or not
 * @param {*} payload
 * @returns {int | null} errorCode
 */
const validateFile = ({ type, extension, folder }) => {
    let errorCode = null;

    switch (type) {
        case "image":
            errorCode = getError(
                imageExtensionWhiteList,
                errorCode,
                3003,
                extension
            );
            errorCode = getError([".jpg", ".jpeg", ".png"], errorCode, 3011, folder);
            break;
        default:
    }

    return errorCode;
};

/**
 * @description sometimes it might be an error unlinking. Usually it will be invalid data though;
 * @param {*} payload
 * @returns {*}
 */
const mapUnlinkError = ({
    error,
    errorCode,
    service,
    extension,
    filename,
    folder,
    caller
}) => ({
    code: error ? 3006 : errorCode,
    error: {
        service,
        reason: error ? error.message : "invalid file, extension, or folder",
        data: { extension, filename, folder },
        caller
    }
});

module.exports.uploadFile = async ({ bucketName, file, type, name, folder, caller }) => new Promise(async (resolve, reject) => {
    try {
      const { path: tempPath, filename, originalname } = file;
  
      const extension = filePath.extname(originalname).toLowerCase();
  
      const error = validateFile({ type, extension, folder });
  
      if (error) {
          fs.unlink(tempPath, err => {
              const { code, error: errorData } = mapUnlinkError({
                  error: err,
                  errorCode: error,
                  service: "UTILS_UPLOAD",
                  extension,
                  filename,
                  folder,
                  caller
              });
  
              reject(errors[code](errorData));
          });
      }

      await uploadToS3({ file: tempPath, bucket: bucketName, key: targetPath, caller });
  
      resolve(
          handleSuccess(
              `UTILS_UPLOAD - FROM ${caller} - file uploaded`,
              {
                  path: targetPath
              }
          )
        );
    } catch (error) {
        reject(error);
    }
  })
