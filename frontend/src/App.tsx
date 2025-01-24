import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Demo from './pages/Demo';
import CreateAccountForm from './pages/buyer/create-account/account';
import CreatePassword from './pages/buyer/create-account/create-password';
import Verification from './pages/buyer/create-account/verification';
import Login from './pages/buyer/auth/login';
import SellerRegistration from './pages/seller/BecomeSeller';
import KYCRegistration from './pages/seller/KYCRegistration';
import KYCRegistration1 from './pages/seller/BVNRegistration';
import AccountCreated from './pages/seller/SuccessPage';
import { FormProvider } from './pages/seller/FormContent';
import AddProductForm from './pages/product/NewProduct';
import AddImagesForm from './pages/product/AddImages';
import DeliveryOptionForm from './pages/product/DeliveryOption';
import ProductPreview from './pages/product/Preview';
import ProductCreationSuccess from './pages/product/Success';

function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Demo />} />
          <Route path="/create-account-buyer" element={<CreateAccountForm />} />
          <Route path="/create-password" element={<CreatePassword />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account-seller" element={<SellerRegistration />} />
          <Route path="/create-account-seller/kyc-registration" element={<KYCRegistration />} />
          <Route path="/create-account-seller/bvn-registration" element={<KYCRegistration1 />} />
          <Route path="/create-account-seller/account-created" element={<AccountCreated />} />
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