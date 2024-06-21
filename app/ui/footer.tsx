import logo from "@/public/assets/images/Asset 14@4x.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
const Footer = () => {
  return (
    <footer
      className="
    pb-4 px-2 md:pr-6 md:pl-0 
    md:ml-[110px] mb-16 md:mb-0"
    >
      <section
        className="
      flex flex-col
      md:mb-0 
      bg-[var(--md-sys-color-surface-container-high)] 
      text-[var(--md-sys-color-on-primary-container)]"
      >
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
        <div
          className="
        bg-[var(--md-sys-color-surface-container-highest)] 
        w-full h-[1px] my-1"
        ></div>
        <Image
          className="my-4 mx-auto md:mx-4"
          alt="logo"
          src={logo}
          width={200}
        ></Image>
        <p className="my-2">©2024 Little Lemon Inc. All rights reserved</p>
      </section>
    </footer>
  );
};

export default Footer;
