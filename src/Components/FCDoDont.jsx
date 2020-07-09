import React from "react";
import { TouchableHighlight, Text, View, ScrollView, Button } from "react-native";
import appStyles from "./AppStyles";
<<<<<<< HEAD
import SelectionButton from "./SelectionButton";
import translate from "app/Components/getLocalizedText";
import FC from "../../assets/FC.png";

export default function FCDoDont(props) {
    let onPress = () => {
        props.getNextScreen();
    };
=======
import BetterMenu from "./BetterMenu";
import translate from "app/Components/getLocalizedText";
import FCDD from "./FCDD"

export default function FCDoDont(props) {
>>>>>>> 7de06b158b4696b0c2ca9c5a46ddc6b57dec0ad1
    return (
        <ScrollView
            contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
        >
<<<<<<< HEAD
            <Button title="DoDont" onPress={onPress} />
=======
            <Text
                style={{
                    fontSize: appStyles.regularFontSize + 2,
                    justifyContent: "center",
                    color: appStyles.blueColor,
                    fontWeight: "bold",
                }}>
                {translate("FCDoDont")}</Text>

            {FCDD().map((fcdd, key) => (
                <BetterMenu
                    style={appStyles.FCMenu}
                    key={key}
                    text={translate(fcdd.dodont)}
                />
            ))}

>>>>>>> 7de06b158b4696b0c2ca9c5a46ddc6b57dec0ad1
        </ScrollView>
    );
}
