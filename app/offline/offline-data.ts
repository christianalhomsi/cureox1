export type OfflineProduct = {
  id: string;
  i18nKey: string;
  image: string;
  annualPrice: number;
};

const offlineProducts: OfflineProduct[] = [
  {
    id: 'dental-offline',
    i18nKey: 'dentalOffline',
    image: '/images/Dentist.jpg',
    annualPrice: 1200
  },
  {
    id: 'pharmacy-offline',
    i18nKey: 'pharmacyOffline',
    image: '/images/Pharmacy.png',
    annualPrice: 1200
  },
  {
    id: 'medical-offline',
    i18nKey: 'medicalOffline',
    image: '/images/Doctor.jpg',
    annualPrice: 1200
  }
];

export function getOfflineProductById(id: string): OfflineProduct | undefined {
  return offlineProducts.find((p) => p.id === id);
}
