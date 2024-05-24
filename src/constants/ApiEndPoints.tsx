

const apiURL = process.env.REACT_APP_API_SERVER_URL;
const API_SERVER_URL = apiURL || 'https://run.mocky.io/v3';

const API_ENDPOINTS = {
    ORGANISATION: `${API_SERVER_URL}/00691aae-692e-4028-bf0a-585147fca47b`,
    DEPARTMENTS: `${API_SERVER_URL}/ce9708e8-9595-49e0-a577-cafec3ac3a28`,
    DIVISIONS: `${API_SERVER_URL}/2f6727dd-6fd2-4069-9b84-a15b5dcf2383`
};

export default API_ENDPOINTS;