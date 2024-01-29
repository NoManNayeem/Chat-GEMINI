import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Animated, Modal, TouchableOpacity, Linking } from 'react-native';
import { Button, Card, Title, Paragraph, List, Text, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { makeSubscription } from '../api/subscriptionCharging';
import unsubscribe from '../api/unsubscribe';
import fetchSubscriberId from '../api/fetchSubscriberId';

const AboutFAQsScreen = ({ navigation }) => {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [expanded1, setExpanded1] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleUnsubscribe = async () => {
        try {
            const subscriberId = await fetchSubscriberId();
            const result = await unsubscribe(subscriberId);
            console.log('Unsubscribe successful:', result);
            // Display a success message
        } catch (error) {
            console.error('Unsubscribe failed:', error);
            // Display an error message
        }
    };

    // Inside your component
    const [subscriptionUrl, setSubscriptionUrl] = useState('');

    useEffect(() => {
        const fetchSubscriptionUrl = async () => {
            try {
                const url = await makeSubscription();
                setSubscriptionUrl(url);
            } catch (error) {
                console.error('Error fetching subscription URL:', error);
            }
        };

        fetchSubscriptionUrl();
    }, []);

    // Animated value for the Subscribe button
    const scaleAnimation = useState(new Animated.Value(1))[0];

    useEffect(() => {
        // Animation for the Subscribe button
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnimation, {
                    toValue: 1.1,
                    duration: 1000,
                    useNativeDriver: true
                }),
                Animated.timing(scaleAnimation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                })
            ])
        ).start();
    }, []);

    useEffect(() => {
        SplashScreen.preventAutoHideAsync();

        async function loadFonts() {
            await Font.loadAsync({
                'MaterialCommunityIcons': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
            });
            setFontLoaded(true);
        }

        loadFonts();
    }, []);

    useEffect(() => {
        if (fontLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontLoaded]);

    if (!fontLoaded) {
        return null;
    }

    // Function to open links using Linking
    const openLink = (url) => {
        Linking.openURL(url);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Animated Subscribe Button */}
            <Animated.View style={[styles.subscribeButtonContainer, { transform: [{ scale: scaleAnimation }] }]}>
                <Button
                    icon="email-newsletter"
                    mode="contained"
                    style={styles.subscribeButton}
                    onPress={() => setModalVisible(true)} // Open modal on button press
                >
                    Subscribe
                </Button>
            </Animated.View>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                {subscriptionUrl ? (
                    <WebView source={{ uri: subscriptionUrl }} style={{ flex: 1 }} />
                ) : (
                    <Text>Loading...</Text> // Or any other placeholder
                )}
                <Button onPress={() => setModalVisible(false)}>Close</Button>
            </Modal>

            <Card style={styles.card}>
                <Card.Content>
                    <Title style={styles.title}>About Chat-Gemini</Title>
                    <Paragraph style={styles.paragraph}>
                        Chat-Gemini is an innovative chat application powered by Google's Gemini AI technology.
                        Developed by Nayeem Islam, it aims to provide a cutting-edge chat experience.
                    </Paragraph>
                </Card.Content>
            </Card>
            {/* About Developer Card */}
            <Card style={styles.card}>
                <Card.Content>
                    <Title style={[styles.title, styles.developerTitle]}>About Developer</Title>
                    <View style={styles.developerInfoContainer}>
                        {/* Column 1: Developer Information */}
                        <View style={styles.infoColumn}>
                            <TouchableOpacity onPress={() => openLink('https://www.linkedin.com/in/nayeemislam60053/')} activeOpacity={0.7}>
                                <View style={styles.developerInfo}>
                                    <MaterialIcons name="person" size={24} color="#0052cc" />
                                    <Text style={styles.text}>Nayeem Islam</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openLink('mailto:islam.nayeem@outlook.com')} activeOpacity={0.7}>
                                <View style={styles.developerInfo}>
                                    <MaterialIcons name="email" size={24} color="#0052cc" />
                                    <Text style={styles.text}>islam.nayeem@outlook.com</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openLink('https://medium.com/@nomannayeem')} activeOpacity={0.7}>
                                <View style={styles.developerInfo}>
                                    <MaterialCommunityIcons name="basket-fill" size={24} color="#0052cc" />
                                    <Text style={styles.text}>
                                        Medium Profile
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openLink('https://github.com/nomannayeem')} activeOpacity={0.7}>
                                <View style={styles.developerInfo}>
                                    <MaterialCommunityIcons name="github" size={24} color="#0052cc" />
                                    <Text style={styles.text}>
                                        GitHub Profile
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            {/* Add more developer info if needed */}
                        </View>
                    </View>
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Content>
                    <Title style={[styles.title, styles.faqTitle]}>FAQs</Title>
                    <List.Section>
                        <List.Accordion
                            title="Service-related Issues"
                            expanded={expanded1}
                            onPress={() => setExpanded1(!expanded1)}
                            left={props => <MaterialCommunityIcons {...props} name={expanded1 ? "minus" : "plus"} size={20} />}
                            titleStyle={styles.accordionTitle}
                        >
                            <Text style={styles.text}>
                                For any service-related issues concerning this app, we encourage users to reach out to us at the contact section directly.
                            </Text>
                        </List.Accordion>

                        <List.Accordion
                            title="Contact"
                            expanded={expanded2}
                            onPress={() => setExpanded2(!expanded2)}
                            left={props => <MaterialCommunityIcons {...props} name={expanded2 ? "minus" : "plus"} size={20} />}
                            titleStyle={styles.accordionTitle}
                        >
                            <Text style={styles.text}>
                                Phone: 88017xxxxxxxx
                                {"\n"}Email: xyz@xyz.com
                            </Text>
                        </List.Accordion>

                        {/* Other FAQs similar to the above */}
                    </List.Section>
                </Card.Content>
            </Card>

            <View style={styles.buttonContainer}>
                <Button mode="contained" style={styles.button} onPress={handleUnsubscribe}>
                    Unsubscribe
                </Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    developerInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoColumn: {
        flex: 1,
        marginRight: 10, // Add margin to separate columns
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Light background color
    },
    subscribeButtonContainer: {
        margin: 15,
        elevation: 4,
    },
    subscribeButton: {
        backgroundColor: '#ff5722',
    },
    developerTitle: {
        marginBottom: 10,
        color: '#333',
    },
    developerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    card: {
        margin: 15,
        elevation: 4, // Adds shadow
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333', // Darker color for better readability
    },
    paragraph: {
        margin: 10,
        fontSize: 16,
        color: '#666', // Soft color for text
    },
    faqTitle: {
        color: '#0052cc', // Primary theme color
    },
    accordionTitle: {
        fontSize: 18,
    },
    text: {
        margin: 10,
    },
    buttonContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#0052cc', // Theme color for button
    },
});

export default AboutFAQsScreen;
