import React, {useState} from 'react';
import {ScrollView, View} from "react-native";
import SelectionButtonImageOnRight from "./ClinicSelectionButton";
import clinicLogo from '../../assets/clinic-logo.png';
import {Dropdown} from "react-native-material-dropdown"

export default function FindCare(props) {
    const [value, setValue] = useState(0);

    let clinicsButtons = props.clinics.map((clinic, key) =>
        <SelectionButtonImageOnRight key={key}
                                     icon={clinicLogo}
                                     onPress={() => {
                                        props.setClinicToView(clinic);
                                        props.setLowerPanelContent('clinicInfo');
                                     }}
                                     clinic={clinic}/>);

    setValueNow = (value) => {
        setValue(value);
        console.log(value);
    }

    let services = [{
        label: 'All',
        value: 0
    },
    {
        label: 'Free Pragnancy Tests',
        value: 1
    },
    {
        label: 'Free Health Consultation',
        value: 2
    },
    {
        label: 'Pediatrics',
        value: 3
    },

    ]

                                    

    return (
        <>
        <View style={{flexDirection: "row"}}>
            <Dropdown containerStyle= {{width: '30%', right: '50%'}} dropdownOffset= {{top: 0, bottom: 0}} fontSize= {14} data={services} 
            label="Distance" value= {value} itemColor={'red'} useNativeDriver={true} onChangeText={(value,index,data)=>this.setValueNow(value)} />
            <Dropdown containerStyle= {{width: '30%', left: '50%'}} dropdownOffset= {{top: 0, bottom: 0,left: 5, right: 0}} fontSize= {14} data={services} 
            label="Services" value= {value} itemColor={'red'} useNativeDriver={true} onChangeText={(value,index,data)=>this.setValueNow(value)} />
        </View>
            <ScrollView contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}>
                
                {clinicsButtons}
            </ScrollView>
       </>
    )
}