
import useRole from '../../../hooks/useRole';
import Loading from '../../../components/Loading/Loading';
import AdminDashboardHome from './AdminDashboardHome';
import { UserDashboardHome } from './UserDashboardHome';
import DecoratorDashboardHome from './DecoratorDashboardHome';





const Dashboard = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <Loading />
      </div>
    );
  }

 
  if (role === 'admin') {
    return <AdminDashboardHome />;
  } else if (role === 'decorator') {
    return <DecoratorDashboardHome />;
  } else {
   
    return <UserDashboardHome />;
  }
};

export default Dashboard;