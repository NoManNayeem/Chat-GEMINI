// ../api/subscription.js

import * as Crypto from 'expo-crypto';

const makeSubscription = async () => {
    const apiSecret = 'b00ca116-0795-4742-af56-5ad29bc321ed';
    const apiKey = 'd25929b72b92416ff01c5024112dc075';
    const currentUtcTime = new Date().toISOString();

    let requestId = '';
    for (let i = 0; i < 15; i++) {
        requestId += Math.floor(Math.random() * 10).toString();
    }

    const signatureData = `${apiKey}|${currentUtcTime}|${apiSecret}`;
    const hashedSignature = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA512,
        signatureData
    );

    const redirectUrl = "https://placehold.co/600x400?text=Thsnk\nYou!"; // Set your redirect URL

    const apiEndpoint = `https://user.digimart.store/sdk/subscription/authorize?apiKey=${apiKey}&requestId=${requestId}&requestTime=${currentUtcTime}&signature=${hashedSignature}&redirectUrl=${redirectUrl}`;

    return apiEndpoint;
};

export { makeSubscription };
