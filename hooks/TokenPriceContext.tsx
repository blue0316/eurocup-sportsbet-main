import React, { createContext, useContext, useState, useEffect } from "react";

const TokenPriceContext = createContext({
  price: null,
  error: null,
});

export const TokenPriceProvider = ({ children }: any) => {
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokenPrice = async () => {
      try {
        const response = await fetch("/api/tokenPrice");
        const dataResponse = await response.json();
        setPrice(dataResponse.priceUsdt.result.priceUsdt);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchTokenPrice();

    // Set up an interval to fetch the price every 10 seconds
    const interval = setInterval(fetchTokenPrice, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TokenPriceContext.Provider value={{ price, error }}>
      {children}
    </TokenPriceContext.Provider>
  );
};

export const useTokenPrice = () => {
  return useContext(TokenPriceContext);
};
