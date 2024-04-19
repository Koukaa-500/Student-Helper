import React from "react";
import { getAuthToken, removeAuthToken } from "../authentication/authService";
const Home = () => {
  const handleLogout = () => {
    // Remove token and redirect to login
    removeAuthToken();
    window.location.href = "/login";
  };
  return (
    <div
      className="bigBody"
      
    >
      {/* <div
        className="background-image"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/bg.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      ></div> */}
      {/* Image */}
      <img
        src={`${process.env.PUBLIC_URL}/impp.png`}
        alt="Example"
        style={{
          position: "absolute",
          width: "590.14px",
          height: "343.95px",
          top: "315.83px",
          left: "830.32px",
        }}
      />

      {/* Texte statique avec les mots "Smart" et "Future" en orange */}
      <div
        style={{
          position: "absolute",
          width: "586px",
          top: "348px",
          left: "194px",
          fontSize: "36px", // Ajuster la taille du texte
          fontWeight: "bold",
          color: "black", // Couleur du texte en noir
          margin: "0", // Ajoutez cette ligne pour supprimer l'espace
        }}
      >
        The <span style={{ color: "#ff7f36" }}>Smart</span> <br /> Choice For{" "}
        <span style={{ color: "#ff7f36" }}>Future</span>
      </div>

      {/* Deuxième bloc de texte */}
      <div
        style={{
          position: "absolute",
          width: "586px",
          height: "102px",
          top: "543px",
          left: "194px",
          fontSize: "24px", // Ajuster la taille du texte
          color: "gray", // Couleur du texte en gris
          margin: "0", // Ajoutez cette ligne pour supprimer l'espace
        }}
      >
        Elearn is a global training provider based across the UK that
        specialises in accredited and bespoke training courses. We crush the...
      </div>

      {/* Conteneur des images */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "300px",
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="Logo"
          className="logo"
          style={{ width: "118px", height: "112px", marginRight: "10px" }} // Ajuster la taille et la marge si nécessaire
        />
        <img
          src={`${process.env.PUBLIC_URL}/st.png`}
          alt="Logo"
          className="logo"
          style={{ width: "216px", height: "43px" }} // Ajuster la taille si nécessaire
        />
      </div>

      {/* Barre de menu transparente */}
      <div className="menu-bar" style={{ marginLeft: "20px", padding: "50px" }}>
        <a href="/lien-1" className="menu-item">
          Home
        </a>
        <a href="/lien-2" className="menu-item">
          About us
        </a>
        <a href="/lien-3" className="menu-item">
          Our service
        </a>
        <a href="/lien-4" className="menu-item">
          Contact us
        </a>
        <a
          type="button"
          className="btn btn-primary sign-in-button"
          style={{ marginLeft: "20px" }}
          onClick={handleLogout}
        >
            
          Sign In
        </a>
      </div>

      {/* Nouveau bloc ajouté */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: "1432px",
          height: "277px",
          top: "700px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#4d2c5e",
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.75)",
        }}
      >
        <div
          style={{
            flex: 1,
            textAlign: "center",
            borderRight: "2px solid white",
            paddingRight: "20px",
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/1.png"}
            alt="Description de l'image"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <p style={{ color: "white" }}>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a BC, making it over 2000 years old.
          </p>
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            borderRight: "2px solid white",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/12.png"}
            alt="Description de l'image"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <p style={{ color: "white" }}>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a BC, making it over 2000 years old
          </p>
        </div>
        <div style={{ flex: 1, textAlign: "center", paddingLeft: "20px" }}>
          <img
            src={process.env.PUBLIC_URL + "/3.png"}
            alt="Description de l'image"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <p style={{ color: "white" }}>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a BC, making it over 2000 years old
          </p>
        </div>
      </div>

      {/* Nouveau bloc ajouté */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: "1420px",
          height: "437px",
          top: "1000px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "white",
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.75)",
        }}
      >
        {/* Première partie */}
        <div
          style={{
            flex: 1,
            marginRight: "10px",
            borderRadius: "20px",
            boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.25)",
            overflow: "hidden",
          }}
        >
          <div style={{ background: "black", padding: "10px" }}>
            <img
              src={process.env.PUBLIC_URL + "/image1.jpg"}
              alt="Photo 1"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <p style={{ color: "black", fontWeight: "bold" }}>
              Description de la première partie
            </p>
            <div style={{ color: "gray" }}>★★★★☆</div>
          </div>
        </div>

        {/* Deuxième partie */}
        <div
          style={{
            flex: 1,
            margin: "0 10px",
            borderRadius: "20px",
            boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.25)",
            overflow: "hidden",
          }}
        >
          <div style={{ background: "gray", padding: "10px" }}>
            <img
              src={process.env.PUBLIC_URL + "/image2.jpg"}
              alt="Photo 2"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <p style={{ color: "black", fontWeight: "bold" }}>
              Description de la deuxième partie
            </p>
            <div style={{ color: "gray" }}>★★★☆☆</div>
          </div>
        </div>

        {/* Troisième partie */}
        <div
          style={{
            flex: 1,
            marginLeft: "10px",
            borderRadius: "20px",
            boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.25)",
            overflow: "hidden",
          }}
        >
          <div style={{ background: "darkgray", padding: "10px" }}>
            <img
              src={process.env.PUBLIC_URL + "/image3.jpg"}
              alt="Photo 3"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <p style={{ color: "black", fontWeight: "bold" }}>
              Description de la troisième partie
            </p>
            <div style={{ color: "gray" }}>★★★★☆</div>
          </div>
        </div>
      </div>

      <div>
        {/* Premier bloc */}
        <div
          className="fadeIn"
          style={{
            width: "1920px",
            height: "636px",
            position: "absolute",
            top: "1463px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundImage: `url(${process.env.PUBLIC_URL}/bg.png)`,
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
          }}
        >
          {/* Image */}
          <img
            src={`${process.env.PUBLIC_URL}/9.png`}
            alt="Image"
            style={{
              position: "absolute",
              width: "516.95px",
              height: "644.09px",
              top: "0",
              left: "0",
              transform: "translate(40%, 20%)",
              zIndex: "-1",
            }}
          />
        </div>

        <div>
          {/* Premier bloc */}
          <div
            className="fadeIn animated-block"
            style={{
              width: "1920px",
              height: "636px",
              position: "absolute",
              top: "1463px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundImage: `url(${process.env.PUBLIC_URL}/bg.png)`,
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
            }}
          >
            {/* Image */}
            <img
              src={`${process.env.PUBLIC_URL}/9.png`}
              alt="Image"
              style={{
                position: "absolute",
                width: "516.95px",
                height: "644.09px",
                top: "0",
                left: "0",
                transform: "translate(40%, 20%)",
                zIndex: "-1",
              }}
            />
          </div>

          {/* Deuxième bloc */}
          <div
            className="slideIn animated-block"
            style={{
              width: "586px",
              height: "186px",
              position: "absolute",
              top: "1592px",
              left: "687px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "5px",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
              padding: "40px",
              overflow: "hidden",
            }}
          >
            <p
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "30px",
                margin: "0",
              }}
            >
              Premium <span style={{ color: "#ff7f36" }}>Learning</span>
            </p>
            <p
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "30px",
                margin: "0",
              }}
            >
              Experience
            </p>
          </div>
        </div>

        {/* Troisième bloc */}
        <div
          style={{
            width: "586px",
            height: "100px",
            position: "absolute",
            top: "1802px",
            left: "687px",
            textAlign: "center",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
            padding: "10px",
            overflow: "hidden",
          }}
        >
          {/* Image */}
          <img
            src={`${process.env.PUBLIC_URL}/7.png`}
            alt="Image 2"
            style={{ position: "absolute", left: "30px" }}
          />

          {/* Description */}
          <div style={{ marginTop: "20px" }}>
            <p
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
                margin: "0",
              }}
            >
              Easily Accessible
            </p>
            <p style={{ color: "gray", fontSize: "16px", margin: "0" }}>
              Learning Will fell Very Comfortable With Courslab.
            </p>
          </div>
        </div>
        {/* Troisième bloc */}
        <div
          style={{
            width: "586px",
            height: "100px",
            position: "absolute",
            top: "1902px",
            left: "687px",
            textAlign: "center",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
            padding: "10px",
            overflow: "hidden",
          }}
        >
          {/* Image */}
          <img
            src={`${process.env.PUBLIC_URL}/5.png`}
            alt="Image 2"
            style={{ position: "absolute", left: "30px" }}
          />

          {/* Description */}
          <div style={{ marginTop: "20px" }}>
            <p
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
                margin: "0",
              }}
            >
              Fun learning experience
            </p>
            <p style={{ color: "gray", fontSize: "16px", margin: "0" }}>
              Learning Will fell Very Comfortable With Courslab.
            </p>
          </div>
        </div>
      </div>
      {/* Cinquième bloc */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
          position: "absolute",
          top: "2300px",
          left: "30px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
          padding: "10px",
          overflow: "hidden",
        }}
      >
        {/* Première partie */}
        <div
          className="transitionEffect"
          style={{ width: "30%", textAlign: "center" }}
        >
          <img
            src="3.png"
            alt="User 1"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              marginBottom: "10px",
            }}
          />
          <p
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "20px",
              margin: "0",
            }}
          >
            “Teachings of the great explore of truth, the master-builder of
            human happiness. no one rejects,dislikes, or avoids pleasure itself,
            pleasure itself”
          </p>
          <p style={{ color: "gray", fontSize: "16px", margin: "0" }}>
            Finlay Kirk - Web Developper
          </p>
        </div>
        {/* Deuxième partie */}
        <div
          className="transitionEffect"
          style={{ width: "30%", textAlign: "center" }}
        >
          <img
            src="3.png"
            alt="User 2"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              marginBottom: "10px",
            }}
          />
          <p
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "20px",
              margin: "0",
            }}
          >
            “Complete account of the system and expound the actual Contrary to
            popular belief, Lorem Ipsum is not simply random text. It has roots”
          </p>
          <p style={{ color: "gray", fontSize: "16px", margin: "0" }}>
            Dannette P. Cervantes- Web Design
          </p>
        </div>
        {/* Troisième partie */}
        <div
          className="transitionEffect"
          style={{ width: "30%", textAlign: "center" }}
        >
          <img
            src="1.png"
            alt="User 3"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              marginBottom: "10px",
            }}
          />
          <p
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "20px",
              margin: "0",
            }}
          >
            “There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour”
          </p>
          <p style={{ color: "gray", fontSize: "16px", margin: "0" }}>
            Clara R. Altman - UI&UX Design
          </p>
        </div>
      </div>

      <div
        className="full-width-block"
        style={{
          display: "flex",
          position: "absolute",
          width: "1420px",
          height: "437px",
          top: "2660px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "white",
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.75)",
        }}
      >
        {/* Contenu de votre bloc ici */}
        <div
          style={{
            flex: 1,
            marginRight: "10px",
            borderRadius: "20px",
            boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.25)",
            overflow: "hidden",
          }}
        ></div>

        {/* Deuxième partie */}
        <div
          style={{
            flex: 1,
            margin: "0 10px",
            borderRadius: "20px",
            boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.25)",
            overflow: "hidden",
          }}
        ></div>

        {/* Troisième partie */}
        <div
          style={{
            flex: 1,
            marginLeft: "10px",
            borderRadius: "20px",
            boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.25)",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "10px" }}></div>
        </div>
      </div>

      <div>
        <div
          className="additional-block"
          style={{
            width: "1032px",
            height: "377px",
            position: "absolute",
            top: "3200px",
            left: "30px",
            transform: "translateX(20%)",
            zIndex: "-1",
            backgroundColor: "#4D2C5E",
            borderRadius: "14px",
          }}
        >
          {/* Autre bloc */}
          <div
            className="inner-block"
            style={{
              width: "110px",
              height: "222px",
              position: "absolute",
              top: "62px",
              left: "555px",
              borderRadius: "62px",
              backgroundColor: "#4D2C5E",
              transform: "translate(-40%, 30%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 className="visually-hidden">Title for screen readers</h2>
            <a className="visually-hidden-focusable" href="#content">
              Skip to main content
            </a>
            <div className="visually-hidden-focusable">
              A container with a <a href="#">focusable element</a>.
            </div>
            <p style={{ fontWeight: "bold", color: "white" }}>
              Subscribe to our newsletter
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  padding: "8px",
                  borderRadius: "5px",
                  marginRight: "10px",
                }}
              />
              <button
                style={{
                  padding: "8px 20px",
                  borderRadius: "5px",
                  backgroundColor: "#ff7f36",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  transform: "translate(-20%, 0%)",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
