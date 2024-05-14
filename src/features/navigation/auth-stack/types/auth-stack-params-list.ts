export type AuthStackParamsList = {
  'sign-in': undefined;
  'sign-up': undefined;
  activate: { uid: string | undefined; token: string | undefined } | undefined;
};
