import { useState, useEffect } from "react";

const [MATICPrice, setMATICPrice] = useState<any>([]);

const useGetMaticPrice = () => {
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
