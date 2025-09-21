import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";

const Contact = () => {
  const [formData, setFormData] = useState({
    //Will be updated by handleChange
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    //event handler for form inputs (e is the event object)
    setFormData({ ...formData, [e.target.name]: e.target.value }); //Dynamically use the inputs name attribute as the key in the object
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    //async adds a promise - will call the function in the future successfully or not
    e.preventDefault(); //stop browser frefreshing page when submit
    setIsLoading(true);

    try {
      console.log("Form Submitted :", formData);
      await emailjs.send(
        "service_c8lrnso",
        "template_iuthnfc",
        {
          from_name: formData.name,
          to_name: "Marcel",
          from_email: formData.email,
          to_email: "MarcelLatwinski.work@gmail.com",
          message: formData.message,
        },
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      );
      setIsLoading(false);
      showAlertMessage("Success", "Your message has been sent");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      showAlertMessage("Failed", "Something went wrong D;");
    }
    //service_c8lrnso
    //template_iuthnfc
  };

  return (
    <section className="relative flex items-center c-space section-spacing">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">Let's Talk</h2>
          <p className="font-normal text-neutral-400">
            Whether you're someone on my github looking at my websites, or
            someone I am personally showing my website because im bored - I'm
            here to help
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="field-label">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder="Alice Henman"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="field-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder="AliceHenman@gmail.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="field-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              type="text"
              rows="4"
              className="field-input field-input-focus"
              placeholder="Tell Marcel how COOL he is"
              autoComplete="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation"
          >
            {!isLoading ? "Send" : "Sending..."}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
