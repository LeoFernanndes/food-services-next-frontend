import {tokenData} from "./types";
import LocalStorageOperations from "../../localStorage/storageOpetarations";
import { AuthRefreshTokenType } from "../../localStorage/types";


export default class TokenPairAuthentication {

    localStorageOperations: LocalStorageOperations

    constructor() {
        this.localStorageOperations = new LocalStorageOperations()
    }

    async authenticateTokenPair(usernameInput: string, passwordInput: string) {
        const authResponse =  await fetch('http://localhost:8000/auth/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=password&username=${usernameInput}&password=${passwordInput}&scope=&client_id=string&client_secret=string`
        })
        if (authResponse.status == 200) {
            const tokens = await authResponse.json()
            const access_token_expiration_time = new Date(Date.now())
            access_token_expiration_time.setTime(access_token_expiration_time.getTime() + tokens.token_duration_minutes * 60 * 1000);

            const tokenData: AuthRefreshTokenType = {
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                token_duration_minutes: tokens.token_duration_minutes,
                refresh_token_duration_minutes: tokens.refresh_token_duration_minutes,
                token_type: tokens.token_type,
                access_token_expiration_time: access_token_expiration_time
            }
            this.localStorageOperations.setIsAuthenticated(true)
            this.saveTokenDataToLocalStorage(tokenData)
            return true
        } else {
            return false
        }
    }

    saveTokenDataToLocalStorage(tokenData: AuthRefreshTokenType){
        this.localStorageOperations.setAuthRefreshToken(tokenData);

    }

    retrieveTokenDataFromLocalStorage(): AuthRefreshTokenType {
        return this.localStorageOperations.getAuthRefreshToken();
    }

    async refreshTokenPair(){
        const tokenData = this.retrieveTokenDataFromLocalStorage()
        const refreshResponse =  await fetch('http://localhost:8000/auth/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'refresh': tokenData.refresh_token
            },
            body: JSON.stringify({})
        })
        if (refreshResponse.status == 200) {
            const tokens = await refreshResponse.json()
            const access_token_expiration_time = new Date(Date.now())
            access_token_expiration_time.setTime(access_token_expiration_time.getTime() + tokens.token_duration_minutes * 60 * 1000);

            const tokenData: AuthRefreshTokenType = {
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                token_duration_minutes: tokens.token_duration_minutes,
                refresh_token_duration_minutes: tokens.refresh_token_duration_minutes,
                token_type: tokens.token_type,
                access_token_expiration_time: access_token_expiration_time
            }
            this.saveTokenDataToLocalStorage(tokenData)
            return true
        } else {
            return false
        }
    }

    async isAuthneticated() {
        const tokenData = this.retrieveTokenDataFromLocalStorage()
        if (!tokenData){
            return false
        }
        const now = new Date(Date.now())
        if (tokenData.access_token_expiration_time < now) {
            const refreshedToken = await this.refreshTokenPair()
            if (!refreshedToken) {
                return false
            }
        }
        return true
    }
}


