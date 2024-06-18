import { Pressable, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants";

const Button = ({ onPress, text, variant, disabled, customStyle = {} }) => (
    <Pressable
        onPress={onPress}
        style={({ pressed }) => ({...containerStyles.base, ...containerStyles[variant], ...customStyle, opacity: pressed || disabled ? 0.5 : 1})}
    >
        <Text style={textStyles[variant]}>{text}</Text>
    </Pressable>
);

const containerStyles = StyleSheet.create({
    base: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        padding: 16,
    },
    primary: {
        backgroundColor: COLORS.primary,
    },
    secondary: {
        borderWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid',
        borderColor: COLORS.primary
    }
});

const textStyles = StyleSheet.create({
    primary: {
        color: COLORS.white,
    },
    secondary: {
        color: COLORS.primary,   
    }
});

export default Button;