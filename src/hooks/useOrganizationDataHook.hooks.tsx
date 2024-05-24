import { useState } from 'react';
import axios from "axios";
import API_ENDPOINTS from '../constants/ApiEndPoints';

export const useOrganizationDataHook = (searchTerm: string | null) => {

    const [departments, setDepartments] = useState<any[]>([]);
    const [divisions, setDivisions] = useState<any[]>([]);
    const [organisationLists, setOrganisationLists] = useState<string[]>([]);


    const handleOrganisationSearch = async (orgKey: string) => {
        try {
            const response = await axios.get(`${API_ENDPOINTS.ORGANISATION}`);
            if (response.data) {
                const data = await response.data;
                setOrganisationLists(data);
            } else {
                throw new Error('Failed to fetch organisation');
            }
        } catch (error) {
        }
    };

    const fetchDepartments = async (orgKey: string) => {
        try {
            const response = await axios.get(`${API_ENDPOINTS.DEPARTMENTS}?orgKey=${orgKey}`);
            if (response?.data) {
                const data =  await response?.data;
                setDepartments(data);
            } else {
                throw new Error('Failed to fetch departments');
            }
        } catch (error) {
        }
    };

    const fetchDivisions = async (depKey: string) => {
        try {
            const response = await axios.get(`${API_ENDPOINTS.DIVISIONS}?departmentKey=${depKey}`);
            if (response?.data) {
                const data = await response.data;
                setDivisions(data);
            } else {
                throw new Error('Failed to fetch divisions');
            }
        } catch (error) {
        }
    };

    return {
        organisationLists,
        departments,
        divisions,

        handleOrganisationSearch,
        fetchDepartments,
        fetchDivisions
      
    };
};