import { AuthenticatedUserType, AuthRefreshTokenType } from "./types"


export default class LocalStorageOperations {

    constructor(){}

    clear() {
        window.localStorage.clear()
    }

    getAuthRefreshToken(): AuthRefreshTokenType {
        return JSON.parse(window.localStorage.getItem('authRefreshToken')!)
    }
    
    setAuthRefreshToken(authRefreshToken: AuthRefreshTokenType): void {
        window.localStorage.setItem('authRefreshToken', JSON.stringify(authRefreshToken))
    }

    getAuthenticatedUser(): AuthenticatedUserType {
        return JSON.parse(window.localStorage.getItem('authenticatedUser')!)
    }

    setAuthenitcatedUser(authenticatedUser: AuthenticatedUserType): void {
        window.localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser))
    }

    getIsAuthenticated(): boolean {
        return JSON.parse(window.localStorage.getItem('isAuthenticated')!)
    }

    setIsAuthenticated(isAuthentcated: boolean) {
        window.localStorage.setItem('isAuthenticated', JSON.stringify(isAuthentcated))
    }
}