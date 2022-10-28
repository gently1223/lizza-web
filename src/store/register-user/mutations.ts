import { RegisterUserInterface } from './state';


// eslint-disable-next-line @typescript-eslint/no-empty-function
export const setEmailPassw = (state: RegisterUserInterface, data: {email: string, password: string}) => {
  state.email = data.email;
  state.password = data.password;
}

export const setVerificationCode = (state: RegisterUserInterface, verificationCode: number) => {
  state.verificationCode = verificationCode;
}



