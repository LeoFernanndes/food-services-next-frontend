export interface tokenData {
    access_token: string,
    refresh_token: string,
    token_duration_minutes: number,
    refresh_token_duration_minutes: number,
    token_type: string
    access_token_expiration_time: Date
}

export interface user {
    username: string,
    email: string
}