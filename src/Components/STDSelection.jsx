import React from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  ScrollView,
  Linking,
} from 'react-native';
import appStyles from './AppStyles';
import SelectionButton from './SelectionButton';
import STD from './STD';
import translate from './getLocalizedText';

export default function STDSelection(props) {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState('name');
  const onPress = (std) => {
    props.navigation.navigate('STDInfo', {
      name: translate(std.name),
      symptoms: std.symptoms,
      diagnosis: std.diagnosis,
      treatment: std.treatment,
      consequences: std.consequences,
      safeSex: std.safeSex,
    });

    useEffect(() => {
      const sortList = (type) => {
        const types = {
          name: translate(std.name),
        };
        const stortName = types[type];
        const sorts = [...std].sort((a, b) => b[sortName] - a[sortName]);
        setData[sorts];
      };
      sortList(sort);
    }, [sort]);

    return (
      <ScrollView
        onChnage={setSort}
        contentContainerStyle={{
          alignItems: 'center',
          maxWidth: '100%',
          backgroundColor: 'white',
        }}
      >
        {STD().map((std, key) => (
          <SelectionButton
            style={appStyles.STDFemaleCondomSelectionButton}
            key={key}
            text={translate(std.name)}
            onPress={() => onPress(std)}
          />
        ))}
      </ScrollView>
    );
  };
}
