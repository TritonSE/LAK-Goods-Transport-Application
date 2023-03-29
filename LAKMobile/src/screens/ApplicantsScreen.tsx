import React, { useContext, useEffect, useState } from 'react';
import { JobData, JobOwnerView } from '../api/data';

import { View, ScrollView } from 'react-native';
import { ApplicantThumbnail } from '../components';

import { UserData } from '../api/data';
import { assignDriver, denyDriver, getUsersByIds } from '../api';
import { AuthContext } from '../context/AuthContext';

interface ApplicantScreenProps {
  jobData: JobOwnerView;
  setJobData: React.Dispatch<React.SetStateAction<JobData[] | JobOwnerView[]>>;
  carousel: JSX.Element;
  navigation: any;
}

// Define the interface here
interface ApplicantData {
  userData: UserData;
  driverID: string;
}

export function ApplicantsScreen({
  jobData,
  setJobData,
  carousel,
  navigation,
}: ApplicantScreenProps) {
  const userIds: Array<string> = jobData.applicants.map((applicant) => applicant.userId);
  const [applicants, setApplicants] = useState<Array<ApplicantData>>([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.user === null) {
      navigation.navigate('Login');
    }
  }, [auth, navigation]);

  const currentUserId = auth.user ? auth.user.uid : '';

  useEffect(() => {
    if (userIds.length) {
      getUsersByIds(userIds).then(async (response) => {
        if (response == null) {
          return null;
        }
        const applicantUsers: Array<UserData> = response;
        setApplicants(
          applicantUsers.map((applicant, i) => ({
            userData: applicant,
            driverID: userIds[i],
          }))
        );
      });
    }
  }, [jobData]);

  const updateWithAssigned = (driverId: string): JobOwnerView => {
    return {
      ...jobData,
      status: 'ASSIGNED',
      assignedDriverId: driverId,
      startDate: new Date().toString(),
    } as JobOwnerView;
  };

  const updateWithDenial = (driverId: string): JobOwnerView => {
    const newApplicants = jobData.applicants.filter((applicant) => applicant.userId !== driverId);
    return {
      ...jobData,
      applicants: newApplicants,
    };
  };

  const onAccept = (driverId?: string) => {
    if (!driverId) return;
    assignDriver(currentUserId, jobData._id, driverId).then((response) => {
      if (response === null) {
        return;
      }
      const resDriverId = response.driverId;
      const updatedJob: JobOwnerView = updateWithAssigned(resDriverId);
      setJobData((prevJobs) =>
        prevJobs.map((job) => (job._id === updatedJob._id ? updatedJob : job))
      );
      navigation.navigate('ListJobs');
    });
  };

  const onDeny = (driverId?: string) => {
    if (!driverId) return;
    denyDriver(jobData._id, driverId).then((response) => {
      if (response === null) {
        return;
      }
      const resDriverId = response.driverId;
      const updatedJob: JobOwnerView = updateWithDenial(resDriverId);
      setJobData((prevJobs) =>
        prevJobs.map((job) => (job._id === updatedJob._id ? updatedJob : job))
      );
      navigation.navigate('ListJobs');
    });
  };

  return (
    <View>
      {carousel}

      <ScrollView>
        {applicants.map((applicant, index) => (
          <ApplicantThumbnail
            key={index}
            onAccept={() => onAccept(applicant.driverID)}
            onDeny={() => onDeny(applicant.driverID)}
            applicantData={applicant.userData}
            status="Unassigned"
          />
        ))}
      </ScrollView>
    </View>
  );
}

//const styles = StyleSheet.create({});
