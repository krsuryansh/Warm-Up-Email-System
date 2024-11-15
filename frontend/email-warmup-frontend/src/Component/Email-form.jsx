import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const defaultData = {
    userEmail: '',
    appPassword: '',
    numberOfEmails: '',
    timeInterval: '',
    receiver: '',
  }


const EmailForm = () => {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate('/Set-smtp'); // Navigate to the SMTP settings page
  };

  const [emailDetails, setEmailDetails] = useState(defaultData);

  const [successMessage, setSuccessMessage] = useState(''); // State to hold success message
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle the submit button state (loading)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true

    try {
      const response = await fetch('http://localhost:3000/api/configure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailDetails),
      });
      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setSuccessMessage('Configuration saved successfully!'); // Set success message
      } else {
        setSuccessMessage('Failed to save configuration.'); // Set failure message
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSuccessMessage('Error occurred while saving configuration.');
    } finally {
      setIsSubmitting(false); // Reset submitting state after the request
      setEmailDetails(defaultData);
    }
  };

  return (
    <div className="w-100 justify-center h-screen content-center bg-[#1A1A1D]" style={{ minHeight: 'min-content' }}>
      <div className="max-w-sm mx-auto m-3">
        <h2 className="text-white text-2xl">Set Test Email</h2>
      </div>

      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="userEmail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your Email
          </label>
          <input
            type="email"
            name="userEmail"
            value={emailDetails.userEmail}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="your-email@example.com"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="appPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            App Password
          </label>
          <input
            type="password"
            name="appPassword"
            value={emailDetails.appPassword}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="numberOfEmails" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            No of Emails Per Day
          </label>
          <input
            type="number"
            name="numberOfEmails"
            value={emailDetails.numberOfEmails}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            min="5"
            max="25"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="timeInterval" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Time Interval (in minutes)
          </label>
          <input
            type="number"
            name="timeInterval"
            value={emailDetails.timeInterval}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="receiver" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Receiver
          </label>
          <select
            name="receiver"
            value={emailDetails.receiver}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          >
            <option value="">Select an option</option>
            <option value="kumarsuryansh08@gmail.com">kumarsuryansh08@gmail.com</option>
          </select>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {/* Success or Error Message */}
      {successMessage && (
        <div className="mt-4 text-center">
          <p className={successMessage.includes('successfully') ? 'text-green-500' : 'text-red-500'}>
            {successMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default EmailForm;
