export interface LoginData {
    'email': string,
    'password': string
}

export interface ProfileData {
    'name': string,
    'email': string
}

export interface currentUser {
    'isLogged': boolean,
    'name': string
}

export interface UpdateUser {
    'name'?: string,
    'email'?: string,
    'password'?: string
}

export interface NewUserData {
    'name': string,
    'email': string,
    'password': string
}