import './App.css'
import './index.css'
import { useState } from 'react'
import { Header } from './components/Header'
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
  const [currentPage, setCurrentPage] = useState('home');
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

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

  return (
    <div className="bg-white">
      <Header 
        onNavigate={setCurrentPage} 
        wishlistCount={wishlist.length}
        cartCount={cart.length}
        wishlist={wishlist}
        cart={cart}
        onRemoveFromWishlist={removeFromWishlist}
        onRemoveFromCart={removeFromCart}
      />
      
      {currentPage === 'home' && (
        <>
          <HomePage 
            onNavigate={setCurrentPage}
            onAddToWishlist={addToWishlist}
            onAddToCart={addToCart}
          />
          <Footer />
        </>
      )}
      
      {currentPage === 'my-account' && (
        <>
          <MyAccount onNavigate={setCurrentPage} />
          <Footer />
        </>
      )}
      
      {currentPage === 'my-information' && (
        <>
          <MyInformationDashboard />
          <Footer />
        </>
      )}
      
      {currentPage === 'my-address' && (
        <>
          <MyAddress />
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
