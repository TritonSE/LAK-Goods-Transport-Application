import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { JobData, JobOwnerView } from '../api';

export type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    ResetPassword: undefined;
    OTP: undefined;
    ResetSuccess: undefined;
    ForgotPassword: undefined;
    JobApplicant: {jobData: JobOwnerView, setJobData: React.Dispatch<React.SetStateAction<JobData[] | JobOwnerView[]>>};
    AddJob: {formType: "add" | "edit" | "delete" | "repost", jobData?: JobOwnerView, setJobData: React.Dispatch<React.SetStateAction<JobData[] | JobOwnerView[]>>}
    JobLandingScreen: undefined;
};

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;
export type ResetPasswordProps = NativeStackScreenProps<RootStackParamList, 'ResetPassword'>;
export type OTPProps = NativeStackScreenProps<RootStackParamList, 'OTP'>;
export type ResetSuccessProps = NativeStackScreenProps<RootStackParamList, 'ResetSuccess'>;
export type ForgotPasswordProps = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;
export type JobApplicantProps = NativeStackScreenProps<RootStackParamList, 'JobApplicant'>;
export type AddJobProps = NativeStackScreenProps<RootStackParamList, 'AddJob'>;
export type JobLandingScreenProps = NativeStackScreenProps<RootStackParamList, 'JobLandingScreen'>;