import Header from '../../components/Header/Header';
import MembersTable from '../../components/Admin/MembersTable/MembersTable';
// import CourseTable from '../../components/Admin/CourseTable/CourseTable';

const AdminPage: React.FC = () => {
  return (
    <div>
      <Header menuItems={['Members', 'Courses', 'Shop', 'Dashboard']} />
      <MembersTable />
      {/* <CourseTable /> */}
    </div>
  );
};

export default AdminPage;
