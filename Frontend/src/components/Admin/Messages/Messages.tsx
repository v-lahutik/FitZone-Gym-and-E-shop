import React, { useEffect, useState } from 'react';
import { URL } from '../../../utils/URL';
import axios from 'axios';

import { MdLabelImportantOutline } from 'react-icons/md';
import { MdLabelImportant } from 'react-icons/md';

interface Email {
  _id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  isStarred: boolean;
  isImportant: boolean;
}

export default function Messages() {
  const [emails, setEmails] = useState<Email[]>([]);
  //const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  console.log('🚀 ~ Messages ~ emails:', emails);

  const fetchEmails = async () => {
    try {
      const response = await axios({
        url: `${URL}/admin/messages`,
        method: 'GET',
        withCredentials: true
      });
      const data: Email[] = await response.data;
      console.log('🚀 ~ fetchEmails ~ data:', data);
      setEmails(data);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const toggleImportant = async (id: string) => {
    const emailToUpdate = emails.find((email) => email._id === id);
    if (emailToUpdate) {
      const updatedImportant = !emailToUpdate.isImportant; // Toggle true/false
      try {
        await axios({
          url: `${URL}/admin/messages/${id}`,
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          data: { isImportant: updatedImportant },
          withCredentials: true
        });

        setEmails(
          emails.map((email) =>
            email._id === id
              ? { ...email, isImportant: updatedImportant }
              : email
          )
        );
      } catch (error) {
        console.error('Error updating important status:', error);
      }
    }
  };

  const toggleStarred = async (id: string) => {
    const emailToUpdate = emails.find((email) => email._id === id);

    if (emailToUpdate) {
      const updatedStarred = !emailToUpdate.isStarred; // Toggle true/false
      try {
        await axios({
          url: `${URL}/admin/messages/${id}`,
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          data: { isStarred: updatedStarred },
          withCredentials: true
        });

        setEmails(
          emails.map((email) =>
            email._id === id ? { ...email, isStarred: updatedStarred } : email
          )
        );
      } catch (error) {
        console.error('Error updating starred status:', error);
      }
    }
  };

  const handleRowClick = (id: string) => {
    console.log(id);
    setSelectedEmailId(id === selectedEmailId ? null : id); // Toggle email details view
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-6">Email Inbox</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-primary text-left text-white">
              <th className="w-[30px] py-4 px-4 text-center font-medium text-white dark:text-white">
                Important
              </th>
              <th className="w-[30px] py-4 px-4 font-medium text-center text-white dark:text-white">
                Starred
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-white dark:text-white">
                From
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-white dark:text-white">
                Date
              </th>
              <th className="py-4 px-4 font-medium text-white dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <React.Fragment key={email._id}>
                <tr
                  className={`cursor-pointer border-b hover:bg-whiten transition duration-150 ${
                    selectedEmailId === email._id ? 'bg-whiten' : ''
                  }`}
                  onClick={() => handleRowClick(email._id)}
                >
                  <td className="p-2 text-center">
                    <button
                      className={`text-xl ${email.isImportant ? 'text-yellow-500' : 'text-gray-400'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleImportant(email._id);
                      }}
                    >
                      {email.isImportant ? (
                        <MdLabelImportant />
                      ) : (
                        <MdLabelImportantOutline />
                      )}
                    </button>
                  </td>
                  <td className="p-2 text-center">
                    <button
                      className={`text-xl ${email.isStarred ? 'text-yellow-500' : 'text-gray-400'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStarred(email._id);
                      }}
                    >
                      {email.isStarred ? '★' : '☆'}
                    </button>
                  </td>
                  <td className="p-2">{email.name}</td>
                  <td className="p-2">{formatDate(email.date)}</td>
                  <td className="p-2">
                    <button className="text-blue-500 hover:underline">
                      View Details
                    </button>
                  </td>
                </tr>

                {/* Collapsible email details */}
                {selectedEmailId === email._id && (
                  <tr className="bg-gray-50">
                    <td colSpan={5} className="p-4">
                      <div className="border rounded-lg p-4 bg-white shadow-md">
                        <h3 className="text-xl font-semibold mb-2">
                          {email.name}
                        </h3>
                        <p>
                          <strong>Email:</strong> {email.email}
                        </p>
                        <p>
                          <strong>Date:</strong> {formatDate(email.date)}
                        </p>
                        <p className="mt-4">
                          <strong>Message:</strong> {email.message}
                        </p>
                        <button
                          className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-black transition duration-150"
                          onClick={() => setSelectedEmailId(null)}
                        >
                          Close Details
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
