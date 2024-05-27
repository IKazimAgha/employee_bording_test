export interface InputFieldsProps {
    onChange : () => void,
    ref: any,
    name: string,
    value: string
}

export interface OrganisationSettingsFormProps {
    onNext: (data: any) => void;
    onPrevious: () => void;
    data: any
}

export interface EmployeeLoginPageProps {
    onNext: (data: any) => void;
    onPrevious: () => void;
    data: any;
}

export interface DailySpendingFormProps {
    onNext: (data: any) => void;
    onPrevious: () => void;
    data: any;
}

export interface ConfirmationPageProps {
    data: any;
    onConfirmation: (data: any) => void;
    onPrevious: () => void;
}

export interface BasiInformationProps {
    onNext: (data: any) => void;
    data: any
}