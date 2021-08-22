import { AxiosError } from "axios";
import Http from "./http.service";

export interface IAuthServiceDelegate {
    onLogin?(): Promise<void>
    onLogout?(): Promise<void>
}

export interface IAuthToken {
    access_token: string
    refresh_token: string
}

export class AuthService {
    private get AccessTokenField() {
        return 'access_token'
    }
    private get RefreshTokenField() {
        return 'refresh_token'
    }

    delegate?: IAuthServiceDelegate

    get isAuth() {
        console.log(localStorage)
        return !!localStorage.getItem(this.AccessTokenField)
    }

    get AccessToken() {
        return localStorage.getItem(this.AccessTokenField)
    }

    isAxiosAuthError(err?: AxiosError) {
        if (err?.response?.status != 401) return false
        return err?.config?.url?.includes('/auth')
    }

    async refreshAccessToken() {
        try {
            const refreshToken = localStorage.getItem(this.RefreshTokenField);
            if (!refreshToken) throw new Error('Cannot refresh access token! No refresh token')
            const token: IAuthToken = await Http.put('/auth/token', {
                refresh_token: refreshToken
            });
    
            localStorage.setItem(this.AccessTokenField, token.access_token)
            localStorage.setItem(this.RefreshTokenField, token.refresh_token)
        }
        catch (err) {
            await this.logout()
        }
    }

    async logout() {
        localStorage.removeItem(this.AccessTokenField)
        localStorage.removeItem(this.RefreshTokenField)
        await this.delegate?.onLogout?.()
    }

    async login(username: string, password: string) {
        if (this.isAuth) throw Error('Cannot login! User must logout first')
        localStorage.removeItem(this.AccessTokenField)
        localStorage.removeItem(this.RefreshTokenField)

        const token: IAuthToken = await Http.post('/auth/login', {
            name: username,
            password
        })

        localStorage.setItem(this.AccessTokenField, token.access_token)
        localStorage.setItem(this.RefreshTokenField, token.refresh_token)
    }

    // private toLogin() {
    //     this.router.navigate(['/login']);
    // }
}

export const Auth = new AuthService()
export default Auth