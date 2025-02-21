import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Demo from './pages/Demo';
import CreateAccountForm from './pages/buyer/create-account/account';
import CreatePassword from './pages/buyer/create-account/create-password';
import Verification from './pages/buyer/create-account/verification';
import Login from './pages/auth/login';
import SellerRegistration from './pages/seller/create-seller/BecomeSeller';
import KYCRegistration from './pages/seller/create-seller/KYCRegistration';
import KYCRegistration1 from './pages/seller/create-seller/BVNRegistration';
import AccountCreated from './pages/seller/create-seller/SuccessPage';
import { FormProvider } from './pages/seller/create-seller/FormContent';
import AddProductForm from './pages/product/create-product/NewProduct';
import AddImagesForm from './pages/product/create-product/AddImages';
import DeliveryOptionForm from './pages/product/create-product/DeliveryOption';
import ProductPreview from './pages/product/create-product/Preview';
import ProductCreationSuccess from './pages/product/create-product/Success';
import Dashboard from './pages/seller/home/products/products';
import ProductDetail from './pages/seller/home/products/product-details';
import SalesReport from './pages/seller/home/sales/sales-report';
import Orders from './pages/seller/home/orders/order';
import PendingOrderDetail from './pages/seller/home/orders/pending-order-details';
import DeliveredOrderDetail from './pages/seller/home/orders/delivered-order-details';
import Profile from './pages/seller/home/profile/profile';
import Rating from './pages/seller/home/ratings/ratings';
import DealDashboard from './pages/buyer/home/deals/deals';
import DealDetail from './pages/buyer/home/deals/deal-details';
import { Cart } from './pages/buyer/home/cart/cart';
import { CheckoutPage } from './pages/buyer/home/cart/checkout';
import { CongratulationsPage } from './pages/buyer/home/cart/congratulations';
import ProfilePage from './pages/buyer/profile/profile';
import BProfile from './pages/buyer/profile/buyer-profile';
import WishlistPage from './pages/buyer/wishlist/wishlist';
import AddCardPage from './pages/buyer/add-card/add-card';
import NotificationPage from './pages/buyer/notifications/notifications';
import TrackOrders from './pages/buyer/track-orders/track-orders';
import OrderDetails from './pages/buyer/track-orders/order-details';
import FollowedVendors from './pages/buyer/followed-vendors/following';
import RecommendedPage from './pages/buyer/search/search';
import SavedCard from './pages/buyer/profile/saved-cards';

function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          {/* buyer */}
          <Route path="/" element={<Demo />} />
          <Route path="/create-account-buyer" element={<CreateAccountForm />} />
          <Route path="/create-password" element={<CreatePassword />} />
          <Route path="/verification" element={<Verification />} />
          
          {/*  */}
          <Route path="/buyer" element={<DealDashboard/>} />
          <Route path="/buyer/seller-profile" element={<ProfilePage/>} />
          <Route path="/buyer/profile" element={<BProfile/>} />
          <Route path="/buyer/profile/saved-cards" element={<SavedCard/>} />
          <Route path="/buyer/wishlist" element={<WishlistPage/>} />
          <Route path="/buyer/add-card" element={<AddCardPage/>} />
          <Route path="/buyer/notifications" element={<NotificationPage/>} />
          <Route path="/buyer/track-orders" element={<TrackOrders/>} />
          <Route path="/buyer/track-orders/:id" element={<OrderDetails />} />
          <Route path="/buyer/followed-vendors" element={<FollowedVendors />} />
          <Route path="/buyer/search" element={<RecommendedPage />} />
          <Route path="/deals/:name" element={<DealDetail />} />
          {/*  */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/congratulations" element={<CongratulationsPage />} />

          {/* login */}
          <Route path="/login" element={<Login />} />
          
          {/* seller */}
          <Route path="/create-account-seller" element={<SellerRegistration />} />
          <Route path="/create-account-seller/kyc-registration" element={<KYCRegistration />} />
          <Route path="/create-account-seller/bvn-registration" element={<KYCRegistration1 />} />
          <Route path="/create-account-seller/account-created" element={<AccountCreated />} />
          
          {/*  */}
          <Route path="/seller" element={<Dashboard />} />
          <Route path="/products/:name" element={<ProductDetail />} />
          {/*  */}

          <Route path="/seller/sales-report" element={<SalesReport />} />
          <Route path="/seller/orders" element={<Orders />} />
          <Route path="/orders/pending/:name" element={<PendingOrderDetail />} />
          <Route path="/orders/delivered/:name" element={<DeliveredOrderDetail />} />
          <Route path="/seller/profile" element={<Profile />} />
          <Route path="/seller/products/ratings" element={<Rating/>} />

          {/* product */}
          <Route path="/create-product" element={<AddProductForm />} />
          <Route path="/create-product/add-images" element={<AddImagesForm />} />
          <Route path="/create-product/delivery-option" element={<DeliveryOptionForm />} />
          <Route path="/create-product/preview" element={<ProductPreview />} />
          <Route path="/create-product/success" element={<ProductCreationSuccess />} />
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;