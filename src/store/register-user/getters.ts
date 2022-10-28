import { RegisterUserInterface } from './state';

const getters = {
  emailPassword(state: RegisterUserInterface) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
      email: state.email,
      password: state.password
    }
  },
  verificationCode(state: RegisterUserInterface) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return state.verificationCode;
  },

}

export default getters;
