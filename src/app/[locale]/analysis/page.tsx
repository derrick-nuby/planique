import RepositoryTable from '@/features/repositories/components/RepositoryTable';
import { useTranslations } from 'next-intl';

export default function AnalysisPage() {
  const t = useTranslations('analysis');

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <RepositoryTable />
    </div>
  );
}
