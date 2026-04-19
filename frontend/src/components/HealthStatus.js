function HealthStatus({ loading, message, error }) {
  let statusClassName = 'status-card';
  let text = message;

  if (loading) {
    statusClassName += ' status-card--loading';
    text = 'Checking API status...';
  } else if (error) {
    statusClassName += ' status-card--error';
    text = error;
  } else {
    statusClassName += ' status-card--success';
  }

  return (
    <section className={statusClassName}>
      <h2>Health Check</h2>
      <p>{text}</p>
    </section>
  );
}

export default HealthStatus;
