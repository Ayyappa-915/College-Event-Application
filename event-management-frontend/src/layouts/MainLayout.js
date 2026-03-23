import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function MainLayout({ children }) {

  return (

    <div className="page-wrapper">

      <Navbar />

      <main className="page-content">
        {children}
      </main>

      <Footer />

    </div>

  );

}

export default MainLayout;