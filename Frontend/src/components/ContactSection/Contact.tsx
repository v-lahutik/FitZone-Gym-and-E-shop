import "./Contact.css";
import { FaPhoneVolume } from "react-icons/fa6";
import { GrMail } from "react-icons/gr";
import { ImClock } from "react-icons/im";

const Contact: React.FC = () => {
  return (
    <div className="contactWrapper" id="contact">
      <div className="contact bg-blackColor2 p2">
        <div className="openHours text-white">
          <div className="contactIcon">
            <ImClock />
          </div>
          <p className="sm:text-xl lg:text-2xl font-bold">
            {" "}
            Mo-Sun 09:00-22:00{" "}
          </p>
        </div>

        <div className="contactLeft text-white">
          <div className="contactIcon">
            <FaPhoneVolume />
          </div>
          <p className="sm:text-xl lg:text-2xl font-bold"> + 1635-698-2541 </p>
        </div>
        <div className="contactRight text-white">
          <div className="contactIcon">
            <GrMail />
          </div>
          <p className="sm:text-xl lg:text-2xl font-bold">info@fitzone.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
