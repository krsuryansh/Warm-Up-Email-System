import { useState } from 'react';

function SmtpSettingsForm() {
  const [smtpSettings, setSmtpSettings] = useState({
    host: '',
    port: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSmtpSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/set-smtp-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(smtpSettings),
      });

      if (response.ok) {
        alert('SMTP settings saved!');
      } else {
        alert('Failed to save SMTP settings.');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={smtpSettings.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>SMTP Host:</label>
        <input
          type="text"
          name="host"
          value={smtpSettings.host}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>SMTP Port:</label>
        <input
          type="number"
          name="port"
          value={smtpSettings.port}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={smtpSettings.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Save Settings</button>
    </form>
  );
}

export default SmtpSettingsForm;
