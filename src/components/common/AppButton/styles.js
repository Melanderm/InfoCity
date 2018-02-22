import React,  {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bdc3c7'
    },
    tabbar: {
        tintColor: '#2ecc71',
        backgroundColor: '#2ecc71'
    },
    text: {
        textAlign: 'center',
        color: '#f1fafb',
        fontSize: 17,
        fontFamily: 'Ubuntu'
    },
    circleContainer: {
        justifyContent: 'center',
        height: 50,
        width: 50,
        borderRadius: 50/2,
        alignItems: 'center',
        opacity: 0.80
    },
    addButton: {
        backgroundColor: '#03A9F4'
    },
    stretch: {
        width: 25,
        height: 25
    }
});

export default styles;