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