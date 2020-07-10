import React from "react";
import { TouchableHighlight, Text, View, ScrollView, Button } from "react-native";
import appStyles from "./AppStyles";
import BetterMenu from "./BetterMenu";
import translate from "app/Components/getLocalizedText";
import FCDD from "./FCDD"

export default function FCDoDont(props) {
    return (
        <ScrollView
            contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
        >
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

        </ScrollView>
    );
}
