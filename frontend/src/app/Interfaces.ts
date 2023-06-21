export interface LoginData {
    'email': string,
    'password': string
}

export interface LoginResData {
    'name': string,
    'password': string
}

export interface currentUser {
    'isLogged': boolean,
    'name': string
}