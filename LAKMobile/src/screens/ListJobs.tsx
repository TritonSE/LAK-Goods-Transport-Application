import React, { useState, useEffect, useMemo, useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import debounce from 'lodash.debounce';
import {
  getDriverVerificationStatus,
  getJobApplicantStatus,
  getJobs,
  getUser,
  JobData,
  JobOwnerView,
  PAGE_SIZE,
} from '../api';
import { JobThumbnail, AppButton, AppTextInput, NoJobs } from '../components';
import { COLORS } from '../../constants';
import { PickerStyles, FlatListStyles } from '../styles';
import { AuthContext } from '../context/AuthContext';
import { NoJobsIcon, NoMatchingJobsIcon, PlusSignIcon } from '../icons';
import { InfoBox } from '../components/InfoBox';
import { useIsFocused } from '@react-navigation/native';

type ListJobsModes = 'Add' | 'Find';
type JobTypePickerOption = 'Current Jobs' | 'Completed Jobs' | 'Your Jobs' | 'Finished Jobs';

const ADD_PICKER_OPTIONS: JobTypePickerOption[] = ['Current Jobs', 'Completed Jobs'];

const FIND_PICKER_OPTIONS: JobTypePickerOption[] = ['Your Jobs', 'Finished Jobs'];

const LIST_MODES: ListJobsModes[] = ['Add', 'Find'];

interface ListJobsProps {
  navigation: any;
  mode: ListJobsModes;
}

export function ListJobs({ navigation, mode }: ListJobsProps) {
  const [jobListType, setJobListType] = useState<JobTypePickerOption>(
    mode === 'Add' ? 'Current Jobs' : 'Your Jobs'
  );
  const [searchString, setSearchString] = useState<string | null>(null);
  const [jobs, setJobs] = useState<JobData[] | JobOwnerView[]>([]);

  const isFocused = useIsFocused();

  // NOTE: Page 0 is being used as a null page, but the first page is 1.
  // Added this so that we are able to trigger hooks dependent on `page` when type of screen changes but page number does not
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  const [driverRegistrationWarning, setDriverRegistrationWarning] = useState<JSX.Element | null>(
    null
  );

  const [noJobsComponent, setNoJobsComponent] = useState<JSX.Element | null>(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    console.log('FOCUSING...');
  }, [isFocused]);

  useEffect(() => {
    if (auth.user === null) {
      navigation.navigate('Login');
    }
  }, [auth, navigation]);

  const userId = auth.user ? auth.user.uid : '';

  // Note: This should refresh every time we have a onFocus...
  useEffect(() => {
    if (isFocused) {
      getUser(userId, userId).then((user) => {
        if (user) {
          const driverVerificationStatus = getDriverVerificationStatus(user);
          if (driverVerificationStatus === 'Not Applied') {
            setDriverRegistrationWarning(
              <InfoBox
                text={'Register as a driver to apply to jobs.'}
                buttonText={'Register'}
                onPress={() => navigation.navigate('DriverRegistration')}
              />
            );
          } else if (
            driverVerificationStatus === 'Applied' ||
            driverVerificationStatus === 'In Review'
          ) {
            setDriverRegistrationWarning(
              <InfoBox
                text={
                  'Your driver registration is under review.\nYou can apply to jobs once approved.'
                }
              />
            );
          }
        }
      });
    }
  }, [navigation, userId, isFocused]);

  const resetJobsOnPage = () => {
    setJobs([]);
    setAllLoaded(false);
    setPage(0);
  };
  const debouncedResetJobs = useMemo(() => debounce(resetJobsOnPage, 300), []);

  useEffect(() => {
    // Resets the states for the screen
    resetJobsOnPage();
  }, [mode, jobListType]);

  useEffect(() => {
    debouncedResetJobs();
  }, [searchString]);

  const handleNoJobsIcon = (
    jobs: JobData[],
    mode: ListJobsModes,
    jobListType: JobTypePickerOption,
    searchString: string | null
  ): void => {
    if (jobs.length === 0) {
      if (mode === 'Find' && searchString) {
        setNoJobsComponent(
          <NoJobs
            title={'No matching jobs.'}
            body={'Please try another keyword.'}
            errorImageType={<NoMatchingJobsIcon />}
          />
        );
        return;
      }
      switch (jobListType) {
        case 'Your Jobs': {
          setNoJobsComponent(
            <NoJobs
              title={'No available jobs.'}
              body={'There are no job posts at the moment. Please check back later.'}
              errorImageType={<NoJobsIcon />}
            />
          );
          return;
        }
        case 'Finished Jobs': {
          setNoJobsComponent(
            <NoJobs
              title={'No finished jobs.'}
              body={"You don't have any finished jobs yet."}
              errorImageType={<NoJobsIcon />}
            />
          );
          return;
        }
        case 'Current Jobs': {
          setNoJobsComponent(
            <NoJobs
              title={'No current jobs.'}
              body={"You don't have any in progress jobs at the moment."}
              buttonName="Add a Job Now"
              buttonIcon={<PlusSignIcon />}
              onButtonClick={() =>
                navigation.navigate('AddJob', { formType: 'add', setJobData: setJobs })
              }
              errorImageType={<NoMatchingJobsIcon />}
            />
          );
          return;
        }
        case 'Completed Jobs': {
          setNoJobsComponent(
            <NoJobs
              title={'No completed jobs.'}
              body={"You don't have any completed jobs at the moment."}
              errorImageType={<NoJobsIcon />}
            />
          );
          return;
        }
        default: {
          setNoJobsComponent(null);
          return;
        }
      }
    } else {
      setNoJobsComponent(null);
    }
  };

  useEffect(() => {
    // Fetches the job data for last reached page `page`. Enables lazy load on scrolling.
    if (page === 0) {
      setPage(1);
      return;
    }

    if (allLoaded || loading) {
      return;
    }
    // Check if page already loaded
    if (jobs.length >= page * PAGE_SIZE) return;
    setLoading(true);
    const owned = mode === 'Add';
    const assigned = jobListType === 'Finished Jobs';
    const finished = jobListType === 'Completed Jobs' || jobListType === 'Finished Jobs';
    getJobs(userId, searchString, owned, assigned, finished, page).then((response) => {
      if (response === null) {
        // TODO Handle Error
        return;
      }

      const { jobs: newJobs = [], lastPage } = response;
      setAllLoaded(lastPage);
      const filteredNewJobs = newJobs.filter(
        (newjob) => !jobs.some((job) => job._id === newjob._id)
      );
      const jobsToDisplay = [...jobs, ...filteredNewJobs];
      setJobs(jobsToDisplay);
      handleNoJobsIcon(jobsToDisplay, mode, jobListType, searchString);
      setLoading(false);
      setRefreshing(false);
    });
  }, [page]);

  const onRefresh = () => {
    setJobs([]);
    setAllLoaded(false);
    setPage(0);
    setRefreshing(true);
  };

  const pickerOptions = mode === 'Add' ? ADD_PICKER_OPTIONS : FIND_PICKER_OPTIONS;

  return (
    <>
      <View style={{ alignItems: 'center' }}>
        <View style={FlatListStyles.wrapper}>
          <FlatList
            onRefresh={() => onRefresh()}
            refreshing={isRefreshing}
            style={FlatListStyles.container}
            contentContainerStyle={FlatListStyles.contentContainer}
            data={jobs}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) =>
              mode === 'Add' ? (
                <JobThumbnail
                  key={index}
                  onPress={() =>
                    navigation.navigate('JobApplicant', {
                      jobData: item as JobOwnerView,
                      setJobData: setJobs,
                    })
                  }
                  onEdit={() =>
                    navigation.navigate('AddJob', {
                      formType: 'edit',
                      jobData: item as JobOwnerView,
                      setJobData: setJobs,
                    })
                  }
                  onRepost={() =>
                    navigation.navigate('AddJob', {
                      formType: 'repost',
                      jobData: item as JobOwnerView,
                      setJobData: setJobs,
                    })
                  }
                  isJobOwner={true}
                  job={item as JobOwnerView}
                  repostAllowed={jobListType === 'Completed Jobs'}
                />
              ) : (
                <JobThumbnail
                  key={index}
                  onPress={() => {
                    navigation.navigate('DriverApplyScreen', { jobData: item as JobOwnerView });
                  }}
                  isJobOwner={false}
                  job={item as JobOwnerView}
                  applicantStatus={getJobApplicantStatus(item as JobOwnerView, userId)}
                />
              )
            }
            scrollEnabled={true}
            ListHeaderComponent={
              <View style={styles.header}>
                <View style={styles.header_row}>
                  <View style={[PickerStyles.wrapper]}>
                    <Picker
                      selectedValue={jobListType}
                      onValueChange={(value) => setJobListType(value)}
                      mode="dropdown" // Android only
                    >
                      {pickerOptions.map((option, index) => (
                        <Picker.Item key={index} label={option} value={option} />
                      ))}
                    </Picker>
                  </View>

                  <View style={styles.spacer} />
                  {mode === 'Add' && (
                    <AppButton
                      textStyle={styles.addJobBtnText}
                      type="primary"
                      size="small"
                      onPress={() =>
                        navigation.navigate('AddJob', { formType: 'add', setJobData: setJobs })
                      }
                      title="Add Job"
                      style={styles.addJobBtn}
                    />
                  )}
                </View>

                {mode === 'Add' && <View>{noJobsComponent}</View>}

                {mode === 'Find' && (
                  <View>
                    <AppTextInput
                      value={searchString ?? undefined}
                      onChangeText={(text) => setSearchString(text)}
                      style={[styles.searchTextInput]}
                      placeholder="Search by title, location, and delivery date"
                      maxLength={100}
                      keyboardType="default"
                      icon="search"
                    />

                    {driverRegistrationWarning}
                    {noJobsComponent}
                  </View>
                )}
              </View>
            }
            onEndReached={() => {
              if (!allLoaded) {
                setPage(page + 1);
              }
            }}
            onEndReachedThreshold={0}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  spacer: {
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  header_row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    height: 55, // Hardcoded based on the height of the react-native picker
  },
  addJobBtn: {
    borderRadius: 4,
    height: '100%',
  },
  addJobBtnText: {
    fontSize: 16,
  },
  searchTextInput: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: COLORS.mediumGrey,
    height: 40,
  },
});
