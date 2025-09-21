import myVideo from "../Assets/Multimercial_20_min_Animation.mp4";

const Navbar = () => {
  return (
    <div className="bg-purple-500 text-white">
      <h2>Navbar</h2>
      <video autoPlay loop muted playsInline>
        <source src={myVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default Navbar;