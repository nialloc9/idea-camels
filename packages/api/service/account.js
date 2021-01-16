const { onGet, onCreate: onCreateAccount, onUpdate: onUpdateAccount } = require('../data/account')
const { validatePassword, scrubAccount, createJwToken } = require('../utils/security')
const config = require('../utils/config')

const onLogin = ({data: { email, password, rememberMe = false }, caller}) => new Promise(async (resolve, reject) => {
    try {
        const response = await onGet({ data: { email }, caller });
 
        await validatePassword({ password, hashedPassword: response.data.account.password , caller });
     
        // TODO Add remember me
        // TODO Add last loggedin at
        response.data.account = scrubAccount(response.data[0], ["password"]);
        response.data.token = createJwToken({ accountRef: account.account_ref }, rememberMe ? config.security.extended_token_expiration : config.security.default_token_expiration);
      
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

const onReauthorise = ({data: { decodedToken: { accountRef } }, caller}) => new Promise(async (resolve, reject) => {
    try {
        const response = await onGet({ data: { accountRef }, caller });

        response.data.account = scrubAccount(response.data.account, ["password"]);
        response.data.token = createJwToken({ accountRef: account.account_ref });

        resolve(response)
    } catch (error) {
        reject(error)
    }
});

const onCreate = ({data, caller}) => new Promise(async (resolve, reject) => {
    try {
        const response = await onCreateAccount({ data, caller });
        
        // TODO Create stripe account
        // TODO send onboarding email
        response.data.token = createJwToken({ accountRef: account.account_ref });

        resolve(response)
    } catch (error) {
        reject(error)
    }
});

const onUpdate = ({data: { updateData }, caller}) => new Promise(async (resolve, reject) => {
    try {
        const response = await onUpdateAccount({ data: { ...updateData, accountRef: data.decodedToken.accountRef }, caller });
      
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

const onForgottonPassword = ({data: { email }, caller}) => new Promise(async (resolve, reject) => {
    try {

        resolve({email, caller})
    } catch (error) {
        reject(error)
    }
});

const onDelete = ({data: { decodedToken: { accountRef }, lastUpdatedBy }, caller}) => new Promise(async (resolve, reject) => {
    try {
        const updatedData = { accountRef, deletedFlag: 1, lastUpdatedBy: lastUpdatedBy || accountRef }
        const response = await onUpdateAccount({ data: updatedData, caller });
        
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

module.exports = {
    onLogin,
    onReauthorise,
    onCreate,
    onUpdate,
    onForgottonPassword,
    onDelete
}