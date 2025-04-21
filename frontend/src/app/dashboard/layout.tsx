import DashboardLayout from '@/components/layout/DashboardLayout';

export const metadata = {
  title: 'Dashboard - AutoOps',
  description: 'AutoOps email automation system dashboard',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
