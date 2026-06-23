import React, { createContext, useContext, useState, useEffect } from 'react';
import { programs } from '@/data/programs';

export interface EnrolledProgram {
  programSlug: string;
  dateEnrolled: string;
  progress: number; // 0 to 100
  completedSyllabus: string[]; // List of module names/titles completed
}

export interface User {
  name: string;
  email: string;
  phone: string;
  enrolledPrograms: EnrolledProgram[];
  wishlist: string[]; // Program slugs
  recentlyViewed: string[]; // Program slugs
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface AppContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, phone: string) => boolean; // Using email & phone as a simple login credential pair for training demo
  register: (name: string, email: string, phone: string) => boolean;
  logout: () => void;
  cart: string[]; // Program slugs
  addToCart: (slug: string) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  isInCart: (slug: string) => boolean;
  wishlist: string[]; // Program slugs
  toggleWishlist: (slug: string) => void;
  isInWishlist: (slug: string) => boolean;
  checkout: () => boolean;
  recentlyViewed: string[];
  addRecentlyViewed: (slug: string) => void;
  updateCourseProgress: (slug: string, moduleName: string, isCompleted: boolean) => void;
  notifications: AppNotification[];
  addNotification: (title: string, message: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // 1. Initial Load of Session & Data
  useEffect(() => {
    const activeEmail = localStorage.getItem('oxford_active_user');
    const savedUsers = localStorage.getItem('oxford_users');
    const usersList: User[] = savedUsers ? JSON.parse(savedUsers) : [];

    if (activeEmail) {
      const user = usersList.find((u) => u.email.toLowerCase() === activeEmail.toLowerCase());
      if (user) {
        setCurrentUser(user);
      }
    }

    // Load Cart
    const savedCart = localStorage.getItem('oxford_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    // Load Notifications
    const savedNotifications = localStorage.getItem('oxford_notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    } else {
      // Default welcome notification
      const defaultNotif: AppNotification = {
        id: '1',
        title: 'Welcome to Oxford College',
        message: 'Start exploring our premium language courses and professional training programs!',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        read: false,
      };
      setNotifications([defaultNotif]);
      localStorage.setItem('oxford_notifications', JSON.stringify([defaultNotif]));
    }

    setIsLoading(false);
  }, []);

  // 2. Helper to sync updated user back to users list and state
  const syncUserUpdate = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    const savedUsers = localStorage.getItem('oxford_users');
    const usersList: User[] = savedUsers ? JSON.parse(savedUsers) : [];
    const index = usersList.findIndex((u) => u.email.toLowerCase() === updatedUser.email.toLowerCase());
    if (index !== -1) {
      usersList[index] = updatedUser;
      localStorage.setItem('oxford_users', JSON.stringify(usersList));
    }
  };

  // 3. Auth Actions
  const login = (email: string, phone: string): boolean => {
    const savedUsers = localStorage.getItem('oxford_users');
    const usersList: User[] = savedUsers ? JSON.parse(savedUsers) : [];
    
    // For a user-friendly demo, we validate using email and phone
    const user = usersList.find(
      (u) => 
        u.email.toLowerCase() === email.trim().toLowerCase() && 
        u.phone.replace(/[\s-]/g, '') === phone.replace(/[\s-]/g, '')
    );

    if (user) {
      setCurrentUser(user);
      localStorage.setItem('oxford_active_user', user.email);
      
      // Add notification for login
      addNotification(
        'Login Successful',
        `Welcome back, ${user.name}! You have successfully logged into the student portal.`
      );
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, phone: string): boolean => {
    const savedUsers = localStorage.getItem('oxford_users');
    const usersList: User[] = savedUsers ? JSON.parse(savedUsers) : [];

    const exists = usersList.some((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (exists) return false;

    const newUser: User = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      enrolledPrograms: [],
      wishlist: [],
      recentlyViewed: [],
    };

    usersList.push(newUser);
    localStorage.setItem('oxford_users', JSON.stringify(usersList));
    setCurrentUser(newUser);
    localStorage.setItem('oxford_active_user', newUser.email);

    // Initial enrollment for demo: Automatically enroll in Practical English as a trial (optional, let's keep it empty or auto-enroll)
    addNotification(
      'Account Created',
      `Welcome to Oxford College, ${newUser.name}! Your student account is now active.`
    );

    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('oxford_active_user');
  };

  // 4. Cart Actions
  const addToCart = (slug: string) => {
    if (!cart.includes(slug)) {
      const updatedCart = [...cart, slug];
      setCart(updatedCart);
      localStorage.setItem('oxford_cart', JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (slug: string) => {
    const updatedCart = cart.filter((s) => s !== slug);
    setCart(updatedCart);
    localStorage.setItem('oxford_cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('oxford_cart');
  };

  const isInCart = (slug: string) => cart.includes(slug);

  // 5. Wishlist Actions
  const toggleWishlist = (slug: string) => {
    if (!currentUser) {
      // If logged out, store in standard local state or prompt login
      return;
    }
    const currentWishlist = currentUser.wishlist || [];
    let updatedWishlist: string[];

    if (currentWishlist.includes(slug)) {
      updatedWishlist = currentWishlist.filter((s) => s !== slug);
    } else {
      updatedWishlist = [...currentWishlist, slug];
      // Add notification
      const prog = programs.find((p) => p.slug === slug);
      if (prog) {
        addNotification('Course Wishlisted', `"${prog.title}" has been added to your wishlist.`);
      }
    }

    const updatedUser = {
      ...currentUser,
      wishlist: updatedWishlist,
    };
    syncUserUpdate(updatedUser);
  };

  const isInWishlist = (slug: string) => {
    if (!currentUser) return false;
    return (currentUser.wishlist || []).includes(slug);
  };

  // 6. Checkout / Enrollment
  const checkout = (): boolean => {
    if (!currentUser) return false;
    if (cart.length === 0) return false;

    const currentEnrollments = [...currentUser.enrolledPrograms];
    
    cart.forEach((slug) => {
      // Check if already enrolled
      if (!currentEnrollments.some((e) => e.programSlug === slug)) {
        const newEnrollment: EnrolledProgram = {
          programSlug: slug,
          dateEnrolled: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          progress: 0,
          completedSyllabus: [],
        };
        currentEnrollments.push(newEnrollment);

        // Notify
        const prog = programs.find((p) => p.slug === slug);
        if (prog) {
          addNotification(
            'Enrollment Confirmed',
            `Congratulations! You have successfully enrolled in "${prog.title}".`
          );
        }
      }
    });

    const updatedUser = {
      ...currentUser,
      enrolledPrograms: currentEnrollments,
    };

    syncUserUpdate(updatedUser);
    clearCart();
    return true;
  };

  // 7. Recently Viewed
  const addRecentlyViewed = (slug: string) => {
    if (!currentUser) return;
    const currentList = currentUser.recentlyViewed || [];
    const filteredList = currentList.filter((s) => s !== slug);
    const updatedList = [slug, ...filteredList].slice(0, 4); // Keep last 4

    const updatedUser = {
      ...currentUser,
      recentlyViewed: updatedList,
    };
    syncUserUpdate(updatedUser);
  };

  // 8. Progress Tracker
  const updateCourseProgress = (slug: string, moduleName: string, isCompleted: boolean) => {
    if (!currentUser) return;

    const enrolled = currentUser.enrolledPrograms.map((ep) => {
      if (ep.programSlug === slug) {
        let completed = [...ep.completedSyllabus];
        if (isCompleted && !completed.includes(moduleName)) {
          completed.push(moduleName);
        } else if (!isCompleted && completed.includes(moduleName)) {
          completed = completed.filter((m) => m !== moduleName);
        }

        // Find course syllabus length to compute percentage
        const prog = programs.find((p) => p.slug === slug);
        const totalModules = prog?.syllabus.length || 1;
        const progressPercentage = Math.round((completed.length / totalModules) * 100);

        // Send achievement badges notification if course complete
        if (progressPercentage === 100 && ep.progress < 100) {
          addNotification(
            'Course Completed! 🎉',
            `Outstanding achievement! You have completed 100% of "${prog?.title}". Certificate unlocked!`
          );
        }

        return {
          ...ep,
          completedSyllabus: completed,
          progress: progressPercentage,
        };
      }
      return ep;
    });

    const updatedUser = {
      ...currentUser,
      enrolledPrograms: enrolled,
    };
    syncUserUpdate(updatedUser);
  };

  // 9. Notification Center
  const addNotification = (title: string, message: string) => {
    const newNotif: AppNotification = {
      id: Date.now().toString(),
      title,
      message,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      read: false,
    };

    setNotifications((prev) => {
      const updated = [newNotif, ...prev];
      localStorage.setItem('oxford_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      localStorage.setItem('oxford_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      localStorage.setItem('oxford_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const clearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('oxford_notifications');
  };

  // Derived Values
  const activeWishlist = currentUser ? currentUser.wishlist : [];
  const activeRecentlyViewed = currentUser ? currentUser.recentlyViewed : [];

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isLoading,
        login,
        register,
        logout,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        wishlist: activeWishlist,
        toggleWishlist,
        isInWishlist,
        checkout,
        recentlyViewed: activeRecentlyViewed,
        addRecentlyViewed,
        updateCourseProgress,
        notifications,
        addNotification,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
