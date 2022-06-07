const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    // check admin status
    if ( context.auth.token.admin !== true ){
        return { error: "Přidat admina může jen admin" }
    }

    // get user add custom claim (admin)
    return admin.auth().getUserByEmail(data.email)
        .then(user => {
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true
            });
        }).then(() => {
            return {
                message: `Success! ${ data.email } has been made an admin`
            }
        }).catch(e => {
            return e
        });
});

exports.removeUserByEmail = functions.https.onCall((data, context) => {
    // check admin status
    if ( context.auth.token.admin !== true ){
        return { error: "Odebrat účet může jen admin" }
    }

    // get user add custom claim (admin)
    return admin.auth().getUserByEmail(data.email)
        .then(user => {
            admin.auth().deleteUser(user.uid)
                .then(() => {
                    console.log("Deleted")
                }).catch(e => {
                console.log(e)
            })
        }).then(() => {
            return {
                message: `Success! ${ data.email } has been deleted`
            }
        }).catch(e => {
            return e
        });
});