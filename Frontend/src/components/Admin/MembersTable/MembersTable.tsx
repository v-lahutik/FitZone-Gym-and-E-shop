import { useEffect, useState } from 'react';
import axios from 'axios';
import MemberForm from './MemberForm';
import { membersData } from '../../DummyData/members';

interface Address {
  streetNumber: number;
  streetName: string;
  city: string;
  country: string;
  postCode: string;
}

export interface Member {
  firstName: string;
  lastName: string;
  email: string;
  address?: Address;
  membership: 'Basic' | 'Standard' | 'Premium' | 'Staff';
  role: 'Member' | 'Admin';
  isActivated: boolean;
  id: string;
}

const MembersTable: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [filterName, setFilterName] = useState<string>('');
  const [filterMembership, setFilterMembership] = useState<string>('');
  const [filterRole, setFilterRole] = useState<string>('');
  const [filterIsActivated, setFilterIsActivated] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const membersPerPage = 20;

  useEffect(() => {
    // Fetch members data
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/admin/members');

        // Sort the data by lastName
        const sortedData = response.data.sort((a: Member, b: Member) => 
          a.lastName.localeCompare(b.lastName)
        );

        setMembers(sortedData);
        setFilteredMembers(sortedData);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error fetching members data', error.response?.data);
        } else {
          console.error('Unexpected error', error);
        }
      }
    };

    fetchMembers();
  }, []);

 // Handle opening the form (either for new member or existing member)
 const openForm = (member: Member | null) => {
    setCurrentMember(member);
    setIsFormOpen(true);
    setIsEditing(member === null); // Edit mode if new member
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setCurrentMember(null);
    setIsEditing(false);
  };


  useEffect(() => {
    let filtered = members;

    if (filterName) {
      filtered = members.filter((member) => {
        return (
          member.firstName.toLowerCase().includes(filterName.toLowerCase()) ||
          member.lastName.toLowerCase().includes(filterName.toLowerCase())
        );
      });
    }
    if (filterMembership) {
      filtered = members.filter((member) => {
        return member.membership === filterMembership;
      });
    }

    // if (filterRole) {
    //   filtered = members.filter((member) => {
    //     return member.role === filterRole;
    //   });
    // }

    if (filterIsActivated) {
      filtered = members.filter((member) => {
       if (filterIsActivated.toLowerCase() === 'active') return member.isActivated;
        if (filterIsActivated.toLowerCase() === 'inactive') return !member.isActivated;
      });
    }
    setFilteredMembers(filtered);
    setCurrentPage(1);
  }, [filterName, filterMembership, filterIsActivated, filterRole, members]);

  //calculate the number of pages
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const displayedMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  //pagination
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-white">Members Table</h2>

      {/* Filter Inputs */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Filter by name"
          className="border border-gray-300 rounded px-2 py-1"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />

        <select
          value={filterMembership}
          onChange={(e) => setFilterMembership(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="">Filter by membership</option>
          <option value="Basic">Basic</option>
          <option value="Standard">Standard</option>
          <option value="Premium">Premium</option>
          <option value="Staff">Staff</option>
        </select>

        <select
          value={filterIsActivated}
          onChange={(e) => setFilterIsActivated(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="">Filter by status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button
          onClick={() => openForm(null)}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Register New Member
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Membership
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedMembers.map((member) => (
              <tr key={member.id} onClick={() => openForm(member)} className="border-t border-gray-300 cursor-pointer">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {member.lastName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {member.firstName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {member.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {member.address
                    ? `${member.address.streetNumber} ${member.address.streetName}, ${member.address.city}, ${member.address.country}, ${member.address.postCode}`
                    : 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {member.membership}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {member.role}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {member.isActivated ? 'Active' : 'Inactive'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <div className="flex justify-between mt-4">
        <button
     
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded text-gray-300 ${
            currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`px-4 py-2 border rounded text-gray-300 ${
            currentPage === totalPages || totalPages === 0 ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          Next
        </button>
      </div>
      {isFormOpen && (
        <MemberForm
          member={currentMember}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          closeForm={closeForm}
        />
      )}
    </div>
  );
};

export default MembersTable;



