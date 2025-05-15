import { Route, Routes, BrowserRouter } from 'react-router-dom';
import CreateAccountForm from './pages/buyer/create-account/buyer-registration';
import Verification from './pages/buyer/create-account/verification';
import Login from './pages/auth/login';
import SellerRegistration from './pages/seller/create-seller/seller-registration';
import AddProductForm from './pages/product/create-product/NewProduct';
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
import { AccountCreated } from './pages/seller/create-seller/SuccessPage';
import NoMatch from './pages/no-match/NoMatch';
import BuyerProtectedRoute from './utils/BuyerProtectedRoute';
import SellerProtectedRoute from './utils/SellerProtectedRoute';
import HeroUi from './pages/landingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* others */}
        <Route path="/" element={<HeroUi />} />
        <Route path="/create-account-buyer" element={<CreateAccountForm />} />
        <Route path="/verification" element={<Verification />} />

        {/* login */}
        <Route path="/login" element={<Login />} />

        {/* buyer */}
        <Route path="/buyer" element={<BuyerProtectedRoute />}>
          <Route index element={<DealDashboard />} />
          <Route path="seller-profile" element={<ProfilePage />} />
          <Route path="profile" element={<BProfile />} />
          <Route path="profile/saved-cards" element={<SavedCard />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="add-card" element={<AddCardPage />} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="track-orders" element={<TrackOrders />} />
          <Route path="track-orders/:id" element={<OrderDetails />} />
          <Route path="followed-vendors" element={<FollowedVendors />} />
          <Route path="search" element={<RecommendedPage />} />
          <Route path="deals/:name" element={<DealDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="congratulations" element={<CongratulationsPage />} />
          <Route path="create-account-seller" element={<SellerRegistration />} />
          <Route path="create-account-seller/account-created" element={<AccountCreated />} />
          <Route path="*" element={<NoMatch />} />
        </Route>

        {/* seller */}
        <Route path="/seller" element={<SellerProtectedRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="products/:name" element={<ProductDetail />} />
          <Route path="sales-report" element={<SalesReport />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/pending/:name" element={<PendingOrderDetail />} />
          <Route path="orders/delivered/:name" element={<DeliveredOrderDetail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="products/ratings" element={<Rating />} />
          <Route path="create-product" element={<AddProductForm />} />
          {/* <Route path="create-product/add-images" element={<AddImagesForm />} />
          <Route path="create-product/delivery-option" element={<DeliveryOptionForm />} />
          <Route path="create-product/preview" element={<ProductPreview />} /> */}
          <Route path="create-product/success" element={<ProductCreationSuccess />} />
          <Route path="*" element={<NoMatch />} />
        </Route>

        {/* Using path="*"" means "match anything", so this route
          acts like a catch-all for URLs that we don't have explicit
          routes for. */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;