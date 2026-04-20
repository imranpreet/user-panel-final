/**
 * API Service File
 * All API endpoints and their integration code for the User Panel
 * This file contains all the required APIs for dynamic data fetching
 * 
 * SETUP INSTRUCTIONS:
 * 1. Replace BASE_URL with your backend server URL
 * 2. Update endpoints as per your backend API documentation
 * 3. Uncomment the API calls in components when ready to integrate
 */

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ============================================================================
// USER AUTHENTICATION & PROFILE APIs
// ============================================================================

/**
 * Get User Profile Data
 * @returns {Promise} User profile object
 */
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Update User Profile Information
 * @param {Object} profileData - User profile data to update
 */
export const updateUserProfile = async (profileData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/profile/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

/**
 * Upload User Profile Picture
 * @param {File} file - Image file to upload
 */
export const uploadProfilePicture = async (file) => {
  try {
    const token = localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('profileImage', file);
    
    const response = await fetch(`${BASE_URL}/user/profile/picture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};

// ============================================================================
// ADDRESS APIs
// ============================================================================

/**
 * Get User Addresses
 * @returns {Promise} Array of user addresses
 */
export const getUserAddresses = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/addresses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching addresses:', error);
    throw error;
  }
};

/**
 * Add New Address
 * @param {Object} addressData - Address details
 */
export const addAddress = async (addressData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/addresses/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(addressData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding address:', error);
    throw error;
  }
};

/**
 * Update Address
 * @param {String} addressId - Address ID to update
 * @param {Object} addressData - Updated address data
 */
export const updateAddress = async (addressId, addressData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/addresses/${addressId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(addressData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating address:', error);
    throw error;
  }
};

/**
 * Delete Address
 * @param {String} addressId - Address ID to delete
 */
export const deleteAddress = async (addressId) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/addresses/${addressId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
};

// ============================================================================
// PASSWORD & SECURITY APIs
// ============================================================================

/**
 * Change User Password
 * @param {Object} passwordData - Old and new password
 */
export const changePassword = async (passwordData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

/**
 * Delete User Account
 * @param {Object} deleteData - Password confirmation for deletion
 */
export const deleteAccount = async (deleteData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/delete-account`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(deleteData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    localStorage.removeItem('authToken');
    return data;
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};

// ============================================================================
// NOTIFICATION & PREFERENCES APIs
// ============================================================================

/**
 * Get User Notification Preferences
 * @returns {Promise} Notification preferences object
 */
export const getNotificationPreferences = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/notifications/preferences`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching notification preferences:', error);
    throw error;
  }
};

/**
 * Update Notification Preferences
 * @param {Object} preferences - Updated notification preferences
 */
export const updateNotificationPreferences = async (preferences) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/notifications/preferences`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(preferences),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    throw error;
  }
};

/**
 * Get User Notifications
 * @param {Object} params - Query parameters (limit, offset, etc.)
 */
export const getUserNotifications = async (params = {}) => {
  try {
    const token = localStorage.getItem('authToken');
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${BASE_URL}/user/notifications?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

// ============================================================================
// ORDERS APIs
// ============================================================================

/**
 * Get User Orders
 * @param {Object} params - Query parameters (status, limit, offset, sort, etc.)
 */
export const getUserOrders = async (params = {}) => {
  try {
    const token = localStorage.getItem('authToken');
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${BASE_URL}/user/orders?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

/**
 * Get Order Details
 * @param {String} orderId - Order ID
 */
export const getOrderDetails = async (orderId) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
};

/**
 * Cancel Order
 * @param {String} orderId - Order ID to cancel
 */
export const cancelOrder = async (orderId) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/orders/${orderId}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw error;
  }
};

/**
 * Track Order
 * @param {String} orderId - Order ID to track
 */
export const trackOrder = async (orderId) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/orders/${orderId}/track`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error tracking order:', error);
    throw error;
  }
};

/**
 * Get Order Invoice
 * @param {String} orderId - Order ID
 */
export const getOrderInvoice = async (orderId) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/orders/${orderId}/invoice`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error('Error fetching order invoice:', error);
    throw error;
  }
};

// ============================================================================
// PAYMENT METHODS APIs
// ============================================================================

/**
 * Get User Payment Methods
 * @returns {Promise} Array of payment methods
 */
export const getPaymentMethods = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/payments/methods`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    throw error;
  }
};

/**
 * Add Payment Method
 * @param {Object} paymentData - Payment method details
 */
export const addPaymentMethod = async (paymentData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/payments/methods/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding payment method:', error);
    throw error;
  }
};

/**
 * Update Payment Method
 * @param {String} paymentId - Payment method ID
 * @param {Object} paymentData - Updated payment method data
 */
export const updatePaymentMethod = async (paymentId, paymentData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/payments/methods/${paymentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating payment method:', error);
    throw error;
  }
};

/**
 * Delete Payment Method
 * @param {String} paymentId - Payment method ID to delete
 */
export const deletePaymentMethod = async (paymentId) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/payments/methods/${paymentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting payment method:', error);
    throw error;
  }
};

/**
 * Set Default Payment Method
 * @param {String} paymentId - Payment method ID to set as default
 */
export const setDefaultPaymentMethod = async (paymentId) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/payments/methods/${paymentId}/default`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error setting default payment method:', error);
    throw error;
  }
};

// ============================================================================
// BUDGET APIs
// ============================================================================

/**
 * Get User Budget
 * @returns {Promise} User budget object
 */
export const getUserBudget = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/budget`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching budget:', error);
    throw error;
  }
};

/**
 * Update User Budget
 * @param {Object} budgetData - Budget details
 */
export const updateUserBudget = async (budgetData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/budget`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(budgetData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating budget:', error);
    throw error;
  }
};

/**
 * Get Budget Analytics
 * @returns {Promise} Budget analytics data
 */
export const getBudgetAnalytics = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/budget/analytics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching budget analytics:', error);
    throw error;
  }
};

// ============================================================================
// OFFERS & PROMOTIONS APIs
// ============================================================================

/**
 * Get User Offers
 * @param {Object} params - Query parameters
 */
export const getUserOffers = async (params = {}) => {
  try {
    const token = localStorage.getItem('authToken');
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${BASE_URL}/user/offers?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw error;
  }
};

/**
 * Claim Offer
 * @param {String} offerId - Offer ID to claim
 */
export const claimOffer = async (offerId) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/offers/${offerId}/claim`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error claiming offer:', error);
    throw error;
  }
};

// ============================================================================
// SETTINGS APIs
// ============================================================================

/**
 * Get User Settings
 * @returns {Promise} User settings object
 */
export const getUserSettings = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/settings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
};

/**
 * Update User Settings
 * @param {Object} settingsData - Updated settings
 */
export const updateUserSettings = async (settingsData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(settingsData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};

// ============================================================================
// NEWSLETTER APIs
// ============================================================================

/**
 * Subscribe to Newsletter
 * @param {String} email - Email to subscribe
 */
export const subscribeNewsletter = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};

/**
 * Unsubscribe from Newsletter
 * @param {String} email - Email to unsubscribe
 */
export const unsubscribeNewsletter = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/newsletter/unsubscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    throw error;
  }
};

// ============================================================================
// DASHBOARD ANALYTICS APIs
// ============================================================================

/**
 * Get Dashboard Analytics
 * @param {Object} params - Query parameters (date range, etc.)
 */
export const getDashboardAnalytics = async (params = {}) => {
  try {
    const token = localStorage.getItem('authToken');
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${BASE_URL}/user/dashboard/analytics?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching dashboard analytics:', error);
    throw error;
  }
};

/**
 * Get Activity History
 * @param {Object} params - Query parameters
 */
export const getActivityHistory = async (params = {}) => {
  try {
    const token = localStorage.getItem('authToken');
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${BASE_URL}/user/activity/history?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching activity history:', error);
    throw error;
  }
};

/**
 * Get Collection Statistics
 * @returns {Promise} Collection stats object
 */
export const getCollectionStats = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/user/collection/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching collection stats:', error);
    throw error;
  }
};

// ============================================================================
// SUPPORT APIs
// ============================================================================

/**
 * Contact Support
 * @param {Object} supportData - Support inquiry details
 */
export const contactSupport = async (supportData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/support/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(supportData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error contacting support:', error);
    throw error;
  }
};

export default {
  // User Profile
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture,
  
  // Addresses
  getUserAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  
  // Password & Security
  changePassword,
  deleteAccount,
  
  // Notifications
  getNotificationPreferences,
  updateNotificationPreferences,
  getUserNotifications,
  
  // Orders
  getUserOrders,
  getOrderDetails,
  cancelOrder,
  trackOrder,
  getOrderInvoice,
  
  // Payments
  getPaymentMethods,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod,
  
  // Budget
  getUserBudget,
  updateUserBudget,
  getBudgetAnalytics,
  
  // Offers
  getUserOffers,
  claimOffer,
  
  // Settings
  getUserSettings,
  updateUserSettings,
  
  // Newsletter
  subscribeNewsletter,
  unsubscribeNewsletter,
  
  // Analytics
  getDashboardAnalytics,
  getActivityHistory,
  getCollectionStats,
  
  // Support
  contactSupport,
};
