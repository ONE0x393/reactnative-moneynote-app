import React from 'react';
import TermsContent from '../components/TermsContent';
import AgreeButton from '../components/AgreeButton';
import './TermsPage.css';
import { useNavigate } from 'react-router-dom';

function TermsPage() {
  

  return (
    <div className="termspage">
      <Header />
      <TermsContent />
      <AgreeButton />
    </div>
  );
}

export default TermsPage;