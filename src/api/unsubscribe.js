// ../api/unsubscribe.js

const unsubscribe = async (subscriberId) => {
    const data = {
      applicationId: "APP_000124",
      password: "8271f1956e745f720862d7948e3d490e",
      subscriberId: `tel:${subscriberId}`,
      action: "0"
    };
  
    const url = 'https://api.digimart.store/subs/unregistration';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseText = await response.text();
      return responseText;
    } catch (error) {
      console.error('Error in unsubscribe API:', error);
      throw error;  // Re-throw the error for handling in the component.
    }
  };
  
  export default unsubscribe;
  