import { useEffect, useState } from "react";

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    region: string;
    weight: number;
    roast_level: number;
    flavor_profile: [];
    grind_option: [];
    image_url: string;
}
export const useCoffeeApi = (url: string) => {
    const [data, setData] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(url);
                const jsonData = await response.json();
                setData(jsonData);
                setIsLoading(false);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Unknown Error: api.get.data');
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, error, isLoading };
};
