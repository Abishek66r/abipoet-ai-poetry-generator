// API Configuration for AbiPoet
const API_CONFIG = {
  // Development environment (localhost)
  development: {
    baseUrl: 'http://localhost:8002',
  },
  // Production environment (deployed backend)
  production: {
    baseUrl: 'https://abipoet-api.onrender.com', // You'll need to deploy your backend to Render or similar service
  }
};

// Determine environment
const isProduction = process.env.NODE_ENV === 'production';
const currentConfig = isProduction ? API_CONFIG.production : API_CONFIG.development;

export const API_URL = `${currentConfig.baseUrl}/generate-poem`;
export const BASE_URL = currentConfig.baseUrl;