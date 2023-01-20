import { useState, useEffect } from "react";

const useGetMaticPrice = () => {
    const [MATICPrice, setMATICPrice] = useState<any>([]);
    useEffect(() => {
        fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=USD"
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch the data");
                }
                return response.json();
            })
            .then((data) => {
                setMATICPrice(data);
            })
            .catch((error) => console.log(error));
    }, []);

    return MATICPrice;
};

export default useGetMaticPrice;
