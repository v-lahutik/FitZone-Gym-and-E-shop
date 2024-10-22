import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './contact.css';
import { URL } from '../../utils/URL';

// icons
import { IoLocationOutline } from 'react-icons/io5';
import { FiPhone } from 'react-icons/fi';
import { FaRegClock } from 'react-icons/fa6';
import { FaRegUser } from 'react-icons/fa';
import { FaRegEnvelope } from 'react-icons/fa6';
import { BsPencil } from 'react-icons/bs';
import Swal from 'sweetalert2';

const ContactPage = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (stub)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic for sending form data
    try {
      console.log('Form submitted', formData);
      const response = await fetch(`${URL}/public/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        Swal.fire({
          title: 'Sent!',
          text: 'Message sent!',
          icon: 'success',
          confirmButtonColor: '#333'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Error sending message',
          icon: 'error',
          confirmButtonColor: '#333'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: `${error}`,
        icon: 'error',
        confirmButtonColor: '#333'
      });
    }
  };

  return (
    <>
      <section
        id="breadcrumb-section"
        className="hero bg-cover bg-center flex items-center h-[30vh]"
      >
        <div className="container mx-auto max-w-[1280px] px-4 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center">
            <div className="flex flex-col justify-center items-start text-white">
              <h1 className="text-3xl md:text-4xl lg:text-6xl   font-kanit mb-4 font-bold ">
                Contact
              </h1>
              <ul className="font-archivo font-medium uppercase text-sm lg:text-lg flex">
                <li className="flex space-x-2 text-primary mr-2">
                  <Link to="/">
                    Home <span className="relative bottom-[2px]">&gt;&gt;</span>{' '}
                  </Link>
                </li>
                {pathnames.map((value, index) => {
                  const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                  const isLast = index === pathnames.length - 1;

                  return isLast ? (
                    <li key={index} className="text-white">
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </li>
                  ) : (
                    <li key={index}>
                      <Link to={routeTo} className="text-white hover:underline">
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className=" bg-white pt-36 pb-24">
        <div className="container mx-auto max-w-[1280px] px-4 ">
          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <div className="contact-feature2">
                <div className="box-icon bg-primary text-white">
                  <IoLocationOutline className="contact-icon" />
                </div>
                <div className="media-body">
                  <p className="contact-feature_label">Address</p>
                  <a href="" className="contact-feature_link">
                    Friedrichstraße 123, 10117 Berlin, Germany
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="contact-feature2">
                <div className="box-icon bg-primary text-white">
                  <FiPhone className="contact-icon" />
                </div>
                <div className="media-body">
                  <p className="contact-feature_label">Contact Info</p>
                  <a href="tel:256214203215" className="contact-feature_link">
                    +163-6589-9654
                  </a>
                  <a
                    href="mailto:info@fitkit.com"
                    className="contact-feature_link"
                  >
                    info@fitzone.com
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="contact-feature2">
                <div className="box-icon bg-primary text-white">
                  <FaRegClock className="contact-icon" />
                </div>
                <div className="media-body">
                  <p className="contact-feature_label">Opening Hours</p>
                  <span className="contact-feature_link">
                    Mon to Sun: 09:00 - 22:00
                  </span>
                  {/* <span className="contact-feature_link">
                    Sunday <span className="text-theme">Closed</span>
                  </span> */}
                </div>
              </div>
            </div>
          </div>

          <div className="contact-page-form-wrap mt-20 mb-20">
            <div className="grid lg:grid-cols-2 gap-5">
              <div className="mr-10 lg:mr-0">
                <div className="contact-form-v2 contact-page-form">
                  <h2 className="font-kanit font-semibold text-[48px] mb-6">
                    Get In Touch!
                  </h2>
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="row">
                      <div className="form-group flex items-center border border-smokeColor rounded-3xl mb-6">
                        <input
                          type="text"
                          className="w-full py-4 pl-6 outline-none border-none ml-4 rounded-3xl bg-smokeColor"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Name"
                          required
                        />
                        <FaRegUser />
                      </div>

                      <div className="form-group flex items-center border border-smokeColor rounded-3xl mb-6">
                        <input
                          type="email"
                          className="w-full py-4 px-6 outline-none border-none ml-4 rounded-3xl bg-smokeColor"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Your Email"
                          required
                        />
                        <FaRegEnvelope />
                      </div>

                      <div className="form-group flex items-center  mb-6">
                        <textarea
                          placeholder="Write Message..."
                          className="w-full py-4 px-6 outline-none border-none ml-4 rounded-3xl bg-smokeColor"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                        />
                        <BsPencil />
                      </div>

                      <div className="form-btn ml-4 ">
                        <button
                          type="submit"
                          className="w-full border-smokeColor rounded-[30px] bg-primary text-white py-4 font-semibold  duration-300 hover:bg-blackColor3"
                        >
                          SEND MESSAGE NOW
                        </button>
                      </div>
                    </div>

                    <p className="form-messages mb-0 mt-3"></p>
                  </form>
                </div>
              </div>

              <div className=" hidden lg:block">
                <div className="">
                  <img
                    src="/src/assets/images/Hero/hero_1_1.jpg"
                    alt="Contact"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
