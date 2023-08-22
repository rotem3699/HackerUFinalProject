import "./contactUsComp.css";
import SocialMedia from "../SocialMedia/SocialMedia";

const ContactUsComp = () => {
  return (
    <div className="contact-us-comp-container">
      <h1 className="contact-us-headline">Contact Us</h1>
      <p className="contact-us-paragraph">
        We're thrilled to hear from you! If you have any questions, suggestions,
        or feedback regarding our cocktail recipes or the Cocktail4u website,
        please don't hesitate to reach out. Our team is here to assist you in
        any way we can.
      </p>
      <h3 className="contact-us-h3">General Inquiries</h3>
      <p className="contact-us-paragraph">
        For general inquiries or information about Cocktail4u, please email us
        at <span className="contact-us-emails-span">info@cocktail4u.com</span>{" "}
        or use the contact form below. We strive to respond to all inquiries
        within 24-48 hours.
      </p>
      <h3 className="contact-us-h3">Recipe Requests</h3>
      <p className="contact-us-paragraph">
        If there's a specific cocktail recipe you'd like to see featured on our
        website, we'd be happy to consider your suggestion. Please email us at
        <span className="contact-us-emails-span">
          recipes@cocktail4u.com
        </span>{" "}
        with your request, and we'll do our best to accommodate it.
      </p>
      <h3 className="contact-us-h3">Technical Support</h3>
      <p className="contact-us-paragraph">
        If you're experiencing any technical issues with the Cocktail4u website
        or have any difficulties accessing our content, please reach out to our
        technical support team at{" "}
        <span className="contact-us-emails-span">support@cocktail4u.com</span>.
        Be sure to provide as much detail as possible, including the device and
        browser you're using, to help us troubleshoot the problem effectively.
      </p>
      <h3 className="contact-us-h3">Media and Press Inquiries</h3>
      <p className="contact-us-paragraph">
        If you're a member of the media or press and would like to feature
        Cocktail4u in an article, interview, or other media coverage, please
        contact our media relations team at{" "}
        <span className="contact-us-emails-span">media@cocktail4u.com</span>.
        We'll be happy to provide you with any necessary information or arrange
        an interview.
      </p>
      <h3 className="contact-us-h3">Social Media</h3>
      <SocialMedia></SocialMedia>
      <p className="contact-us-paragraph">Waiting To Hear From You!</p>
    </div>
  );
};

export default ContactUsComp;
