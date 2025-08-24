export interface IUser {
    id?: number
    fullName: string
    email: string
    password?: string
    picture?: string
}

export interface IPayload {
    payload: string
}