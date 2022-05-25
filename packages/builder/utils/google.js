const {siteVerification_v1} = require('googleapis');
const defaultConfig = require('./config')
const {logger} = require('./utils')

/**
         * Get the most current data for a website or domain.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/siteVerification.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const siteVerification = google.siteVerification('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/siteverification'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options({auth: authClient});
         *
         *   // Do the magic
         *   const res = await siteVerification.webResource.get({
         *     // The id of a verified site or domain.
         *     id: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "id": "my_id",
         *   //   "owners": [],
         *   //   "site": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * ```
         *
         * @param params - Parameters for request
         * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param callback - Optional callback that handles the response.
         * @returns A promise if used with async/await, or void if used with a callback.
         */
/**
 * @description returns a token that can be placed on a sites HTML, file, or DNS records
 * HTML -> <meta name="google-site-verification" content="-dhsoFQadgDKJR7BsB6bc1j5yfqjUpg_b-1pFjr7o3x" />
 */
const getSiteVerificationToken = async ({ domain, verificationMethod='META' }, config = defaultConfig, { siteVerificationV1 = siteVerification_v1 } = {}) => {
    try {

        const auth = new google.auth.GoogleAuth({
            // Scopes can be specified either as an array or as a single, space-delimited string.
            scopes: ['https://www.googleapis.com/auth/siteverification'],
        });
            
        // Acquire an auth client, and bind it to all future calls
        const authClient = await auth.getClient();
        google.options({auth: authClient});
    
        // Do the magic
        const { data: { token } } = await siteVerification.webResource.getToken({
                // The id of a verified site or domain.
            id: domain,
        });

        return {
            token
        }
    } catch(error) {
        logger.error(error, 'Error getting verification token')
        return {
            error
        }
    }
}

module.exports = {
    getSiteVerificationToken
}

