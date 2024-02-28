export * from './account';
export * from './terminal';

export type IRegisterFormValues = {
  login: string;
  password: string;
  confirmPassword: string;
  email: string;
};
