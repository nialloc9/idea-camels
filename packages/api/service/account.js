const { onGet, onCreate: onCreateAccount, onUpdate: onUpdateAccount } = require('../data/account')
const { handleSuccess } = require('../utils/utils')
const { validatePassword, scrubAccount } = require('../utils/security')

const onLogin = ({data: { email, password }, caller}) => new Promise(async (resolve, reject) => {
    try {
        const { data: account } = await onGet({ data: { email }, caller });
        
        await validatePassword({ password, hashedPassword: account.password , caller });

        // TODO Add remember me
        // TODO Add last loggedin at
        resolve(handleSuccess('account found', { account: scrubAccount(account) }))
    } catch (error) {
        resolve(reject)
    }
});

const onCreate = ({data, caller}) => new Promise(async (resolve, reject) => {
    try {
        const { data: account } = await onCreateAccount({ data, caller });
        
        // TODO Create stripe account
        // TODO send onboarding email
        resolve(handleSuccess('account created', { account }))
    } catch (error) {
        resolve(reject)
    }
});

const onUpdate = ({data: { updateData }, caller}) => new Promise(async (resolve, reject) => {
    try {
        const response = await onUpdateAccount({ data: { ...updateData, accountRef: data.decodedToken.accountRef }, caller });
      
        resolve(response)
    } catch (error) {
        resolve(reject)
    }
});

const onDelete = ({data: { decodedToken: { accountRef }, lastUpdatedBy }, caller}) => new Promise(async (resolve, reject) => {
    try {
        const updatedData = { accountRef, deletedFlag: 1, lastUpdatedBy: lastUpdatedBy || accountRef }
        const response = await onUpdateAccount({ data: updatedData, caller });
        
        resolve(response)
    } catch (error) {
        resolve(reject)
    }
});

module.exports = {
    onLogin,
    onCreate,
    onUpdate,
    onDelete
}