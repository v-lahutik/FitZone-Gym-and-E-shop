import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { URL } from '../../../utils/URL';
import { UserContext } from '../../../context/UserContext';

const UserProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('UserContext must be used within a UserProvider');
  }
  const { user } = userContext;

  // validate in frontend for password change
  const validatePasswordChange = (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    const errors: string[] = [];

    if (!currentPassword) {
      errors.push('Current password is required.');
    }

    if (!newPassword) {
      errors.push('New password is required.');
    } else {
      if (newPassword.length < 5) {
        errors.push('New password must be at least 5 characters long.');
      }
      if (!/\d/.test(newPassword)) {
        errors.push('New password must contain at least one number.');
      }
      if (!/[A-Z]/.test(newPassword)) {
        errors.push('New password must contain at least one uppercase letter.');
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
        errors.push(
          'New password must contain at least one special character.'
        );
      }
    }
    if (!confirmPassword) {
      errors.push('Please confirm your new password.');
    } else if (newPassword !== confirmPassword) {
      errors.push('Passwords do not match.');
    }

    return errors;
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessages([]);
    setSuccessMessage('');

    const validationErrors = validatePasswordChange(
      currentPassword,
      newPassword,
      confirmPassword
    );

    if (validationErrors.length > 0) {
      setErrorMessages(validationErrors); // Set the errors to the state
      return;
    }

    try {
      const response = await axios.post(
        `${URL}/users/changePassword`,
        {
          currentPassword,
          newPassword,
          confirmPassword
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );


      setSuccessMessage('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error(
        'Error changing password:',
        error.response ? error.response.data : error
      );
      setErrorMessages(['Current password incorrect']); // Set generic error message
    }
  };

  // Clear success message when the modal opens
  useEffect(() => {
    if (isModalOpen) {
      setSuccessMessage(''); // Clear the success message when the modal opens
    }
  }, [isModalOpen]);

  if (!user) {
    return <p>No user data available</p>;
  }

  return (
    <div className="h-max max-w-2xl mx-4 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-3xl sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 mb-16 bg-white shadow-xl rounded-lg text-gray-900">
      {/* Background image */}
      <div className="rounded-t-lg h-44 overflow-hidden">
        <img
          className="object-cover object-top w-full"
          src="https://res.cloudinary.com/dqwwj6av8/image/upload/v1727790406/freepik-export-20241001134541vC8b_qwa2jg.jpg"
          alt="Background"
        />
      </div>

      {/* Profile picture */}
      <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img
          className="object-cover object-center h-32"
          src={
            user.profilePic ||
            'https://i.pinimg.com/736x/c5/ab/41/c5ab41e3f9766798af79b40d535f45e0.jpg'
          }
          alt="Profile"
          // Fallback image if the profile picture is not available or invalid
          onError={(e) => {
            e.currentTarget.src =
              'https://i.pinimg.com/736x/c5/ab/41/c5ab41e3f9766798af79b40d535f45e0.jpg';
          }}
        />
      </div>

      {/* User's name and email */}
      <div className="text-center mt-2">
        <p className="text-gray-500"> {user.role}</p>
        <br />
        <h2 className="font-semibold">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-500">{user.email}</p>
      </div>

      {/* Membership  */}
      <div className="text-center mt-2">
        <h3 className="font-semibold">Membership: </h3>
        <p className="text-gray-500"> {user.membership} </p>
      </div>

      {/* Address */}
      <div className="mt-4 text-center">
        <h4 className="font-semibold">Address:</h4>
        {/* Optional chaining (?.) checks if 'address' is null or undefined.
         If it is, it returns 'null' instead of throwing an error. */}
        <p className="text-gray-500">
          {user.address?.streetNumber} {user.address?.streetName},{' '}
          {user.address?.city}, {user.address?.postCode},{' '}
          {user.address?.country}
        </p>
      </div>

      {/* Change password */}
      <div className="p-4 border-t mx-8 mt-2">
        <button
          className="w-1/2 block mx-auto rounded-full bg-primary hover:shadow-lg font-semibold text-white px-6 py-2"
          onClick={() => setIsModalOpen(true)}
        >
          Change Password
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              &times; {/* This represents a close "X" */}
            </button>

            <h2 className="text-lg font-semibold">Change password form</h2>

            {/* Success Message */}
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}

            <form onSubmit={handleChangePassword}>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />

                {errorMessages.length > 0 &&
                  errorMessages[0].includes('Current password') && (
                    <p className="block text-sm font-medium text-red-500 mt-2">
                      {errorMessages[0]}
                    </p>
                  )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                {/* Display the first error for new password */}
                {errorMessages.length > 0 &&
                  errorMessages[0].includes('New password') && (
                    <p className="block text-sm font-medium text-red-500 mt-2">
                      {errorMessages[0]}
                    </p>
                  )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                {errorMessages.length > 0 &&
                  (errorMessages[0].includes('Please confirm') ||
                    errorMessages[0].includes('Passwords do not match')) && (
                    <p className="block text-sm font-medium text-red-500 mt-2">
                      {errorMessages[0]}
                    </p>
                  )}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Change Password
                </button>
              </div>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  className="text-gray-500 underline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
