import React from "react";
import styled from "styled-components";
import APVAMatchLogo from "../../assets/img/APVA-Match.png";


// Assets

export default function Contact() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <Wrapper>
      <footer className="darkBg">
        <div className="container">
          <InnerWrapper
            className="flexSpaceCenter"
            style={{ padding: "30px 0" }}
          >
            <a
              className="flexCenter animate pointer"
              href="/"
              smooth="true"
              offset={-80}
            >
              <img src={APVAMatchLogo} alt="APVA Match Logo" style={{ marginLeft: "15px" }} width="50px" />
            </a>
            <StyleP className="text-black font13">
              © {getCurrentYear()} -{" "}
              <span className="yellowColor font13">APVA Match</span> All Right Reserved
            </StyleP>
            <div className="col-12 col-lg-auto textCenter text-lg-end">
             
              <a
                href="https://instagram.com/apva_official"
                target="_blank"
                rel='noreferrer'
                 className="social-icon inline-block si-small si-borderless si-github"
              >
                <i  className="bi bi-instagram"></i>
                <i  className="bi bi-instagram"></i>
              </a>

              <a
                href="https://twitter.com/APVAofficial?t=3PI-Co-UWJmVaGusMowNLg&s=08"
                target="_blank"
                rel='noreferrer'
                className="social-icon inline-block si-small si-borderless si-twitter"
              >
                <i className="bi bi-twitter"></i>
                <i className="bi bi-twitter"></i>
              </a>
              
              <a
                href="https://www.facebook.com/africanpodsandvoices/"
                target="_blank"
                rel='noreferrer'
                className="social-icon inline-block si-small si-borderless si-facebook"
              >
                <i className="bi bi-facebook"></i>
                <i className="bi bi-facebook"></i>
              </a>

              <a
                href="https://www.youtube.com/channel/UCtpmm0qo6exHNSYxXTsmlqw"
                target="_blank"
                rel='noreferrer'
                className="social-icon inline-block si-small si-borderless si-gplus"
              >
                <i  className="bi bi-youtube"></i>
                <i  className="bi bi-youtube"></i>
              </a>

              <a
                href="https://www.youtube.com/channel/UCtpmm0qo6exHNSYxXTsmlqw"
                target="_blank"
                rel='noreferrer'
                 className="social-icon inline-block si-small si-borderless si-linkedin"
              >
                <i  className="bi bi-linkedin"></i>
                <i  className="bi bi-linkedin"></i>
              </a>
            </div>
          </InnerWrapper>
        </div>
      </footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const InnerWrapper = styled.div`
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const StyleP = styled.p`
  @media (max-width: 550px) {
    margin: 20px 0;
  }
`;
