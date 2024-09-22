import Header from '../../components/Header/Header';
import MembersTable from '../../components/Admin/MembersTable/MembersTable';

const AdminPage: React.FC = () => {
  return (
    <div>
      <Header menuItems={['Members', 'Courses', 'Shop', 'Dashboard']} />
      <MembersTable />
    </div>
  );
};

export default AdminPage;
