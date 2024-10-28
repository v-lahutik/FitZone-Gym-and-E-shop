import { useEffect, useState } from 'react';
import { Service } from './data';
import { Link, useParams } from 'react-router-dom';
import { servicesData } from './data';
import { FaArrowRight } from 'react-icons/fa6';
import './Services.css';

export default function ServiceDetails() {
  const [service, setService] = useState<Service | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();
  useEffect(() => {
    setService(servicesData.find((service) => service.slug === slug));
    setLoading(false);
  }, [slug]);

  console.log('service', service);

  return (
    <>
      <section
        id="breadcrumb-section"
        className="hero bg-cover bg-center flex items-center h-[30vh]"
        style={{
          backgroundImage:
            "url('/src/assets/images/Hero/Background-breadcrumb.png')"
        }}
      >
        <div className="container mx-auto max-w-[1280px] px-4 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center">
            <div className="flex flex-col justify-center items-start text-white">
              <h1 className="text-3xl md:text-4xl lg:text-6xl   font-kanit mb-4 font-bold ">
                Services
              </h1>
              <ul className="font-archivo font-medium uppercase text-sm lg:text-lg flex">
                <li className="flex space-x-2 text-primary mr-2">
                  <Link to="/">
                    Home <span className="relative bottom-[2px]">&gt;&gt;</span>{' '}
                  </Link>
                </li>

                <li className="text-white">
                  {service?.name ? service?.name : 'Loading...'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="single-course" className=" bg-white py-10 lg:px-14 md:px-6">
        <div className="flex flex-wrap mb-5 container h-auto pt-20 max-w-[1280px] mx-auto">
          <div className="w-full md:w-7/12 lg:w-8/12 px-4">
            <div className="th-page page-single">
              <div className="page-img">
                <img src={service?.servicePic} alt="page Image" />
              </div>
              {/* Page Content */}
              {loading ? (
                <div>Loading...</div>
              ) : (
                <div className="page-content">
                  <h2 className="page-title text-4xl font-bold mt-4 mb-3">
                    {service?.name}
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: service?.description ?? ''
                    }}
                    className="mt-2 text-body text-archivo service-description"
                  ></div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-5/12 lg:w-4/12 px-4">
            <aside className="sidebar ">
              <div className="widget mb-8">
                <h3 className="widget-title h4">Our Services</h3>
                <ul className="categories">
                  {servicesData.map((service) => (
                    <li key={service.id}>
                      <Link
                        to={`/services/${service.slug}`}
                        className="flex justify-between items-center"
                      >
                        {service.name}
                        <FaArrowRight />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
