import logo from "@/public/assets/images/Asset 14@4x.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faSnapchat,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="px-2  md:pr-6 md:pl-0 md:ml-[110px]  mb-16 md:mb-0 pb-4">
      <section className="md:mb-0 bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] flex flex-col">
        <h2 className="px-4">Find us on social media</h2>
        <div className="flex gap-2 items-center p-6">
          <FontAwesomeIcon icon={faGithub} size="3x" />
          <FontAwesomeIcon icon={faTwitter} size="3x" />
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <FontAwesomeIcon icon={faLinkedin} size="3x" />
        </div>
        <div className="flex flex-wrap">
          <div className="m-4">
            <h2>Working Hours</h2>
            <p>MONDAY UNTIL FRIDAY </p>
            <p>9:00 - 22:00</p>
            <p>SATURDAY & SUNDAY</p>
            <p>12:00 - 24:00 </p>
          </div>
          <div className="m-4">
            <h2>Contact Us</h2>
            <p>Phone: 123-456-7890</p>
            <p>Email: littlelemon@example.com</p>
          </div>
        </div>
        {/* TODO: add divider */}
        <div className="bg-[var(--md-sys-color-on-primary-container)] w-full h-[1px] my-1"></div>
        <Image
          className="my-4 mx-auto md:mx-4"
          alt="logo"
          src={logo}
          width={200}
        ></Image>
        <p className="my-2">©2024 Little Lemon Inc. All rights reserved</p>
      </section>

      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
      </svg> */}
    </footer>
  );
};

export default Footer;
