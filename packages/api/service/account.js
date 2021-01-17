const { onGet, onCreate: onCreateAccount, onUpdate: onUpdateAccount } = require('../data/account')
const { onCreate: onCreateToken } = require('../data/token')
const { validatePassword, scrubAccount, createJwToken } = require('../utils/security')
const { handleSuccess } = require('../utils/utils')
const { now } = require('../utils/date')
const errors = require('../utils/errors')
const config = require('../utils/config')
const {sendEmail} = require('../utils/mailer/mailer')
const {resetPassword} = require('../utils/mailer/templates/resetPassword')

const onLogin = ({data: { email, password, rememberMe = false }, caller}) => new Promise(async (resolve, reject) => {
    try {
        const response = await onGet({ data: { email }, caller });
      
        const account = response.data[0];
 
        if(!account) {
            return reject(errors["1003"]({ service: "FETCH_ACCOUNT", caller, reason: "Account not found", data: { email } }))
        }
       
        await validatePassword({ password, hashedPassword: account.password , caller });
        
        const timestamp = now();

        await onUpdateAccount({ data: { accountRef: account.account_ref, lastUpdatedBy: account.account_ref, data: { lastLoggedin: timestamp } }, caller })
        
        const responseData = {
            account: scrubAccount({...account, last_logged_in: timestamp}, ["password"]),
            token:  createJwToken({ accountRef: account.account_ref }, rememberMe ? config.security.extended_token_expiration : config.security.default_token_expiration)
        }

        resolve(handleSuccess("account found", responseData))
    } catch (error) {
        reject(error)
    }
});

const onReauthorise = ({data: { decodedToken: { data: { accountRef } } }, caller}) => new Promise(async (resolve, reject) => {
    try {
        
        const { data } = await onGet({ data: { accountRef }, caller });
        
        const account = data[0];
        
        const responseData = {
            account: scrubAccount(account, ["password"]),
            token: createJwToken({ accountRef: account.account_ref })
        }

        resolve(handleSuccess("account reauthorised", responseData))
    } catch (error) {
        reject(error)
    }
});

const onCreate = ({data, caller}) => new Promise(async (resolve, reject) => {
    try {

        const { data: existing } = await onGet({ data: { email: data.email }, caller });
        
        if(existing[0]) {
            return reject(errors["1000"]({ service: "CREATE_ACCOUNT", caller, reason: "Email already in use", data: { email: data.email } }))
        }

        const { data: account } = await onCreateAccount({ data, caller });
        
        // TODO Create stripe account
        // TODO send onboarding email
        
        const responeData = {
            account: scrubAccount(account, ["password"]),
            token: createJwToken({ accountRef: account.account_ref })
        }
      
        resolve(handleSuccess("account created", responeData));

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
        const { data: userData } = await onGet({
            data: { email },
            caller
        });

        if(!userData[0]) {
            return resolve(
                handleSuccess(
                    `email not sent to ${email}`,
                    {
                        email
                    }
                )
            );
        }
        
        const { user_ref: userRef } = userData[0];

        const token = createJwToken({ userRef });

        await onCreateToken({
            data: {
                token,
            type: RESET_PASSWORD_EMAIL,
            email,
            },
            caller
        });

        await sendEmail({
            to: email,
            from: config.supportEmail,
            subject: `${name} Reset Password`,
            html: resetPassword(token)
        });

        resolve(
            handleSuccess(
                `email sent to ${email}`,
                {
                    email
                }
            )
        );
    } catch (error) {
        reject(error)
    }
});


const onDelete = ({data: { decodedToken: { data: { accountRef } }, lastUpdatedBy }, caller}) => new Promise(async (resolve, reject) => {
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