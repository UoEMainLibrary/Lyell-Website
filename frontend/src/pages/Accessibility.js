import React from 'react';

// Styling variables
const headingColor = '#2f5496';
const linkColor = '#0563c1';

const styles = {
    body: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '12pt',
        lineHeight: '1.5',
        textAlign: 'left',
        background: 'transparent',
        marginBottom: '0.25cm',
    },
    h1: {
        color: headingColor,
        fontSize: '24pt',
        marginBottom: '0.5cm',
    },
    h2: {
        color: headingColor,
        fontSize: '20pt',
        marginBottom: '0.5cm',
    },
    h3: {
        color: headingColor,
        fontSize: '16pt',
        marginBottom: '0.5cm',
    },
    link: {
        color: linkColor,
        textDecoration: 'underline',
    },
};

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
                                    improveTargetDate = "September 2025",
                                    prepareDate = "20th September 2021",
                                    reviewDate = "4th October 2024",
                                    testDate = "October 2024"
                                }) => {
    return (
        <div style={styles.body} className="container">
            <h1 style={styles.h1}>Accessibility statement for <a href={URL} style={styles.link} style={styles.link}>{websiteName}</a></h1>
            <p>Website accessibility statement inline with Public Sector Body (Websites and Mobile Applications) (No. 2)
                Accessibility Regulations 2018</p>
            <p>This accessibility statement applies to:</p>
            <p><a href={URL} style={styles.link} style={styles.link}>{URL}</a></p>
            <p>This website is run by, Library and University Collections Directorate, Information Services Group at the
                University of Edinburgh. We want as many people as possible to be able to use this application. For
                example, that means you should be able to:</p>
            <ul>
                {whatUserCanDo.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <p>We’ve
                also made the website text as simple as possible to understand.
                However, some of our content is technical, and we use technical terms
                where there is no easier wording we could use without changing what
                the text means.</p>
            <p>

            </p>
            <h2 style={styles.h2}>Customising the website</h2>
            <p>
                AbilityNet
                has advice on making your device easier to use if you have a
                disability. This is an external site with suggestions to make your
                computer more accessible:</p>
            <p><a href="https://mcmw.abilitynet.org.uk/" style={styles.link}>AbilityNet
                - My Computer My Way</a></p>
            <p>With
                a few simple steps you can customise the appearance of our website
                using your browser settings to make it easier to read and navigate:</p>
            <p><a href="https://www.ed.ac.uk/about/website/accessibility/customising-site"
                  target="Customising our site"  style={styles.link}>Additional
                information on how to customise our website appearance</a></p>
            <p>If
                you are a member of University staff or a student, you can use the free SensusAccess accessible document
                conversion service:</p>
            <p><a
                href="https://www.ed.ac.uk/student-disability-service/staff/supporting-students/accessible-technology"  style={styles.link}>Information
                on SensusAccess</a></p>
            <h2 style={styles.h2}>How accessible this website is</h2>
            <p>We know some parts of this website are not fully accessible:</p>
            <ul>
                {howAccessible.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <h2 style={styles.h2}>Feedback and contact information</h2>
            <p>If
                you need information on this website in a different format, including
                accessible PDF, large print, audio recording or braille please
                contact us:
            </p>
            <ul>
                <li>Or phoning:</li>
                <ul>
                    <li>+44 (0)131 651 5151</li>
                </ul>
            </ul>

            <ul>
                <li>Or email:</li>
                <ul>
                    <li><a href="mailto:Information.systems@ed.ac.uk"  style={styles.link}>Information.systems@ed.ac.uk</a></li>
                </ul>
            </ul>

            <p>British Sign Language (BSL) users can contact us via&nbsp;Contact Scotland
                BSL, the on-line BSL interpreting service:</p>
            <p>
                <a href="https://contactscotland-bsl.org/"  style={styles.link}>Contact
                    Scotland BSL</a>
            </p>
            <p>We’ll consider your request and get back to you in 5 working days.</p>
            <h2 style={styles.h2}>Reporting accessibility problems with this website</h2>
            <p>
                We are always looking to improve the accessibility of this website. If
                you find any problems not listed on this page, or think we’re not
                meeting accessibility requirements, please contact us:&nbsp;
            </p>
            <ul>
                <li>Or phoning:</li>
                <ul>
                    <li>+44 (0)131 651 5151</li>
                </ul>
            </ul>

            <ul>
                <li>Or email:</li>
                <ul>
                    <li><a href="mailto:Information.systems@ed.ac.uk"  style={styles.link}>Information.systems@ed.ac.uk</a></li>
                </ul>
            </ul>
            <p>
                British Sign Language (BSL) users can
                contact us via&nbsp;Contact Scotland BSL, the on-line BSL
                interpreting service:
            </p>
            <p>
                <a href="https://contactscotland-bsl.org/"  style={styles.link}>Contact
                    Scotland BSL</a>
            </p>
            <p>We
                will consider your request and get back to you in 5 working days.</p>

            <h2 style={styles.h2}>Enforcement procedure</h2>
            <p>
                The
                Equality and Human Rights Commission (EHRC) is responsible for
                enforcing the Public Sector Bodies (Websites and Mobile Applications)
                (No. 2) Accessibility Regulations 2018 (the ‘accessibility
                regulations’). If you’re not happy with how we respond to your
                complaint please contact the Equality Advisory and Support Service
                (EASS) directly:</p>
            <p><a href="https://www.equalityadvisoryservice.com/"  style={styles.link}>Contact
                details for the Equality Advisory and Support Service (EASS)</a></p>

            <p>The
                government has produced information on how to report accessibility
                issues:</p>
            <p><a href="https://www.gov.uk/reporting-accessibility-problem-public-sector-website" style={styles.link}>Reporting
                an accessibility problem on a public sector website</a></p>

            <h2 style={styles.h2}>Contacting us by phone using British Sign Language Service</h2>
            <p>
                British
                Sign Language service</p>
            <p>Contact
                Scotland BSL runs a service for British Sign Language users and all
                of Scotland’s public bodies using video relay. This enables sign
                language users to contact public bodies and vice versa. The service
                operates from 8.00am to 12.00am, 7 days a week.</p>
            <p><a href="https://contactscotland-bsl.org/"  style={styles.link}>Contact
                Scotland BSL service details.</a></p>

            <h2 style={styles.h2}>Technical information about this website’s accessibility</h2>
            <p>The
                University of Edinburgh is committed to making its websites and
                applications accessible, in accordance with the Public Sector Bodies
                (Websites and Mobile Applications) (No. 2) Accessibility Regulations
                2018.</p>
            <h2 style={styles.h2}>Compliance Status</h2>
            <p>This website is partially compliant with the Web Content Accessibility Guidelines (WCAG) 2.2 AA standard,
                due to
                the non-compliances listed below.</p>
            <p>The
                full guidelines are available at:</p>
            <p><a href="https://www.w3.org/TR/WCAG22/"  style={styles.link}>Web
                Content Accessibility Guidelines (WCAG) 2.2 AA standard</a></p>

            <h2 style={styles.h2}>Non accessible content</h2>
            <p>The
                content listed below is non-accessible for the following reasons.</p>

            <h3 style={styles.h3}>Noncompliance with the accessibility regulations
            </h3>
            <p>The
                following items to not comply with the WCAG 2.2 AA success criteria:</p>


            <ul>
                <li>Not all non-text items presented to users has alternative text</li>
                <ul>
                    <li><a href="https://www.w3.org/TR/WCAG22/#non-text-content"  style={styles.link}>1.1.1 - Non Text Content</a></li>
                </ul>
            </ul>

            <ul>
                <li>The site has functionality issues in portrait mode on Android devices</li>
                <ul>
                    <li><a href="https://www.w3.org/TR/WCAG22/#orientation"  style={styles.link}>1.3.4 - Orientation</a></li>
                </ul>
            </ul>

            <ul>
                <li>Some hyperlinks are conveyed with colour only</li>
                <ul>
                    <li><a href="https://www.w3.org/TR/WCAG22/#use-of-color"  style={styles.link}>1.4.1 - Use of Colour</a></li>
                </ul>
            </ul>
            <ul>
                <li>Some text may not have sufficient colour contrast between font and background colours</li>
                <ul>
                    <li><a href="https://www.w3.org/TR/WCAG22/#contrast-minimum"  style={styles.link}>1.4.3 - Contrast (Minimum)</a></li>
                </ul>
            </ul>

            <ul>
                <li>Some items are examples of text as an image and do not contain the appropriate alternative text</li>
                <ul>
                    <li><a href="https://www.w3.org/TR/WCAG22/#images-of-text"  style={styles.link}>1.4.5 - Images of Text</a></li>
                </ul>
            </ul>

            <ul>
                <li>Reflow is not operational up to 400%</li>
                <ul>
                    <li><a href="https://www.w3.org/TR/WCAG22/#reflow"  style={styles.link}>1.4.10 - Reflow</a></li>
                </ul>
            </ul>
            <ul>
                <li>No skip to main content button is enabled on some pages of the site</li>
                <ul>
                    <li><a href="https://www.w3.org/TR/WCAG22/#bypass-blocks"  style={styles.link}>2.4.1 - Bypass Blocks</a></li>
                </ul>
            </ul>
            <ul>
                <li>Some links do not contain meaningful hypertext to inform the user of their target location</li>
                <ul>
                    <li><a href="https://www.w3.org/TR/WCAG22/#link-purpose-in-context"  style={styles.link}>2.4.4 - Link Purpose (In
                        Context)</a>
                    </li>
                </ul>
            </ul>
            <ul>
                <li>Headings are not formatted correctly and some heading levels are missed, which affects screen reader
                    software
                </li>
                <ul>
                    <li><a href="https://www.w3.org/TR/WCAG22/#headings-and-labels"  style={styles.link}>2.4.6 - Headings and Labels</a></li>
                </ul>
            </ul>
            <ul>
                <li>It is not always clear where you have tabbed to using a keyboard</li>
                <ul>
                    <li><a href="https://www.w3.org/TR/WCAG22/#focus-visible"  style={styles.link}>2.4.7 - Focus Visible</a></li>
                </ul>
            </ul>
            <ul>
                <li>Some hyperlinks open link in new tab / window, and some pop-ups do not alert the user this will
                    happen
                </li>
                <ul>
                    <li><a href="https://www.w3.org/TR/WCAG22/#on-input"  style={styles.link}>3.2.2 - On Input</a></li>
                </ul>
            </ul>
            <ul>
                <li>Help such as contact us and the chat function are not located in the same place on every page.</li>
                <ul>
                    <li><a href="https://www.w3.org/TR/WCAG22/#consistent-help" style={styles.link}>3.2.6 - Consistent Help</a></li>
                </ul>
            </ul>
            <ul>
                <li>The website is not fully compatible with assistive software e.g. – using assistive software it is
                    not possible to reach all content
                </li>
                <ul>
                    <li><a href="https://www.w3.org/TR/WCAG22/#name-role-value" style={styles.link}>4.1.2 - Name, Role, Value</a></li>
                </ul>
            </ul>
            <p>We
                aim to improve our websites accessibility on a regular and continuous
                basis. See the section below ('What we're doing to improve
                accessibility') on how we are improving our site accessibility.
            </p>
            <p>We
                are working towards solving these problems and expect significant
                improvements by {improveTargetDate}. The site is fully within our control.</p>
            <h3 style={styles.h3}>Disproportionate burden</h3>
            <p>
                We
                are not currently claiming that any accessibility problems would be a
                disproportionate burden to fix.</p>
            <h3 style={styles.h3}>Content that’s not within the scope of the accessibility regulations</h3>
            <p>At
                this time we believe no content is outwith the scope of the accessibility regulations.</p>
            <h2 style={styles.h2}>What we’re doing to improve accessibility</h2>
            <p>We will continue to address and make significant improvements to the accessibility issues highlighted.
                Unless specified otherwise, a complete solution or significant improvement will be in place
                by {testDate}.
            </p>
            <p>
                While we are in the process of resolving these accessibility issues we will ensure reasonable
                adjustments are in place to make sure no user is disadvantaged. As changes are made, we will continue to
                review accessibility and retest the accessibility of this website.
            </p>
            <h2 style={styles.h2}>Preparation of this accessibility statement</h2>
            <p><b>This statement was prepared on {prepareDate}. It was last reviewed on {reveiewDate}. The website
                was last
                tested in {testDate}.</b></p>
            <p>The
                testing was carried out by the Library
                and University Collections Directorate which is part of Information
                Services Group at the University of Edinburgh using
                both automated and manual methods. The site was tested on a PC,
                primarily using Microsoft Edge alongside Mozilla Firefox and Google
                Chrome.</p>
            <p>Recent
                world-wide usage levels survey for different screen readers and
                browsers shows that Chrome, Mozilla Firefox and Microsoft Edge are
                increasing in popularity and Google Chrome is now the favoured
                browser for screen readers:</p>
            <p><a href="https://webaim.org/projects/screenreadersurvey9/" style={styles.link}>WebAIM:
                Screen Reader User Survey</a></p>
            <p>The
                aforementioned three browsers have been used in certain questions for
                reasons of breadth and variety.</p>
            <p>We
                ran automated testing using <a href="https://wave.webaim.org/" style={styles.link}>WAVE
                    WebAIM</a> and AXE and
                then manual testing that included:</p>
            <ul>
                <li>Spell
                    check functionality;
                </li>
                <li>Scaling
                    using different resolutions and reflow;
                </li>
                <li>Options
                    to customise the interface (magnification, font, background colour,
                    etc);
                </li>
                <li>Keyboard
                    navigation and keyboard traps;
                </li>
                <li>Data
                    validation;
                </li>
                <li>Warning
                    of links opening in new tab or window;
                </li>
                <li>Information
                    conveyed in the colour or sound only;
                </li>
                <li>Flashing,
                    moving or scrolling text;
                </li>
                <li>Use
                    with screen reading software (for example JAWS);
                </li>
                <li>Assistive
                    software (TextHelp Read and Write, Windows Magnifier, ZoomText,
                    Dragon Naturally Speaking, TalkBack and VoiceOver);
                </li>
                <li>Tooltips
                    and text alternatives for any non-text content;
                </li>
                <li>Time
                    limits;
                </li>
                <li>Compatibility
                    with mobile accessibility functionality (Android and iOS).
                </li>
                <li>Any
                    drag functionality and alternatives
                </li>
                <li>Consistent
                    help function
                </li>
                <li>No
                    need to re enter data already submitted
                </li>
                <li>Any
                    cognitive tests
                </li>
            </ul>
            <h2 style={styles.h2}>Change Log</h2>
            <p>Since our initial report, we have undertaken more extensive manual testing with assistive software to get
                a better understanding of the accessibility issues on this website. This section will receive updates as
                and when accessibility improvements are made to the website.</p>

        </div>
    )
};

export default AccessibilityStatement;
