import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../../utils/URL';
import { FiUsers } from 'react-icons/fi';
import { FiBook } from 'react-icons/fi';
import { LuBookTemplate } from 'react-icons/lu';
import { MdOutlineCategory } from 'react-icons/md';
import { LuPackageCheck } from 'react-icons/lu';
import { CiDumbbell } from 'react-icons/ci';

interface Collections {
  users: [];
  products: [];
  courses: [];
  categories: [];
  courseTemplates: [];
  orders: [];
}

const Dashboard: React.FC = () => {
  const [collections, setCollections] = useState<Collections>({
    users: [],
    products: [],
    courses: [],
    categories: [],
    courseTemplates: [],
    orders: []
  });
  useEffect(() => {
    getAllCollections();
  }, []);

  const getAllCollections = async () => {
    try {
      const res = await axios.get(`${URL}/admin/fetchAllDatabase`,{
        headers:{'Content-Type': 'application/json'},
        withCredentials:true
      });
      setCollections(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="m-2 p-2">
      <h1 className="text-3xl font-bold mx-5">Highlights</h1>
      <p className='mx-5'>Latest Data</p>
      <div className="flex flex-wrap justify-around">
        <div className="m-3 py-3 px-5 bg-white min-w-[400px] max-w-[480px] rounded-lg shadow-lg">
          <FiUsers className="text-4xl my-4" />
          <p className="text-xl my-2">Members</p>
          <p className="text-2xl font-bold"><span className='text-lg'>In Total : </span>{collections.users.length}</p>
          <button type="button" className='bg-primary text-white px-2 py-1 rounded my-2'>Detail</button>
        </div>
        <div className="m-3 py-3 px-5 bg-white min-w-[400px] max-w-[480px] rounded-lg shadow-lg">
          <CiDumbbell className="text-4xl my-4" />
          <p className="text-xl my-2">Products</p>
          <p className="text-2xl font-bold"><span className='text-lg'>In Total : </span>{collections.products.length}</p>
          <button type="button" className='bg-primary text-white px-2 py-1 rounded my-2'>Detail</button>
        </div>
        <div className="m-3 py-3 px-5 bg-white min-w-[400px] max-w-[480px] rounded-lg shadow-lg">
          <FiBook className="text-4xl my-4" />
          <p className="text-xl my-2">Courses</p>
          <p className="text-2xl font-bold"><span className='text-lg'>In Total : </span>{collections.courses.length}</p>
          <button type="button" className='bg-primary text-white px-2 py-1 rounded my-2'>Detail</button>
        </div>
        <div className="m-3 py-3 px-5 bg-white min-w-[400px] max-w-[480px] rounded-lg shadow-lg">
          <LuBookTemplate className="text-4xl my-4" />
          <p className="text-xl my-2">Course Templates</p>
          <p className="text-2xl font-bold"><span className='text-lg'>In Total : </span>
            {collections.courseTemplates.length}
          </p>
          <button type="button" className='bg-primary text-white px-2 py-1 rounded my-2'>Detail</button>
        </div>
        <div className="m-3 py-3 px-5 bg-white min-w-[400px] max-w-[480px] rounded-lg shadow-lg">
          <MdOutlineCategory className="text-4xl my-4" />
          <p className="text-xl my-2">Categories</p>
          <p className="text-2xl font-bold"><span className='text-lg'>In Total : </span>{collections.categories.length}</p>
          <button type="button" className='bg-primary text-white px-2 py-1 rounded my-2'>Detail</button>
        </div>
        <div className="m-3 py-3 px-5 bg-white min-w-[400px] max-w-[480px] rounded-lg shadow-lg">
          <LuPackageCheck className="text-4xl my-4" />
          <p className="text-xl my-2">Orders</p>
          <p className="text-2xl font-bold"><span className='text-lg'>In Total : </span>{collections.orders.length}</p>
          <button type="button" className='bg-primary text-white px-2 py-1 rounded my-2'>Detail</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
