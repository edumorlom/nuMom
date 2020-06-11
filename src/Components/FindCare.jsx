import React, {useState} from 'react';
import {ScrollView, View} from "react-native";
import SelectionButtonImageOnRight from "./ClinicSelectionButton";
import clinicLogo from '../../assets/clinic-logo.png';
import {Dropdown} from "react-native-material-dropdown"

export default function FindCare(props) {
    const [value, setValue] = useState(props.filter);

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

    let filterClinics = (filter) => {
        if (filter !== 'All' && clinics) {
            clinics = clinics.filter((item) => item.services.includes(filter))
        }
        props.setClinics(clinics)
        props.setFilter(filter)
        setValue(filter);
    }

    let servicesArray = ["All", "Education", "Support & Counseling", "Free Materials", "Referrals", "STD Tests", "STD Treatment", "Yearly Exam", "Pregnancy Tests", 
                            "Ultrasound", "Immunization", "Abortions", "Medical Care", "Lab services"];
    
    let services = servicesArray.map ((service) => 
        ({label: service, value: service}))  //Change label to adjust for different languages

    return (
        <>
        <View style={{flexDirection: "row"}}>
            {/* <Dropdown containerStyle= {{width: '30%', right: '50%'}} dropdownOffset= {{top: 0, bottom: 0, left: 0}} fontSize= {12} data={services} 
            label="Distance" value= {value} itemColor={'red'} useNativeDriver={true} onChangeText={(value,index,data)=>setValueNow(value)} /> */}
            <Dropdown containerStyle= {{width: '30%', left: '50%'}} dropdownOffset= {{top: 0, bottom: 0,left: 5, right: 0}} fontSize= {12} data={services} 
            label="Services" value= {value} itemColor={'red'} useNativeDriver={true} onChangeText={(value,index,data)=>filterClinics(value)} />
        </View>
            <ScrollView contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}>
                
                {clinicsButtons}
            </ScrollView>
       </>
    )
}