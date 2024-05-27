import React, { useEffect, useState } from "react";
import BasicInformationForm from "../forms/BasicInformationForm"
import OrganizationInformationForm from "../forms/OrganizationInformationForm"
import EmployeeLoginForm from "../forms/EmployeeLoginForm";
import DailySpendingForm from "../forms/DailySpendingForm";
import ConfirmationPage from "../forms/ConfirmationPage";
import Modal from "../modals/index";

const HomePage = () => {

    const [currentStep, setCurrentStep] = useState<number>(0);
    const [formData, setFormData] = useState<any>({});
    const [isDataStored, setIsDataStored] = useState<boolean>(false); 
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleNextStep = (data: any) => {
        setFormData({ ...formData, ...data });
        setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    useEffect(() => {
        if (isDataStored) {
            setIsModalOpen(true);
        }
    }, [isDataStored]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmation = () => {
        setIsDataStored(true);
        setCurrentStep(0);
    };

    return (
        <div className=" min-h-screen flex flex-col">
            <header className=" text-[#E1EED6] bg-[#1B365D] text-center py-4">
                <h1 className="text-2xl font-semibold">Employee Onboarding</h1>
            </header>
            <div className="flex-1 flex items-center justify-center">
            <div className={`w-full bg-white shadow-md rounded-lg overflow-hidden flex flex-col max-w-4xl`} style={{ height: '10' }}>
                    <div className="flex-1 p-8 overflow-y-auto">
                        {currentStep === 0 && <BasicInformationForm onNext={handleNextStep} data={formData} />}
                        {currentStep === 1 && <OrganizationInformationForm onNext={handleNextStep} onPrevious={handlePreviousStep} data={formData} />}
                        {currentStep === 2 && <EmployeeLoginForm onNext={handleNextStep} onPrevious={handlePreviousStep} data={formData} />}
                        {currentStep === 3 && <DailySpendingForm onNext={handleNextStep} onPrevious={handlePreviousStep} data={formData} />}
                        {currentStep === 4 && <ConfirmationPage data={formData} onPrevious={handlePreviousStep} onConfirmation={handleConfirmation} />}
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    )
}

export default HomePage;