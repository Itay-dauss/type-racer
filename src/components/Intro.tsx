import { Container, IntroParagraph } from "../styles/Intro";

function Intro() {
  return (
    <Container className="intro">
      <IntroParagraph>How fast are your fingers?</IntroParagraph>
      <IntroParagraph>
        Do the one-minute typing test to find out!
      </IntroParagraph>
      <IntroParagraph>
        Press the space bar after each word. At the end, you'll get your typing
        speed in CPM and WPM. Good luck!
      </IntroParagraph>
    </Container>
  );
}

export default Intro;
