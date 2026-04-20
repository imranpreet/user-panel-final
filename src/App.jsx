import './App.css'
import './index.css'
import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { LoginPage } from './components/LoginPage'
import { HomePage } from './components/HomePage'
import { MyAccount } from './components/MyAccount'
import { MyInformationDashboard } from './components/MyInformationDashboard'
import { MyAddress } from './components/MyAddress'
import { MyPurchases } from './components/MyPurchases'
import { FeaturedExhibition } from './components/FeaturedExhibition'
import { BestsellerProducts } from './components/BestsellerProducts'
import { ArtworkGallery } from './components/ArtworkGallery'
import { FeaturedArtists } from './components/FeaturedArtists'
import { AllExpertsPage } from './components/AllExpertsPage'
import { AllArtworks } from './components/AllArtworks'
import { ArtifactsGallery } from './components/ArtifactsGallery'
import { CheckoutPage } from './components/CheckoutPage'
import { ConversationsSection } from './components/ConversationsSection'
import { GalleriesSection } from './components/GalleriesSection'
import { CollectionsSection } from './components/CollectionsSection'
import { Footer } from './components/Footer'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('my-information');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  // Check for logged-in user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentPage('my-information');
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const addToWishlist = (item) => {
    setWishlist(prev => {
      const exists = prev.find(w => w.id === item.id);
      if (exists) {
        return prev.filter(w => w.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(c => c.id === item.id);
      if (exists) {
        return prev.map(c => 
          c.id === item.id 
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(c => c.id !== itemId));
  };

  const removeFromWishlist = (itemId) => {
    setWishlist(prev => prev.filter(w => w.id !== itemId));
  };

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="bg-white">
      <Header 
        onNavigate={setCurrentPage} 
        onLogout={handleLogout}
        currentUser={currentUser}
        onSidebarToggle={handleToggleSidebar}
        wishlistCount={wishlist.length}
        cartCount={cart.length}
        wishlist={wishlist}
        cart={cart}
        onRemoveFromWishlist={removeFromWishlist}
        onRemoveFromCart={removeFromCart}
      />
      
      {currentPage === 'my-account' && (
        <>
          <MyAccount onNavigate={setCurrentPage} />
          <Footer />
        </>
      )}
      
      {currentPage === 'my-information' && (
        <>
          <MyInformationDashboard currentUser={currentUser} sidebarOpen={sidebarOpen} onSidebarToggle={handleToggleSidebar} />
          <Footer />
        </>
      )}
      
      {currentPage === 'my-purchases' && (
        <>
          <MyPurchases onNavigate={setCurrentPage} />
          <Footer />
        </>
      )}
      
      
      {currentPage === 'creative-hub' && (
        <>
          <FeaturedExhibition />
          <BestsellerProducts onNavigate={setCurrentPage} />
          <ArtworkGallery onNavigate={setCurrentPage} />
          <FeaturedArtists onNavigate={setCurrentPage} />
          <GalleriesSection />
          <CollectionsSection />
          <ConversationsSection />
          <Footer />
        </>
      )}

      {currentPage === 'all-experts' && (
        <>
          <AllExpertsPage onNavigate={setCurrentPage} />
          <Footer />
        </>
      )}

      {currentPage === 'all-exhibitions' && (
        <>
          <ExhibitionsPage onNavigate={setCurrentPage} />
          <Footer />
        </>
      )}

      {currentPage === 'all-artworks' && (
        <>
          <AllArtworks 
            onNavigate={setCurrentPage} 
            onAddToWishlist={addToWishlist}
            onAddToCart={addToCart}
          />
          <Footer />
        </>
      )}

      {currentPage === 'artifacts-gallery' && (
        <>
          <ArtifactsGallery isFullPage={true} onNavigate={setCurrentPage} />
          <Footer />
        </>
      )}

      {currentPage === 'checkout' && (
        <CheckoutPage 
          onNavigate={setCurrentPage} 
          cart={cart}
          onRemoveFromCart={removeFromCart}
        />
      )}
    </div>
  )
}

export default App
