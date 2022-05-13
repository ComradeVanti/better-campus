/**
 * @type {ExtractData}
 */
export const extract = (doc) => {
    //Extract login-token
    const loginForm = doc.getElementById("login")
    const loginToken = new FormData(loginForm).get("logintoken")
    return {loginToken}
}

/**
 *@type {InjectData}
 */
export const inject = (doc, data) => {
    // Inject login-token
    doc.querySelector("#login-token").value = data.loginToken
}

