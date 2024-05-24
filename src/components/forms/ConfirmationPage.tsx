import React from "react";
import {ConfirmationPageProps} from "../../types/PagesTypes"

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ data ,onConfirmation, onPrevious }) =>  {

    const handleSubmit = () => {
        onConfirmation({});
    };

    return (
        <div className="mx-auto p-6 bg-[#1B365D] shadow rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 bg-[#1B365D] text-[#E1EED6]">Step 5: Confirmation</h2>
            <div className="bg-white rounded-lg p-6 mb-6 shadow">
                <h2 className="text-lg font-bold mb-4">Summary:</h2>
                <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-700">First Name:</span>
                        <span className="text-gray-800">{data.firstName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-700">Last Name:</span>
                        <span className="text-gray-800">{data.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-700">Organisation Name:</span>
                        <span className="text-gray-800">{data.organisationName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-700">Department:</span>
                        <span className="text-gray-800">{data.department}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-700">Division:</span>
                        <span className="text-gray-800">{data.division}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-700">Give Student Their Own Login:</span>
                        <span className="text-gray-800">{data.giveLogin ? 'Yes' : 'No'}</span>
                    </div>
                    {data.giveLogin && (
                        <div className="flex justify-between">
                            <span className="text-gray-700">Email:</span>
                            <span className="text-gray-800">{data.email}</span>
                        </div>
                    )}
                    <div className="flex justify-between">
                        <span className="text-gray-700">Daily Spending Limit:</span>
                        <span className="text-gray-800">{data.dailySpendingLimit}</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <button onClick={onPrevious} className="bg-[#BF524D] hover:bg-[#BF524D] text-white px-6 py-3 rounded-md focus:outline-none focus:bg-[#BF524D]">Previous</button>
                <button onClick={handleSubmit} className="bg-[#4297A3] hover:bg-[#4297A3] text-white px-6 py-3 rounded-md focus:outline-none focus:bg-[#4297A3]">Confirm and Submit</button>
            </div>
        </div>
    );

}

export default ConfirmationPage;