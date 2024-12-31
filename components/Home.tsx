import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance'; // Path to the axiosInstance file

const Home: React.FC = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/protected-endpoint/'); // Your protected API endpoint
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            {data && <p>{JSON.stringify(data)}</p>}
        </div>
    );
};

export default Home;
