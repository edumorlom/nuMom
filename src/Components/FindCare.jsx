import React, {useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet} from "react-native";
import SelectionButtonImageOnRight from "./ClinicSelectionButton";
import clinicLogo from '../../assets/clinic-logo.png';
import {Dropdown} from "react-native-material-dropdown"
import appStyles, {borderRadius, greyColor, shadow} from "./AppStyles";

export default function FindCare(props) {
    const [dist, setDist] = useState(props.filters[0]);
    const [service, setService] = useState(props.filters[1]);

    useEffect(() => {
        //This runs on every re-render
        setDist(props.filters[0]);
        setService(props.filters[1])
    } )

    //props.filterToShow

    let window = appStyles.win;

    let clinicsButtons = props.clinics.map((clinic, key) =>
        <SelectionButtonImageOnRight key={key}
                                     icon={clinicLogo}
                                     onPress={() => {
                                        props.setClinicToView(clinic);
                                        props.setLowerPanelContent('clinicInfo');
                                     }}
                                     clinic={clinic}/>);

    let clinics = props.sortedClinics;

    
    //To apply both filters you have to start at sortedClinics, then filter by distance, then filter by services
    //So filterClinics(distFilter, servFilter) when you call it like filterClinics(value, filterS) or filterClinics(filterD, value)                                

    let filterClinics = (distance, service) => {
        if (distance !== 10000 && clinics) {
            clinics = clinics.filter(function (clinic) {
                return clinic.distance <= distance;
            });
        }
        
        if (service !== 'All' && clinics) {
            clinics = clinics.filter((clinic) => clinic.services.includes(service))
        }
        props.setClinics(clinics);
        props.setFilters([distance, service]);
        setDist(distance);
        setService(service);
    }

    let servicesArray = ["All", "Education", "Support & Counseling", "Free Materials", "Referrals", "STD Tests", "STD Treatment", "Yearly Exam", "Pregnancy Tests", "Ultrasound", "Immunization", "Abortions", "Medical Care", "Lab services"];
    
    let services = servicesArray.map ((service) => 
        ({label: service, value: service}))  //Change label to adjust for different languages

    let distances = [ {label: 'All',value: 10000}, {label: '5 Miles',value: 5.5}, {label: '15 Miles',value: 15.5}, {label: '20 Miles',value: 20.5} ]



    return (
        //The <> tag is shorthand for React.Fragment <= look it up
        <>
            {props.filterToShow ? <View style={{flexDirection: "row", height: window.height * 0.03}}>
                { <Dropdown containerStyle= {{...styles.Dropdown, right: '30%'}} dropdownOffset= {{top: 0, bottom: 0, left: 0}} fontSize= {12} data={distances} label="Distance" value= {dist}  useNativeDriver={true} onChangeText={(value,index,data)=>filterClinics(value, service)} /> }
                <Dropdown containerStyle= {{...styles.Dropdown, left: '30%'}}  dropdownOffset= {{top: 0, bottom: 0,left: 0}} fontSize= {12} data={services} label="Services" value= {service} useNativeDriver={true} onChangeText={(value,index,data)=>filterClinics(dist, value)} />
            </View> : null}
                <ScrollView contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}>
                    
                    {clinicsButtons}
                </ScrollView>
       </>
    )
}

const styles = StyleSheet.create({
    Dropdown: {
        backgroundColor: 'white',
        ...shadow,
        borderColor: greyColor,
        borderRadius: 5,
        width: '42%',
        bottom: 5
    },
  });