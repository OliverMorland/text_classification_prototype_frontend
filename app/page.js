"use client";  // Ensures it's a client component

import { useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";

export default function Page() {
    const [feedback, setFeedback] = useState([
        "there is no contact information!",
        "The website is poorly designed",
        "no hay lo que estaba buscando",
        "everything works well",
        "es muy lento",
        "customer support staff were rude",
        "I think this",
        "bla bla bla",
        "Que vaina!"
    ]);
    const [categories, setCategories] = useState([]);
    const [chartData, setChartData] = useState(null);

    // Handle input changes for editable feedback fields
    const handleInputChange = (index, value) => {
        const updatedFeedback = [...feedback];
        updatedFeedback[index] = value;
        setFeedback(updatedFeedback);
    };

    // // Simulated classification function
    // const classifyFeedback = () => {
    //     const mockCategories = ["website performance", "website design", "support staff"];
    //     const results = feedback.map(text => {
    //         const randomCategory = mockCategories[Math.floor(Math.random() * mockCategories.length)];
    //         return { feedback: text, category: randomCategory };
    //     });
    //     setCategories(results);

    //     const categoryCounts = results.reduce((acc, item) => {
    //         acc[item.category] = (acc[item.category] || 0) + 1;
    //         return acc;
    //     }, {});
    //     setChartData({
    //         labels: Object.keys(categoryCounts),
    //         datasets: [{ data: Object.values(categoryCounts), backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"] }],
    //     });
    // };
    const classifyFeedback = async () => {
        try {
            // const response = await axios.post("https://text-classification-prototype-backend.onrender.com/classify", { feedback });
            // setCategories(response.data.classified);

            const dummyCategories = ["complaint about support staff", "website clarity", "website performance"];
            const results = feedback.map(text => {
                const randomCategory = dummyCategories[Math.floor(Math.random() * dummyCategories.length)];
                return { feedback: text, category: randomCategory };
            });
            setCategories(results)

            // const categoryCounts = response.data.classified.reduce((acc, item) => {
            //     acc[item.category] = (acc[item.category] || 0) + 1;
            //     return acc;
            // }, {});
            const categoryCounts = results.reduce((acc, item) => {
                acc[item.category] = (acc[item.category] || 0) + 1;
                return acc;
            }, {});


            setChartData({
                labels: Object.keys(categoryCounts),
                datasets: [{ data: Object.values(categoryCounts), backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"] }],
            });
        } catch (error) {
            console.error("Error classifying feedback", error);
        }
    };
    // const classifyFeedback = async () => {
    //     try {
    //         const response = await axios.post(
    //             "https://text-classification-prototype-backend.onrender.com/classify", 
    //             { feedback }
    //         );
    //         setCategories(response.data.classified);
    //     } catch (error) {
    //         console.error("Error classifying feedback", error);
    //     }
    // };

    return (
        <div className="flex flex-col items-center p-8 min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Feedback Classifier</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                {/* Editable Feedback List */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Enter Feedback</h2>
                    {feedback.map((text, index) => (
                        <input
                            key={index}
                            type="text"
                            value={text}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            className="w-full p-2 mb-2 border border-gray-300 rounded text-gray-700"
                        />
                    ))}
                </div>
                
                {/* Classification Button & Results */}
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Classify</h2>
                    <button 
                        onClick={classifyFeedback} 
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Classify!
                    </button>
                    <div className="mt-4">
                        {categories.map((item, index) => (
                            <p key={index} className="text-sm text-gray-700">
                                <strong>{item.feedback}</strong> → {item.category}
                            </p>
                        ))}
                    </div>
                </div>
                
                {/* Pie Chart */}
                <div className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center">
                    {chartData && <Pie data={chartData} />}
                </div>
            </div>
        </div>
    );
}
