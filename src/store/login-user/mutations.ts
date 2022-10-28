import { LoginUserInterface } from './state';


// eslint-disable-next-line @typescript-eslint/no-empty-function
export const setEmailPassw = (state: LoginUserInterface, data: {email: string, password: string}) => {
  state.email = data.email;
  state.password = data.password;
}

export const setIsLogged = (state: LoginUserInterface, isLogged: boolean) => {
  state.isLogged = isLogged;
}



