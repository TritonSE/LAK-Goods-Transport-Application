import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    ResetPassword: undefined;
    OTP: undefined;
    ResetSuccess: undefined;
    ForgotPassword: undefined;
};

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;
export type ResetPasswordProps = NativeStackScreenProps<RootStackParamList, 'ResetPassword'>;
export type OTPProps = NativeStackScreenProps<RootStackParamList, 'OTP'>;
export type ResetSuccessProps = NativeStackScreenProps<RootStackParamList, 'ResetSuccess'>;
export type ForgotPasswordProps = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;