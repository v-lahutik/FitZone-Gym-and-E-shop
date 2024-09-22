import React, { useState } from 'react';
import { Member } from './MembersTable'; // Import the Member interface

interface MemberFormProps {
  member: Member | null;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  closeForm: () => void;
}

const MemberForm: React.FC<MemberFormProps> = ({
  member,
  isEditing,
  setIsEditing,
  closeForm
}) => {
  const URL = import.meta.env.VITE_URL as string;
  const [localMember, setLocalMember] = useState<Member>(
    member || {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      address: {
        streetNumber: 0,
        streetName: '',
        city: '',
        country: '',
        postCode: ''
      },
      membership: 'Basic',
      role: 'Member',
      isActivated: false
    }
  );

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocalMember({ ...localMember, [name]: value });
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setLocalMember({ ...localMember, [name]: checked });
  };

  // Handle form submission (register or update)
  const handleSaveChanges = () => {
    if (localMember) {
      if (window.confirm('Are you sure you want to save changes?')) {
        fetch(`${URL}/admin/update/${localMember.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(localMember)
        })
          .then(() => {
            alert('Member updated successfully!');
            closeForm();
          })
          .catch((err) => console.error('Error updating member:', err));
      }
    }
  };

  // Handle registering a new member
  const handleRegister = () => {
    if (localMember) {
      if (window.confirm('Are you sure you want to register this member?')) {
        fetch(`${URL}/admin/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(localMember)
        })
          .then(() => {
            alert('Member registered successfully!');
            closeForm();
          })
          .catch((err) => console.error('Error registering member:', err));
      }
    }
  };

  // Handle deleting a member
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      fetch(`${URL}/admin/delete/${localMember.id}`, { method: 'DELETE' })
        .then(() => {
          alert('Member deleted successfully!');
          closeForm();
        })
        .catch((err) => console.error('Error deleting member:', err));
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded w-1/3">
        <div className="flex justify-between items-center">
          <h3 className="text-xl">
            {member ? 'Member Details' : 'Register New Member'}
          </h3>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500"
            >
              Edit
            </button>
          )}
          <button onClick={closeForm} className="text-red-500">
            Close
          </button>
        </div>
        <div className="mt-4">
          {/* First Name */}
          <label>First Name</label>
          <input
            name="firstName"
            type="text"
            value={localMember.firstName}
            disabled={!isEditing}
            onChange={handleChange}
            className="w-full border px-2 py-1"
          />

          {/* Last Name */}
          <label>Last Name</label>
          <input
            name="lastName"
            type="text"
            value={localMember.lastName}
            disabled={!isEditing}
            onChange={handleChange}
            className="w-full border px-2 py-1"
          />

          {/* Email */}
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={localMember.email}
            disabled={!isEditing}
            onChange={handleChange}
            className="w-full border px-2 py-1"
          />

          {/* Address */}
          <label>Street Name</label>
          <input
            name="streetName"
            type="text"
            value={localMember.address?.streetName || ''}
            disabled={!isEditing}
            onChange={(e) =>
              setLocalMember({
                ...localMember,
                address: { ...localMember.address, streetName: e.target.value }
              })
            }
            className="w-full border px-2 py-1"
          />

          <label>Street Number</label>
          <input
            name="streetNumber"
            type="number"
            value={localMember.address?.streetNumber || ''}
            disabled={!isEditing}
            onChange={(e) =>
              setLocalMember({
                ...localMember,
                address: {
                  ...localMember.address,
                  streetNumber: +e.target.value
                }
              })
            }
            className="w-full border px-2 py-1"
          />

          <label>City</label>
          <input
            name="city"
            type="text"
            value={localMember.address?.city || ''}
            disabled={!isEditing}
            onChange={(e) =>
              setLocalMember({
                ...localMember,
                address: { ...localMember.address, city: e.target.value }
              })
            }
            className="w-full border px-2 py-1"
          />

          <label>Country</label>
          <input
            name="country"
            type="text"
            value={localMember.address?.country || ''}
            disabled={!isEditing}
            onChange={(e) =>
              setLocalMember({
                ...localMember,
                address: { ...localMember.address, country: e.target.value }
              })
            }
            className="w-full border px-2 py-1"
          />

          <label>Post Code</label>
          <input
            name="postCode"
            type="text"
            value={localMember.address?.postCode || ''}
            disabled={!isEditing}
            onChange={(e) =>
              setLocalMember({
                ...localMember,
                address: { ...localMember.address, postCode: e.target.value }
              })
            }
            className="w-full border px-2 py-1"
          />

          {/* Membership */}
          <label>Membership</label>
          <select
            name="membership"
            value={localMember.membership}
            disabled={!isEditing}
            onChange={handleChange}
            className="w-full border px-2 py-1"
          >
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
            <option value="Staff">Staff</option>
          </select>

          {/* Role */}
          <label>Role</label>
          <select
            name="role"
            value={localMember.role}
            disabled={!isEditing}
            onChange={handleChange}
            className="w-full border px-2 py-1"
          >
            <option value="Member">Member</option>
            <option value="Admin">Admin</option>
          </select>

          {/* Active */}
          <label className="flex items-center mt-2">
            <input
              name="isActive"
              type="checkbox"
              checked={localMember.isActive}
              disabled={!isEditing}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            Active
          </label>

          <div className="flex justify-end mt-4">
            {isEditing && member ? (
              <>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                >
                  Delete Member
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </>
            ) : null}

            {!member && (
              <button
                onClick={handleRegister}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Register Member
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberForm;
