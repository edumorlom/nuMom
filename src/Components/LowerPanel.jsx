import {Animated} from 'react-native';
import React, {useState, useEffect} from 'react';
import appStyles, {win} from './AppStyles';
import LowerPanelSelection from './LowerPanelSelection';
import FindCare from './FindCare';
import Shelters from './Shelters';

import ClinicInfo from './ClinicInfo';
import ShelterInfo from './ShelterInfo';
import LowerPanelHeader from './LowerPanelHeader';
import Facilities from './Facilities';
import { useMapToggle } from './SharedFuncs';

export default LowerPanel = (props) => {
  const [filterToShow, setFilterToShow] = useState(false);
  const [fullPanel, setFullPanel] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  //const [mapToggle, setMapToggle] = useState(false);
  const [mapToggle, setMapToggle] = useMapToggle();

  

  const [moveAnim] = useState(new Animated.Value(win.height * 0.3));

  useEffect(() => {
    // When fullPanel changes move Panel
    movePanel(fullPanel);
  }, [fullPanel]);

  useEffect(() => {
    // When fullScreen changes make fullscreen
    fullScreenPanel(fullScreen);
  }, [fullScreen]);

  // This function makes an Anination for moving the lowerPanel up and down
  let movePanel = (moveUp) => {
    const destination = moveUp ? win.height * 0.3 : win.height * 0.5;
    Animated.timing(moveAnim, {
      toValue: destination,
      useNativeDriver: false,
      duration: 150,
    }).start();
  };

  // This function makes an Anination for making the lowerPanel fullScreen
  let fullScreenPanel = (moveUp) => {
    const destination = moveUp ? 0 : win.height * 0.3;
    Animated.timing(moveAnim, {
      toValue: destination,
      useNativeDriver: false,
      duration: 0,
    }).start();
  };

  const onPress = () => {
    isFullScreen ? setFullScreen(!fullScreen) : setFullPanel(!fullPanel);
  };

  /* The following design is quite strange but also brilliant, I came up with it :)
  This is an object that has components as properties
  So to call a specific component you only need to know the name of the property (component)
  and call it like: lowerPanelContent[property]  */
  const lowerPanelContent = {
    facilities: (
      <Facilities 
      setLowerPanelContent={props.setLowerPanelContent} 
      setMapToggle={setMapToggle}
      />
    ),
    findCare: (
      <FindCare
        clinics={props.clinics || []}
        sortedClinics={props.sortedClinics}
        setClinicToView={props.setClinicToView}
        setClinics={props.setClinics}
        setFilters={props.setFilters}
        filters={props.filters}
        filterToShow={filterToShow}
        setLowerPanelContent={props.setLowerPanelContent}
      />
    ),
    shelters: (
      <Shelters
        shelters={props.shelters || []}
        sortedShelters={props.sortedShelters}
        setFilters={props.setFilters}
        setShelters={props.setShelters}
        filters={props.filters}
        setShelterToView={props.setShelterToView}
        filterToShow={filterToShow}
        setLowerPanelContent={props.setLowerPanelContent}
      />
    ),
    clinicInfo: (
      <ClinicInfo
        clinic={props.clinicToView}
        setLowerPanelContent={props.setLowerPanelContent}
      />
    ),
    shelterInfo: (
      <ShelterInfo
        shelter={props.shelterToView}
        setLowerPanelContent={props.setLowerPanelContent}
      />
    ),
    selection: (
      <LowerPanelSelection
        fullName={props.fullName}
        logout={props.logout}
        setFullPanel={setFullPanel}
        fullPanel={fullPanel}
        setLowerPanelContent={props.setLowerPanelContent}
        setScreen={props.setScreen}
      />
    ),
  };

  return (
    <Animated.View
      style={{
        ...appStyles.lowerPanel,
        ...(mapToggle && moveAnim ? { top: moveAnim } : {}),
        overflow: 'hidden',
        height: isFullScreen ? '100%' : '65%',
        paddingTop: 20, // Added padding so back button would not get cut off when viewing facilites page
      }}
    >
      {props.lowerPanelContent !== 'selection' && (
        <LowerPanelHeader
          onPress={onPress}
          setFilterToShow={() => setFilterToShow(!filterToShow)}
          goBack={props.goBack}
          lowerPanelContent={props.lowerPanelContent}
          setFullPanel={setFullPanel}
          fullPanel={fullPanel}
          setFullScreen={setFullScreen}
          fullScreen={fullScreen}
          setIsFullScreen={setIsFullScreen}
        />
      )}
      {/* Here we call the component from the object as expressed above */}
      {lowerPanelContent[props.lowerPanelContent]}
    </Animated.View>
  );
};
