import { useEffect, useState } from 'react';
import axios from 'axios';
import MemberForm from './MemberForm';
import { URL } from '../../../utils/URL';
import { Member } from '../../../custom.Types/userTypes';

const MembersTable: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]); //store all members
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [filterName, setFilterName] = useState<string>('');
  const [filterMembership, setFilterMembership] = useState<string>('');
  // const [filterRole, setFilterRole] = useState<string>('');
  const [filterIsActivated, setFilterIsActivated] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentMember, setCurrentMember] = useState<Member | null>(null); //select a member to edit
  const [currentPage, setCurrentPage] = useState<number>(1);
  const membersPerPage = 20;

  useEffect(() => {
    // Fetch members data
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${URL}/admin/members`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });

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
        if (filterIsActivated.toLowerCase() === 'active')
          return member.is_activated;
        if (filterIsActivated.toLowerCase() === 'inactive')
          return !member.is_activated;
      });
    }
    setFilteredMembers(filtered);
    setCurrentPage(1);
  }, [filterName, filterMembership, filterIsActivated, members]);

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
      <h2 className="text-2xl font-semibold mb-4 text-bodydark1">Members Table</h2>

      {/* Filter Inputs */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Filter by name"
          className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 shadow-sm hover:border-gray-400"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />

        <select
          value={filterMembership}
          onChange={(e) => setFilterMembership(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 shadow-sm hover:border-gray-400"
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
          className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 shadow-sm hover:border-gray-400"
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
          <thead>
            <tr className="bg-primary text-left dark:bg-meta-4">
              <th className="px-6 py-3 text-left text-xs font-bold text-whiteColor uppercase">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-whiteColor uppercase">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-whiteColor uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-whiteColor uppercase">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-whiteColor uppercase">
                Membership
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-whiteColor uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-whiteColor uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedMembers.map((member) => (
              <tr
                key={member._id}
                onClick={() => openForm(member)}
                className="border-t border-[#eee] cursor-pointer"
              >
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
                  {member.is_activated ? 'Active' : 'Inactive'}
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
          className={`px-4 py-2 border border-blackColor3 rounded text-blackColor3 ${
            currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          Previous
        </button>
        <span className="px-4 py-2 text-blackColor3">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`px-4 py-2 border border-blackColor3 rounded text-blackColor3 ${
            currentPage === totalPages || totalPages === 0
              ? 'cursor-not-allowed opacity-50'
              : ''
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
