import Container from "./container";
import Header from "./header";
import ProfileBar from "./profile-bar";
import ReactionsBar from "./reactions-bar";
import Footer from "./footer";
import ModalImage from "react-modal-image";

function FullScreenImage({ ...props }) {
    return <ModalImage small={props.src} large={props.src} />;
  }
  
  function ArticleLink({ children, ...props }) {
    return (
      <a href={props.href} target="_blank">
        {children}
      </a>
    );
  }
  

export { Container, Header, ProfileBar, ReactionsBar, Footer, FullScreenImage, ArticleLink };
