import React, { useState } from 'react';
import { TranslatorFactory } from 'react-native-power-translator';

export default Helpers = (value, lang) => {
    const [text, setText] = useState('');
    const translator = TranslatorFactory.createTranslator();
    (translator.translate(value, lang).then(translated => {
        if (translated[0] === '\'') {
            translated = translated.slice(1);
        }
        if (translated[translated.length - 1] === '\'') {
            translated = translated.slice(0, translated.length - 1);
        }
        setText(translated);
    }));
    return text;
}