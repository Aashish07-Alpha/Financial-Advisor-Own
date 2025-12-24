// Utility functions for authentication management

export const clearAuthData = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  // Dispatch a custom event to notify components
  window.dispatchEvent(new CustomEvent('authStateChanged', { 
    detail: { isAuthenticated: false, user: null } 
  }));
};

export const setAuthData = (user, token) => {
  localStorage.setItem("user", JSON.stringify(user));
  if (token) {
    localStorage.setItem("token", token);
  }
  // Dispatch a custom event to notify components
  window.dispatchEvent(new CustomEvent('authStateChanged', { 
    detail: { isAuthenticated: true, user } 
  }));
};

export const getAuthData = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  
  if (user && token) {
    try {
      const parsedUser = JSON.parse(user);
      // Validate that user has required fields
      if (parsedUser && parsedUser.name && parsedUser.email) {
        return {
          user: parsedUser,
          token,
          isAuthenticated: true
        };
      } else {
        console.warn('Invalid user data in localStorage');
        clearAuthData();
        return { user: null, token: null, isAuthenticated: false };
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      clearAuthData();
      return { user: null, token: null, isAuthenticated: false };
    }
  }
  
  return { user: null, token: null, isAuthenticated: false };
};

// Function to validate and fix auth state
export const validateAuthState = () => {
  const authData = getAuthData();
  if (authData.isAuthenticated) {
    console.log('✅ Valid authentication data found');
    return true;
  } else {
    console.log('❌ No valid authentication data found');
    return false;
  }
};

// Function to force refresh auth state from localStorage
export const refreshAuthState = () => {
  console.log('🔄 Refreshing auth state from localStorage...');
  // Import the sync function dynamically
  import('../hooks/useAuthState').then(({ syncAuthStateFromStorage }) => {
    syncAuthStateFromStorage();
  }).catch(error => {
    console.error('Error importing syncAuthStateFromStorage:', error);
    // Fallback to event dispatch
    const authData = getAuthData();
    if (authData.isAuthenticated) {
      window.dispatchEvent(new CustomEvent('authStateChanged', { 
        detail: { isAuthenticated: true, user: authData.user } 
      }));
    } else {
      window.dispatchEvent(new CustomEvent('authStateChanged', { 
        detail: { isAuthenticated: false, user: null } 
      }));
    }
  });
  return true;
};
