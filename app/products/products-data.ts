export type Product = {
  id: string;
  i18nKey: 'dental' | 'pharmacy' | 'medical' | 'patient' | 'distributor';
  image: string;
  annualPrice: number;
};

export const products: Product[] = [
  {
    id: 'dental-clinic-management',
    i18nKey: 'dental',
    image: '/images/Dentist.jpg',
    annualPrice: 29
  },
  {
    id: 'pharmacy-management',
    i18nKey: 'pharmacy',
    image: '/images/Pharmacy.png',
    annualPrice: 29
  },
  {
    id: 'medical-clinic-management',
    i18nKey: 'medical',
    image: '/images/Doctor.jpg',
    annualPrice: 29
  },
  {
    id: 'patient-companion-app',
    i18nKey: 'patient',
    image: '/images/Patient.jpg',
    annualPrice: 29
  },
  {
    id: 'distributor-management',
    i18nKey: 'distributor',
    image: '/images/Distributor.jpg',
    annualPrice: 29
  }
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

