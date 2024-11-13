import React from 'react';

const AccessibilityStatement = ({
  websiteName = "Charles Lyell",
  URL = "https://lyell.ed.ac.uk/",
  whatUserCanDo = [
    "Change colours, contrast levels and fonts",
    "Navigate most of the website using just a keyboard",
    "Navigate round the site using voice recognition software e.g. Dragon",
    "Experience no time limits when using the website",
    "Use the site without encountering any scrolling, flashing or moving text"
  ],
  howAccessible = [
    "Not all colour contrasts meet current standards",
    "There are examples of text as images",
    "Some images do not have alternative text",
    "Some new tab / windows open without alerting the user",
    "Not all hyperlinks are formatted correctly with meaningful hypertext",
    "Some information is conveyed by colour only e.g. links",
    "Reflow is not operational to 400% because of overlapping content",
    "Some heading levels are skipped",
    "Some selection displays have insufficient colour contrast",
    "Screen readers are not fully compatible with the website due to keyboard navigation issues (occur with screen readers only)",
    "There is no skip to main content button",
    "Voice recognition software is not fully compatible with the website",
    "On Android devices all functionalities cannot be accessed"
  ],
  nonComDesc = [
    "1.1.1 – Non-text Content: Not all non-text items presented to users have alternative text",
    "1.3.4 Orientation: The site has functionality issues in portrait mode on Android devices",
    "1.4.1 - Use of Color: Some hyperlinks are conveyed with colour only",
    "1.4.3 - Contrast (Minimum): Some text may not have sufficient colour contrast between font and background colours",
    "1.4.5 – Images of Text: Some items are examples of text as an image and do not contain the appropriate alternative text",
    "1.4.10 – Reflow: Reflow is not operational up to 400%",
    "2.4.1 - Bypass Blocks: No skip to main content button is enabled on some pages of the site",
    "2.4.4 - Link Purpose (in Context): Some links do not contain meaningful hypertext to inform the user of their target location",
    "2.4.6 - Headings and Labels: Headings are not formatted correctly and some heading levels are missed, which affects screen reader software",
    "2.4.7 Focus Visible: It is not always clear where you have tabbed to using a keyboard",
    "3.2.2 - On Input: Some hyperlinks open link in new tab/window, and some pop-ups do not alert the user this will happen",
    "3.2.6 Consistent Help: Help such as contact us and the chat function are not located in the same place on every page",
    "4.1.2 – Name, Role, Value: The website is not fully compatible with assistive software e.g. using assistive software it is not possible to reach all content"
  ],
  improveTargetDate = "October 2025",
  prepareDate = "20th September 2021",
  reviewDate = "4th October 2024",
  testDate = "October 2024"
}) => {
  return (
    <div className="container">
      <h1 style={{fontSize: "60px"}}>Accessibility statement for <a href={URL}>{websiteName}</a></h1>

      <p>Website accessibility statement in line with Public Sector Body (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018</p>

      <p>This accessibility statement applies to:</p>
      <p><a href={URL}>{URL}</a></p>

      <p>This website is run by the Library and University Collections Directorate, Information Services Group at the University of Edinburgh. We want as many people as possible to be able to use this application. For example, that means you should be able to:</p>
      <ul>
        {whatUserCanDo.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <p>We’ve also made the website text as simple as possible to understand. However, some of our content is technical, and we use technical terms where there is no easier wording we could use without changing what the text means.</p>

      <h2>Customising the website</h2>
      <p>AbilityNet has advice on making your device easier to use if you have a disability. This is an external site with suggestions to make your computer more accessible:</p>
      <p><a href="https://mcmw.abilitynet.org.uk/">AbilityNet - My Computer My Way</a></p>

      <p>With a few simple steps you can customise the appearance of our website using your browser settings to make it easier to read and navigate:</p>
      <p><a href="https://www.ed.ac.uk/about/website/accessibility/customising-site" target="_blank">Additional information on how to customise our website appearance</a></p>

      <p>If you are a member of University staff or a student, you can use the free SensusAccess accessible document conversion service:</p>
      <p><a href="https://www.ed.ac.uk/student-disability-service/staff/supporting-students/accessible-technology">Information on SensusAccess</a></p>

      <h2>How accessible this website is</h2>
      <p>We know some parts of this website are not fully accessible:</p>
      <ul>
        {howAccessible.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2>Feedback and contact information</h2>
      <p>If you need information on this website in a different format, including accessible PDF, large print, audio recording, or braille, please contact us:</p>
      <ul>
        <li>Email: <a href="mailto:Information.systems@ed.ac.uk">Information.systems@ed.ac.uk</a></li>
        <li>Telephone: +44 (0)131 651 5151</li>
        <li>British Sign Language (BSL) users can contact us via <a href="https://contactscotland-bsl.org/">Contact Scotland BSL</a>, the online BSL interpreting service.</li>
      </ul>

      <h2>Reporting accessibility problems with this website</h2>
      <p>We are always looking to improve the accessibility of this website. If you find any problems not listed on this page, or think we’re not meeting accessibility requirements, please contact us:</p>
      <ul>
        <li>Email: <a href="mailto:Information.systems@ed.ac.uk">Information.systems@ed.ac.uk</a></li>
        <li>Telephone: +44 (0)131 651 5151</li>
        <li>British Sign Language (BSL) users can contact us via <a href="https://contactscotland-bsl.org/">Contact Scotland BSL</a>, the online BSL interpreting service.</li>
      </ul>

      <h2>Enforcement procedure</h2>
      <p>The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the ‘accessibility regulations’). If you’re not happy with how we respond to your complaint, please contact the Equality Advisory and Support Service (EASS) directly: <a href="https://www.equalityadvisoryservice.com/">EASS Contact details</a>.</p>

      <h2>Technical information about this website’s accessibility</h2>
      <p>The University of Edinburgh is committed to making its websites and applications accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.</p>

      <h2>Compliance Status</h2>
      <p>This website is partially compliant with the Web Content Accessibility Guidelines (WCAG) 2.2 AA standard, due to the non-compliances listed below.</p>
      <p>The full guidelines are available at: <a href="https://www.w3.org/TR/WCAG22/">WCAG 2.2 AA standard</a></p>

      <h3>Noncompliance with the accessibility regulations</h3>
      <ul>
        {nonComDesc.map((desc, index) => (
          <li key={index}>{desc}</li>
        ))}
      </ul>

      <h2>What we’re doing to improve accessibility</h2>
      <p>We will continue to address and make significant improvements to the accessibility issues highlighted. Unless specified otherwise, a complete solution or significant improvement will be in place by {improveTargetDate}.</p>

      <h2>Preparation of this accessibility statement</h2>
      <p><b>This statement was prepared on {prepareDate}. It was last reviewed on {reviewDate}. The website was last tested on {testDate}.</b></p>
      <p>We ran automated testing using AXE Devtools and then manual testing that included various tools and methods.</p>
    </div>
  );
};

export default AccessibilityStatement;
