const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner" />
      <span className="loader-text">{text}</span>
    </div>
  );
};

export default Loader;
