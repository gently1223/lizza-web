export interface RegisterUserInterface {
  email: string;
  password: string;
  verificationCode: number;
}

function state(): RegisterUserInterface {
  return {
    email: '',
    password: '',
    verificationCode: 0
  }
};

export default state;

