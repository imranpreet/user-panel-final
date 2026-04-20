/**
 * Data Transformation Utilities
 * Convert between API response format and component state format
 */

// ============================================================================
// USER PROFILE TRANSFORMATIONS
// ============================================================================

/**
 * Transform API user data to component formData
 */
export const transformUserDataToForm = (apiData) => {
  if (!apiData) return {};
  
  return {
    firstName: apiData.firstName || '',
    lastName: apiData.lastName || '',
    email: apiData.email || '',
    phone: apiData.phone || '',
    country: apiData.country || 'India',
    language: apiData.language || 'English',
    currency: apiData.currency || 'USD ($)',
    measure: apiData.measurement || 'Cm',
    dateFormat: apiData.dateFormat || 'MM/DD/YYYY',
    timezone: apiData.timezone || '',
    // Extract date parts from full birthDate if available
    month: apiData.birthDate ? new Date(apiData.birthDate).getMonth() : '',
    day: apiData.birthDate ? new Date(apiData.birthDate).getDate() : '',
    year: apiData.birthDate ? new Date(apiData.birthDate).getFullYear() : '',
  };
};

/**
 * Transform component formData to API user update payload
 */
export const transformFormDataToUser = (formData) => {
  const birthDate = formData.year && formData.month && formData.day
    ? new Date(formData.year, formData.month - 1, formData.day).toISOString()
    : null;

  return {
    firstName: formData.firstName,
    lastName: formData.lastName,
    phone: formData.phone,
    country: formData.country,
    language: formData.language,
    currency: formData.currency,
    measurement: formData.measure,
    dateFormat: formData.dateFormat,
    timezone: formData.timezone,
    birthDate: birthDate,
  };
};

// ============================================================================
// ADDRESS TRANSFORMATIONS
// ============================================================================

/**
 * Transform API address to component state
 */
export const transformAddressToForm = (apiAddress) => {
  if (!apiAddress) return {};
  
  return {
    fullName: apiAddress.fullName || '',
    addressLine1: apiAddress.addressLine1 || '',
    addressLine2: apiAddress.addressLine2 || '',
    apartment: apiAddress.apartment || '',
    zipCode: apiAddress.zipCode || '',
    city: apiAddress.city || '',
    state: apiAddress.state || '',
    country: apiAddress.country || '',
    isDefault: apiAddress.isDefault || false,
    isBillingAddress: apiAddress.isBillingAddress || false,
  };
};

/**
 * Transform component form to API address payload
 */
export const transformFormToAddress = (formData) => {
  return {
    fullName: formData.fullName,
    addressLine1: formData.addressLine1,
    addressLine2: formData.addressLine2,
    apartment: formData.apartment,
    zipCode: formData.zipCode,
    city: formData.city,
    state: formData.state,
    country: formData.country,
    isDefault: formData.isDefault || false,
    isBillingAddress: formData.isBillingAddress || false,
  };
};

// ============================================================================
// ORDERS TRANSFORMATIONS
// ============================================================================

/**
 * Transform API order to component display format
 */
export const transformOrderForDisplay = (apiOrder) => {
  if (!apiOrder) return null;
  
  return {
    id: apiOrder.orderId || apiOrder.id,
    title: apiOrder.artworkTitle || '',
    artist: apiOrder.artistName || '',
    image: apiOrder.artworkImage || '',
    price: apiOrder.totalPrice || 0,
    size: apiOrder.artworkSize || '',
    type: apiOrder.artworkType || '',
    status: apiOrder.orderStatus || 'pending',
    date: apiOrder.createdDate || apiOrder.orderDate,
    deliveryDate: apiOrder.estimatedDeliveryDate || apiOrder.deliveryDate,
    quantity: apiOrder.quantity || 1,
    paymentStatus: apiOrder.paymentStatus || 'pending',
    // Additional fields
    orderId: apiOrder.orderId || apiOrder.id,
    artistId: apiOrder.artistId,
    artworkId: apiOrder.artworkId,
    shippingAddress: apiOrder.shippingAddress,
    trackingNumber: apiOrder.trackingNumber,
  };
};

/**
 * Transform API orders array for display
 */
export const transformOrdersForDisplay = (apiOrders = []) => {
  return apiOrders.map(order => transformOrderForDisplay(order));
};

// ============================================================================
// PAYMENT METHOD TRANSFORMATIONS
// ============================================================================

/**
 * Transform API payment method to component form
 */
export const transformPaymentToForm = (apiPayment) => {
  if (!apiPayment) return {};
  
  return {
    cardholderName: apiPayment.cardholderName || '',
    cardNumber: apiPayment.cardNumber || '', // Should be masked
    expiryDate: apiPayment.expiryDate || '',
    cvv: '', // Never store CVV
    billingStreet: apiPayment.billingAddress?.street || '',
    billingCity: apiPayment.billingAddress?.city || '',
    billingState: apiPayment.billingAddress?.state || '',
    billingPostal: apiPayment.billingAddress?.postalCode || '',
    isDefault: apiPayment.isDefault || false,
  };
};

/**
 * Transform component form to API payment payload
 */
export const transformFormToPayment = (formData) => {
  return {
    cardholderName: formData.cardholderName,
    cardNumber: formData.cardNumber,
    expiryDate: formData.expiryDate,
    cvv: formData.cvv,
    billingAddress: {
      street: formData.billingStreet,
      city: formData.billingCity,
      state: formData.billingState,
      postalCode: formData.billingPostal,
    },
    isDefault: formData.isDefault || false,
  };
};

// ============================================================================
// NOTIFICATION PREFERENCES TRANSFORMATIONS
// ============================================================================

/**
 * Transform API notification preferences to component state
 */
export const transformNotificationPreferences = (apiPreferences) => {
  if (!apiPreferences) return {};
  
  return {
    notifications: {
      followingArtists: apiPreferences.followingArtists?.enabled || false,
      followingArtistsFrequency: apiPreferences.followingArtists?.frequency || 'daily',
      savedSearches: apiPreferences.savedSearches?.enabled || false,
      savedSearchesFrequency: apiPreferences.savedSearches?.frequency || 'daily',
      newsletter: apiPreferences.newsletter || false,
      favorites: apiPreferences.favorites || false,
      recommendations: apiPreferences.recommendations || false,
      pushNotifications: apiPreferences.pushNotifications || false,
    },
  };
};

/**
 * Transform component state to API notification preferences payload
 */
export const transformPreferencesToAPI = (componentState) => {
  return {
    followingArtists: {
      enabled: componentState.notifications?.followingArtists || false,
      frequency: componentState.notifications?.followingArtistsFrequency || 'daily',
    },
    savedSearches: {
      enabled: componentState.notifications?.savedSearches || false,
      frequency: componentState.notifications?.savedSearchesFrequency || 'daily',
    },
    newsletter: componentState.notifications?.newsletter || false,
    favorites: componentState.notifications?.favorites || false,
    recommendations: componentState.notifications?.recommendations || false,
    pushNotifications: componentState.notifications?.pushNotifications || false,
  };
};

// ============================================================================
// BUDGET TRANSFORMATIONS
// ============================================================================

/**
 * Transform API budget data to component state
 */
export const transformBudgetData = (apiBudget) => {
  if (!apiBudget) return {};
  
  return {
    budget: apiBudget.budgetRange || 'No budget',
    monthlySpent: apiBudget.monthlySpent || 0,
    monthlyLimit: apiBudget.monthlyLimit || 0,
    remainingBudget: apiBudget.remainingBudget || 0,
    percentageUsed: apiBudget.monthlyLimit > 0 
      ? (apiBudget.monthlySpent / apiBudget.monthlyLimit) * 100 
      : 0,
  };
};

// ============================================================================
// ANALYTICS TRANSFORMATIONS
// ============================================================================

/**
 * Transform API analytics to chart-compatible format
 */
export const transformAnalyticsToCharts = (apiAnalytics) => {
  if (!apiAnalytics) return {};
  
  return {
    activityData: (apiAnalytics.monthlyActivity || []).map(item => ({
      month: item.month || '',
      views: item.views || 0,
      purchases: item.purchases || 0,
      favorites: item.favorites || 0,
    })),
    
    paintingsByArtist: (apiAnalytics.topArtists || []).map(item => ({
      name: item.artistName || '',
      paintings: item.artworkCount || 0,
    })),
    
    monthlySpending: (apiAnalytics.monthlySpending || []).map(item => ({
      month: item.month || '',
      amount: item.amount || 0,
    })),
    
    collectionStats: (apiAnalytics.collectionBreakdown || []).map(item => ({
      name: item.category || '',
      value: item.percentage || 0,
    })),
    
    purchaseStats: (apiAnalytics.purchasesByCategory || []).map(item => ({
      name: item.category || '',
      count: item.count || 0,
    })),
  };
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Format currency for display
 */
export const formatCurrency = (amount, currency = 'USD') => {
  const currencies = {
    'USD': '$',
    'INR': '₹',
    'EUR': '€',
    'GBP': '£',
  };
  
  const symbol = currencies[currency] || '$';
  return `${symbol}${Number(amount).toLocaleString()}`;
};

/**
 * Format date for display
 */
export const formatDate = (dateString, format = 'MM/DD/YYYY') => {
  const date = new Date(dateString);
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  const formats = {
    'MM/DD/YYYY': `${month}/${day}/${year}`,
    'DD/MM/YYYY': `${day}/${month}/${year}`,
    'YYYY-MM-DD': `${year}-${month}-${day}`,
  };
  
  return formats[format] || formats['MM/DD/YYYY'];
};

/**
 * Mask credit card number for display
 */
export const maskCardNumber = (cardNumber) => {
  const lastFour = cardNumber.slice(-4);
  return `•••• •••• •••• ${lastFour}`;
};

/**
 * Format phone number
 */
export const formatPhoneNumber = (phone) => {
  // Remove non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
};

/**
 * Validate email
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate credit card number (Luhn algorithm)
 */
export const validateCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, '');
  
  if (!/^\d+$/.test(cleaned)) return false;
  if (cleaned.length < 13 || cleaned.length > 19) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

/**
 * Get order status badge color
 */
export const getOrderStatusColor = (status) => {
  const colors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'processing': 'bg-blue-100 text-blue-800',
    'in-transit': 'bg-indigo-100 text-indigo-800',
    'delivered': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800',
  };
  
  return colors[status] || colors['pending'];
};

/**
 * Get payment status badge color
 */
export const getPaymentStatusColor = (status) => {
  const colors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'completed': 'bg-green-100 text-green-800',
    'failed': 'bg-red-100 text-red-800',
    'refunded': 'bg-gray-100 text-gray-800',
  };
  
  return colors[status] || colors['pending'];
};

export default {
  // User Profile
  transformUserDataToForm,
  transformFormDataToUser,
  
  // Addresses
  transformAddressToForm,
  transformFormToAddress,
  
  // Orders
  transformOrderForDisplay,
  transformOrdersForDisplay,
  
  // Payments
  transformPaymentToForm,
  transformFormToPayment,
  
  // Notifications
  transformNotificationPreferences,
  transformPreferencesToAPI,
  
  // Budget
  transformBudgetData,
  
  // Analytics
  transformAnalyticsToCharts,
  
  // Helpers
  formatCurrency,
  formatDate,
  maskCardNumber,
  formatPhoneNumber,
  validateEmail,
  validateCardNumber,
  getOrderStatusColor,
  getPaymentStatusColor,
};
