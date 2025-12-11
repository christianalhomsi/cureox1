'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/app/products/products-data';

type TutorialStep = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  features: string[];
  image: string;
};

const productTutorials: Record<string, TutorialStep[]> = {
  'dental-clinic-management': [
    {
      id: 'dental-chart',
      titleKey: 'dental.step1.title',
      descriptionKey: 'dental.step1.description',
      features: ['dental.step1.feature1', 'dental.step1.feature2', 'dental.step1.feature3'],
      image: '/images/Dentist.jpg'
    },
    {
      id: 'treatment-plans',
      titleKey: 'dental.step2.title',
      descriptionKey: 'dental.step2.description',
      features: ['dental.step2.feature1', 'dental.step2.feature2', 'dental.step2.feature3'],
      image: '/images/Dentist.jpg'
    },
    {
      id: 'case-photos',
      titleKey: 'dental.step3.title',
      descriptionKey: 'dental.step3.description',
      features: ['dental.step3.feature1', 'dental.step3.feature2', 'dental.step3.feature3'],
      image: '/images/Dentist.jpg'
    }
  ],
  'pharmacy-management': [
    {
      id: 'prescription-processing',
      titleKey: 'pharmacy.step1.title',
      descriptionKey: 'pharmacy.step1.description',
      features: ['pharmacy.step1.feature1', 'pharmacy.step1.feature2', 'pharmacy.step1.feature3'],
      image: '/images/Pharmacy.png'
    },
    {
      id: 'stock-lookup',
      titleKey: 'pharmacy.step2.title',
      descriptionKey: 'pharmacy.step2.description',
      features: ['pharmacy.step2.feature1', 'pharmacy.step2.feature2', 'pharmacy.step2.feature3'],
      image: '/images/Pharmacy.png'
    },
    {
      id: 'order-requests',
      titleKey: 'pharmacy.step3.title',
      descriptionKey: 'pharmacy.step3.description',
      features: ['pharmacy.step3.feature1', 'pharmacy.step3.feature2', 'pharmacy.step3.feature3'],
      image: '/images/Pharmacy.png'
    }
  ],
  'medical-clinic-management': [
    {
      id: 'patient-file-access',
      titleKey: 'clinic.step1.title',
      descriptionKey: 'clinic.step1.description',
      features: ['clinic.step1.feature1', 'clinic.step1.feature2', 'clinic.step1.feature3'],
      image: '/images/Doctor.jpg'
    },
    {
      id: 'appointment-control',
      titleKey: 'clinic.step2.title',
      descriptionKey: 'clinic.step2.description',
      features: ['clinic.step2.feature1', 'clinic.step2.feature2', 'clinic.step2.feature3'],
      image: '/images/Doctor.jpg'
    },
    {
      id: 'e-prescription-writing',
      titleKey: 'clinic.step3.title',
      descriptionKey: 'clinic.step3.description',
      features: ['clinic.step3.feature1', 'clinic.step3.feature2', 'clinic.step3.feature3'],
      image: '/images/Doctor.jpg'
    }
  ],
  'patient-companion-app': [
    {
      id: 'appointment-management',
      titleKey: 'patient.step1.title',
      descriptionKey: 'patient.step1.description',
      features: ['patient.step1.feature1', 'patient.step1.feature2', 'patient.step1.feature3'],
      image: '/images/PatientApp.jpg'
    },
    {
      id: 'digital-prescriptions',
      titleKey: 'patient.step2.title',
      descriptionKey: 'patient.step2.description',
      features: ['patient.step2.feature1', 'patient.step2.feature2', 'patient.step2.feature3'],
      image: '/images/PatientApp.jpg'
    },
    {
      id: 'medical-records-overview',
      titleKey: 'patient.step3.title',
      descriptionKey: 'patient.step3.description',
      features: ['patient.step3.feature1', 'patient.step3.feature2', 'patient.step3.feature3'],
      image: '/images/PatientApp.jpg'
    }
  ],
  'distributor-management': [
    {
      id: 'inventory-management',
      titleKey: 'distributor.step1.title',
      descriptionKey: 'distributor.step1.description',
      features: ['distributor.step1.feature1', 'distributor.step1.feature2', 'distributor.step1.feature3'],
      image: '/images/Distributor.jpg'
    },
    {
      id: 'pharmacy-supply-fulfillment',
      titleKey: 'distributor.step2.title',
      descriptionKey: 'distributor.step2.description',
      features: ['distributor.step2.feature1', 'distributor.step2.feature2', 'distributor.step2.feature3'],
      image: '/images/Distributor.jpg'
    },
    {
      id: 'monthly-reports',
      titleKey: 'distributor.step3.title',
      descriptionKey: 'distributor.step3.description',
      features: ['distributor.step3.feature1', 'distributor.step3.feature2', 'distributor.step3.feature3'],
      image: '/images/Distributor.jpg'
    }
  ]
};

export default function DemoPage() {
  const t = useTranslations('demo');
  const productCopy = useTranslations('productContent');
  
  // Helper to safely get translation using bracket notation
  const getTranslation = (key: string) => {
    try {
      // Access using bracket notation for dynamic keys
      return (t as any)(key);
    } catch (e) {
      console.error('Translation error for key:', key, e);
      return key;
    }
  };
  const searchParams = useSearchParams();
  const productParam = searchParams.get('product');

  const [selectedProduct, setSelectedProduct] = useState<string>(
    productParam && productTutorials[productParam] ? productParam : 'dental-clinic-management'
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const tutorials = productTutorials[selectedProduct] || [];
  const currentTutorial = tutorials[currentStep];
  const selectedProductData = products.find((p) => p.id === selectedProduct);
  const selectedProductName = selectedProductData
    ? productCopy(`${selectedProductData.i18nKey}.name`)
    : '';

  useEffect(() => {
    if (productParam && productTutorials[productParam]) {
      setSelectedProduct(productParam);
      setCurrentStep(0);
    }
  }, [productParam]);

  const handleProductChange = (productId: string) => {
    if (productId !== selectedProduct) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedProduct(productId);
        setCurrentStep(0);
        setIsAnimating(false);
      }, 200);
    }
  };

  const handleStepChange = (step: number) => {
    if (step !== currentStep && step >= 0 && step < tutorials.length) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(step);
        setIsAnimating(false);
      }, 200);
    }
  };

  return (
    <div className="py-24 min-h-screen">
      <div className="section-container">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full mb-4" style={{ backgroundColor: 'rgba(1, 196, 240, 0.1)', color: '#01C4F0' }}>
            {t('interactiveTutorial')}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-theme-primary">
            {t('title')}
          </h1>
          <p className="text-lg text-theme-secondary">
            {t('description')}
          </p>
        </div>

        {/* Product Selector */}
        <div className="mb-12">
          <h2 className="text-center text-sm font-medium text-theme-muted uppercase tracking-wide mb-4">
            {t('selectProduct')}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductChange(product.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedProduct === product.id
                    ? 'text-white shadow-lg'
                    : 'bg-theme-card border border-theme text-theme-secondary hover:text-theme-primary'
                }`}
                style={selectedProduct === product.id
                  ? { backgroundColor: '#0061A5', boxShadow: '0 10px 15px -3px rgba(0, 97, 165, 0.25)' }
                  : {}
                }
              >
                {productCopy(`${product.i18nKey}.name`)}
              </button>
            ))}
          </div>
        </div>

        {/* Tutorial Content */}
        <div className="max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              {tutorials.map((tutorial, index) => (
                <button
                  key={tutorial.id}
                  onClick={() => handleStepChange(index)}
                  className="flex items-center"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                      index === currentStep
                        ? 'text-white scale-110'
                        : index < currentStep
                        ? 'bg-emerald-500 text-white'
                        : 'bg-theme-card border border-theme text-theme-muted'
                    }`}
                    style={index === currentStep ? { backgroundColor: '#0061A5' } : undefined}
                  >
                    {index < currentStep ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < tutorials.length - 1 && (
                    <div
                      className={`w-12 h-1 mx-1 rounded-full transition-colors ${
                        index < currentStep ? 'bg-emerald-500' : 'bg-theme-card'
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Main Tutorial Card */}
          <div
            className={`bg-theme-card border border-theme rounded-2xl overflow-hidden shadow-xl transition-opacity duration-200 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Side */}
              <div className="relative h-64 lg:h-auto lg:min-h-[400px]">
                <img
                  src={currentTutorial?.image}
                  alt={selectedProductName}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                    {t('step')} {currentStep + 1} {t('of')} {tutorials.length}
                  </span>
                </div>
              </div>

              {/* Content Side */}
              <div className="p-6 lg:p-8 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-theme-primary">
                    {currentTutorial?.titleKey ? getTranslation(currentTutorial.titleKey) : ''}
                  </h3>
                  <p className="text-theme-secondary mb-6">
                    {currentTutorial?.descriptionKey ? getTranslation(currentTutorial.descriptionKey) : ''}
                  </p>

                  {/* Feature List */}
                  <div className="space-y-3">
                    {currentTutorial?.features.map((featureKey, index) => (
                      <div
                        key={featureKey}
                        className="flex items-start gap-3 p-3 bg-[var(--bg-secondary)] rounded-lg"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(1, 196, 240, 0.1)' }}>
                          <svg className="w-4 h-4" style={{ color: '#01C4F0' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-theme-secondary">{getTranslation(featureKey)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-theme">
                  <button
                    onClick={() => handleStepChange(currentStep - 1)}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-theme-secondary hover:text-theme-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t('previous')}
                  </button>

                  {currentStep < tutorials.length - 1 ? (
                    <button
                      onClick={() => handleStepChange(currentStep + 1)}
                      className="flex items-center gap-2 px-6 py-2.5 text-white text-sm font-medium rounded-lg transition-colors"
                      style={{ backgroundColor: '#0061A5' }}
                    >
                      {t('next')}
                      <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={{ pathname: '/checkout', query: { product: selectedProduct } }}
                      className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      {t('startSubscription')}
                      <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={`/products/${selectedProduct}`}
              className="flex items-center gap-2 px-5 py-2.5 bg-theme-card border border-theme text-theme-secondary hover:text-theme-primary rounded-lg text-sm font-medium transition-all hover:border-[#01C4F0]/50"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('viewProductDetails')}
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-5 py-2.5 bg-theme-card border border-theme text-theme-secondary hover:text-theme-primary rounded-lg text-sm font-medium transition-all hover:border-[#01C4F0]/50"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {t('requestLiveDemo')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
