import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

function Demo() {
  
  const { t, i18n } = useTranslation();

  // State for managing the current language
  const [,setLanguage] = useState<string>(i18n.language || 'en');

  // Function to change the language
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  const navigate = useNavigate();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
      <Button onClick={() => navigate("/create-account-buyer")}>Create Account</Button>
      <Button onClick={() => navigate("/create-account-seller")}>Become a Seller</Button>
      <Button onClick={() => navigate("/create-product")}>New Product</Button>
      <div>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('es')}>Español</button>
        <button onClick={() => changeLanguage('fr')}>Français</button>
      </div>
    </div>
  );
}

export default Demo;