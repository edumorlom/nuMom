import React, {useState} from 'react';
import {ScrollView, View} from "react-native";
import SelectionButtonImageOnRight from "./ClinicSelectionButton";
import clinicLogo from '../../assets/clinic-logo.png';
import {Dropdown} from "react-native-material-dropdown"

export default function FindCare(props) {
    const [value, setValue] = useState('All');

    let clinicsButtons = props.clinics.map((clinic, key) =>
        <SelectionButtonImageOnRight key={key}
                                     icon={clinicLogo}
                                     onPress={() => {
                                        props.setClinicToView(clinic);
                                        props.setLowerPanelContent('clinicInfo');
                                     }}
                                     clinic={clinic}/>);

    let clinics = props.sortedClinics;

    

    setValueNow = (value) => {
        setValue(value);
        console.log(value);
    }


    filterClinics = (filter) => {
        console.log(filter);
        if (filter !== 'All' && clinics) {
            clinics.filter((item) => {
                item.services.includes(filter)
            })
        }
        props.setClinics(clinics)
        setValue(filter);
    }

    let services = 
    [
        {label: 'All', value: 'All'},
        {label: 'Education', value: 'Education'},
        {label: 'Support & Counceling', value: 'Support & Counceling'},
        {label: 'Free Materials', value: 'Free Materials'}
    ]

    return (
        <>
        <View style={{flexDirection: "row"}}>
            <Dropdown containerStyle= {{width: '30%', right: '50%'}} dropdownOffset= {{top: 0, bottom: 0, left: 0}} fontSize= {12} data={services} 
            label="Distance" value= {value} itemColor={'red'} useNativeDriver={true} onChangeText={(value,index,data)=>this.setValueNow(value)} />
            <Dropdown containerStyle= {{width: '30%', left: '50%'}} dropdownOffset= {{top: 0, bottom: 0,left: 5, right: 0}} fontSize= {12} data={services} 
            label="Services" value= {value} itemColor={'red'} useNativeDriver={true} onChangeText={(value,index,data)=>this.filterClinics(value)} />
        </View>
            <ScrollView contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}>
                
                {clinicsButtons}
            </ScrollView>
       </>
    )
}