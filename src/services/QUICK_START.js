// QUICK START GUIDE - API Integration

/**
 * HOW TO USE THE API SYSTEM
 * 
 * This guide helps you understand how to integrate APIs into the user panel
 */

// ============================================================================
// 1. SETUP ENVIRONMENT VARIABLES
// ============================================================================

/**
 * Create or update .env file in root directory:
 * 
 * .env
 * ----
 * REACT_APP_API_URL=http://localhost:5000/api
 * REACT_APP_ENV=development
 * REACT_APP_API_TIMEOUT=30000
 */

// ============================================================================
// 2. IMPORT API SERVICES
// ============================================================================

/**
 * In your component file:
 */

import {
  getUserProfile,
  updateUserProfile,
  getUserOrders,
  getPaymentMethods,
  updateAddress,
} from '../services/api';

import {
  transformUserDataToForm,
  transformFormDataToUser,
  transformOrdersForDisplay,
} from '../services/dataTransformations';

// ============================================================================
// 3. EXAMPLE: FETCHING USER PROFILE
// ============================================================================

/**
 * In MyInformationDashboard.jsx or any component:
 */

useEffect(() => {
  const loadUserProfile = async () => {
    try {
      // Step 1: Fetch data from API
      const profileData = await getUserProfile();
      
      // Step 2: Transform API data to component format
      const formattedData = transformUserDataToForm(profileData.data);
      
      // Step 3: Update component state
      setFormData({
        ...formData,
        ...formattedData,
      });
      
      // Step 4: Show success message
      console.log('Profile loaded successfully');
    } catch (error) {
      // Handle errors
      if (error.status === 401) {
        // Redirect to login
        console.error('Unauthorized - please log in again');
      } else {
        console.error('Failed to load profile:', error.message);
      }
    }
  };
  
  loadUserProfile();
}, []);

// ============================================================================
// 4. EXAMPLE: UPDATING USER PROFILE
// ============================================================================

const handleSaveProfile = async () => {
  try {
    // Show loading state
    setIsLoading(true);
    
    // Transform form data to API format
    const apiData = transformFormDataToUser(formData);
    
    // Call API
    const response = await updateUserProfile(apiData);
    
    // Show success message
    alert('Profile updated successfully');
    console.log('Updated profile:', response.data);
  } catch (error) {
    // Show error message
    alert('Failed to update profile: ' + error.message);
  } finally {
    setIsLoading(false);
  }
};

// ============================================================================
// 5. EXAMPLE: FETCHING ORDERS WITH FILTERS
// ============================================================================

const handleFetchOrders = async () => {
  try {
    setIsLoading(true);
    
    // Prepare query parameters
    const params = {
      status: activeFilter, // 'all', 'pending', 'delivered', 'in-transit'
      limit: 10,
      offset: (currentPage - 1) * 10,
      sort: sortBy, // 'latest', 'oldest', 'price-high', 'price-low'
    };
    
    // Fetch orders
    const response = await getUserOrders(params);
    
    // Transform to display format
    const displayOrders = transformOrdersForDisplay(response.data.orders);
    
    // Update state
    setOrders(displayOrders);
    setTotalOrders(response.data.total);
    
  } catch (error) {
    console.error('Failed to fetch orders:', error);
  } finally {
    setIsLoading(false);
  }
};

// ============================================================================
// 6. EXAMPLE: HANDLING ASYNC OPERATIONS
// ============================================================================

/**
 * Pattern for handling loading, error, and success states
 */

const [loadingState, setLoadingState] = useState({
  isLoading: false,
  error: null,
  success: false,
});

const executeApiCall = async (apiFunction, onSuccess) => {
  setLoadingState({ isLoading: true, error: null, success: false });
  
  try {
    const result = await apiFunction();
    
    // Process result
    if (onSuccess) {
      onSuccess(result);
    }
    
    setLoadingState({ isLoading: false, error: null, success: true });
    
    // Auto-dismiss success message after 3 seconds
    setTimeout(() => {
      setLoadingState(prev => ({ ...prev, success: false }));
    }, 3000);
    
  } catch (error) {
    setLoadingState({ 
      isLoading: false, 
      error: error.message, 
      success: false 
    });
  }
};

// Usage:
// executeApiCall(
//   () => getUserProfile(),
//   (data) => setFormData(transformUserDataToForm(data.data))
// );

// ============================================================================
// 7. EXAMPLE: FILE UPLOAD (PROFILE PICTURE)
// ============================================================================

const handleProfileImageUpload = async (file) => {
  try {
    setIsLoading(true);
    
    // Call upload API
    const response = await uploadProfilePicture(file);
    
    // Update profile image in UI
    setProfileImage(response.data.profileImage);
    
    alert('Profile picture uploaded successfully');
    
  } catch (error) {
    alert('Failed to upload image: ' + error.message);
  } finally {
    setIsLoading(false);
  }
};

// ============================================================================
// 8. EXAMPLE: FORM SUBMISSION WITH VALIDATION
// ============================================================================

const handleAddressSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // Validate form data
    const errors = validateAddressForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsLoading(true);
    
    // Transform to API format
    const addressPayload = transformFormToAddress(formData);
    
    // Call API
    const response = addressId
      ? await updateAddress(addressId, addressPayload)
      : await addAddress(addressPayload);
    
    // Show success
    alert('Address saved successfully');
    
    // Reset form
    resetAddressForm();
    
  } catch (error) {
    alert('Error: ' + error.message);
  } finally {
    setIsLoading(false);
  }
};

// ============================================================================
// 9. ERROR HANDLING BEST PRACTICES
// ============================================================================

/**
 * Standardized error handler function
 */

const handleApiError = (error) => {
  if (error.status === 401) {
    // Unauthorized - redirect to login
    localStorage.removeItem('authToken');
    window.location.href = '/login';
    return 'Session expired. Please log in again.';
  }
  
  if (error.status === 403) {
    return 'You do not have permission to perform this action.';
  }
  
  if (error.status === 404) {
    return 'The requested resource was not found.';
  }
  
  if (error.status === 429) {
    return 'Too many requests. Please wait a moment and try again.';
  }
  
  if (error.status >= 500) {
    return 'Server error. Please try again later.';
  }
  
  return error.message || 'An error occurred. Please try again.';
};

// Usage:
// try {
//   await someApiCall();
// } catch (error) {
//   const errorMessage = handleApiError(error);
//   alert(errorMessage);
// }

// ============================================================================
// 10. TOKEN MANAGEMENT
// ============================================================================

/**
 * Token management utilities
 */

export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
  // Set token in API headers
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
  delete api.defaults.headers.common['Authorization'];
};

export const isTokenExpired = () => {
  const token = getAuthToken();
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

// ============================================================================
// 11. API RESPONSE CACHING (OPTIONAL)
// ============================================================================

/**
 * Simple caching mechanism for frequently used data
 */

const cache = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedData = (key) => {
  const cached = cache[key];
  if (!cached) return null;
  
  if (Date.now() - cached.timestamp > CACHE_DURATION) {
    delete cache[key];
    return null;
  }
  
  return cached.data;
};

const setCachedData = (key, data) => {
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
};

const getUserProfileCached = async () => {
  const cachedData = getCachedData('userProfile');
  if (cachedData) {
    return cachedData;
  }
  
  const data = await getUserProfile();
  setCachedData('userProfile', data);
  return data;
};

// ============================================================================
// 12. INTEGRATING WITH SPECIFIC COMPONENTS
// ============================================================================

/**
 * PERSONAL INFORMATION PAGE
 */

// Replace static data loading in MyInformationDashboard.jsx with:
useEffect(() => {
  if (activeSection === 'information') {
    loadUserProfile(); // Your API call
  }
}, [activeSection]);

/**
 * ORDERS PAGE
 */

// Replace sample orders with:
useEffect(() => {
  if (activeSection === 'orders') {
    fetchOrders({ status: filterStatus, sort: sortBy });
  }
}, [activeSection, filterStatus, sortBy]);

/**
 * PAYMENT SETTINGS PAGE
 */

// Replace sample payment methods with:
useEffect(() => {
  if (activeSection === 'payment') {
    fetchPaymentMethods();
  }
}, [activeSection]);

/**
 * ADDRESSES PAGE
 */

// Replace sample addresses with:
useEffect(() => {
  if (activeSection === 'information') {
    fetchAddresses();
  }
}, [activeSection]);

/**
 * NOTIFICATIONS PAGE
 */

// Replace sample notifications with:
useEffect(() => {
  if (activeSection === 'preferences') {
    fetchNotificationPreferences();
  }
}, [activeSection]);

/**
 * BUDGET PAGE
 */

// Replace sample budget data with:
useEffect(() => {
  if (activeSection === 'budget') {
    fetchBudgetData();
    fetchBudgetAnalytics();
  }
}, [activeSection]);

/**
 * DASHBOARD
 */

// Replace sample dashboard data with:
useEffect(() => {
  if (activeSection === 'dashboard') {
    Promise.all([
      getDashboardAnalytics(),
      getActivityHistory(),
      getCollectionStats(),
    ]).then(([analytics, activity, stats]) => {
      // Update state with real data
      updateDashboardData(analytics, activity, stats);
    });
  }
}, [activeSection]);

// ============================================================================
// 13. TESTING API CALLS
// ============================================================================

/**
 * Test API integration with sample requests
 * 
 * Install a REST client extension in VS Code or use Postman
 * 
 * Example Postman requests:
 * 
 * GET http://localhost:5000/api/user/profile
 * Headers:
 *   Authorization: Bearer YOUR_TOKEN_HERE
 *   Content-Type: application/json
 * 
 * PUT http://localhost:5000/api/user/profile/update
 * Body:
 * {
 *   "firstName": "Arsh",
 *   "lastName": "Kaur",
 *   "phone": "+91-9876543210"
 * }
 */

// ============================================================================
// 14. DEPLOYMENT CHECKLIST
// ============================================================================

/**
 * Before deploying to production:
 * 
 * [ ] Update REACT_APP_API_URL to production backend URL
 * [ ] Test all API endpoints with real backend
 * [ ] Verify authentication token flow
 * [ ] Test error handling
 * [ ] Check console for warnings/errors
 * [ ] Test with real network conditions (slow, offline)
 * [ ] Verify all data transformations
 * [ ] Load test with multiple concurrent requests
 * [ ] Check sensitive data isn't logged
 * [ ] Verify HTTPS is enabled
 * [ ] Test on production-like environment
 */

// ============================================================================
// 15. COMMON ISSUES & SOLUTIONS
// ============================================================================

/**
 * Issue 1: 401 Unauthorized
 * Solution: Check if token is expired or invalid
 * - Clear localStorage and log in again
 * - Check if token is properly set in API headers
 * 
 * Issue 2: CORS Error
 * Solution: Configure CORS on backend
 * - Backend should include proper CORS headers
 * - Check origin in response headers
 * 
 * Issue 3: 404 Not Found
 * Solution: Verify API endpoint URL
 * - Check REACT_APP_API_URL is correct
 * - Verify endpoint paths match backend
 * 
 * Issue 4: Network Timeout
 * Solution: Increase timeout or improve server performance
 * - Check server status
 * - Verify network connection
 * - Check backend logs for errors
 * 
 * Issue 5: Data Not Updating
 * Solution: Clear cache and re-fetch
 * - Check data transformation logic
 * - Verify state updates are working
 * - Check browser DevTools Network tab
 */

export default {
  // This file is for reference and documentation
  // Actual API calls should be made from component files
};
