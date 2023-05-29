import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { JobData, JobOwnerView } from '../api';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ResetPassword: {
    statusResetPassword: 'logged_out' | 'logged_in';
  };
  ConfirmPhoneScreen: undefined;
  PhoneVerificationScreen: {
    phoneNumber: string;
    mode: 'signup' | 'reset';
    userData?: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      location: string;
      pin: string;
    };
  };
  ResetSuccess: {
    statusResetSuccess: 'logged_out' | 'logged_in'
  };
  JobApplicant: {
    jobData: JobOwnerView;
    setJobData: React.Dispatch<React.SetStateAction<JobData[] | JobOwnerView[]>>;
  };
  AddJob: {
    formType: 'add' | 'edit' | 'delete' | 'repost';
    jobData?: JobOwnerView;
    setJobData: React.Dispatch<React.SetStateAction<JobData[] | JobOwnerView[]>>;
  };
  JobLandingScreen: undefined;
  ProfileScreen: { userId: string };
  ApplicantsScreen: {
    jobData: JobOwnerView;
    setJobData: React.Dispatch<React.SetStateAction<JobData[] | JobOwnerView[]>>;
    carousel: JSX.Element;
  };

  DriverRegistration: undefined;
  EditProfileScreen: { userId: string };
  DriverApplyScreen: { jobData: JobOwnerView };
};

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;
export type ResetPasswordProps = NativeStackScreenProps<RootStackParamList, 'ResetPassword'>;
export type ConfirmPhoneScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ConfirmPhoneScreen'
>;
export type PhoneVerificationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PhoneVerificationScreen'
>;
export type ResetSuccessProps = NativeStackScreenProps<RootStackParamList, 'ResetSuccess'>;
export type JobApplicantProps = NativeStackScreenProps<RootStackParamList, 'JobApplicant'>;
export type AddJobProps = NativeStackScreenProps<RootStackParamList, 'AddJob'>;
export type JobLandingScreenProps = NativeStackScreenProps<RootStackParamList, 'JobLandingScreen'>;
export type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;
export type ApplicantsScreenProps = NativeStackScreenProps<RootStackParamList, 'ApplicantsScreen'>;
export type DriverRegistrationProps = NativeStackScreenProps<
  RootStackParamList,
  'DriverRegistration'
>;
export type EditProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EditProfileScreen'
>;
export type DriverApplyScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DriverApplyScreen'
>;
