import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Demo() {
  const { t, i18n } = useTranslation();

  // State for managing the current language
  const [,setLanguage] = useState<string>(i18n.language || 'en');

  // Function to change the language
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
      
      <div>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('es')}>Español</button>
        <button onClick={() => changeLanguage('fr')}>Français</button>
      </div>
    </div>
  );
}

export default Demo;