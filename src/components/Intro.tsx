import { Container, IntroParagraph } from "../styles/Intro";
import * as Messages from "../utils/Messages";

function Intro() {
  return (
    <Container className="intro">
      <IntroParagraph>{Messages.INTRO_1}</IntroParagraph>
      <IntroParagraph>{Messages.INTRO_2}</IntroParagraph>
      <IntroParagraph>{Messages.INTRO_3}</IntroParagraph>
    </Container>
  );
}

export default Intro;
