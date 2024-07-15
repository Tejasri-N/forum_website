import React, { useState, useEffect } from 'react';
import GsapComponent from './GsapComponent'; 

const WithSplashScreen = (WrappedComponent) => {
  return function SplashScreenWrapper(props) {
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
      const fetchData = async () => {
        try {
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    if (loading) {
      console.log("Loading is true, displaying splash screen");
      return <GsapComponent />;
    }

    console.log("Loading is false, displaying wrapped component");
    return <WrappedComponent {...props} />;
  };
};

export default WithSplashScreen;

