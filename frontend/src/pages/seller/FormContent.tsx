import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormData {
    storeName: string;
    businessType: string;
    matricNumber: string;
    category: string;
}

interface FormContextProps {
    formData: FormData;
    updateFormData: (newData: Partial<FormData>) => void;
}

const initialFormData: FormData = {
    storeName: '',
    businessType: '',
    matricNumber: '',
    category: '',
};

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormContext = (): FormContextProps => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const updateFormData = (newData: Partial<FormData>) => {
        setFormData((prevData) => ({ ...prevData, ...newData }));
    };

    return (
        <FormContext.Provider value={{ formData, updateFormData }}>
            {children}
        </FormContext.Provider>
    );
};