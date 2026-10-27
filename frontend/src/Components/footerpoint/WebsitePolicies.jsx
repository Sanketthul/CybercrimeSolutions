import React from "react";
import "./dis/WebsitePolicies.css";
import { Footer } from "../Footer/Footer";
export const WebsitePolicies = () => {
  return (
    <>
      <div className="web">
        <div className="webh">
          <h1>Website Policies</h1>
          <h2>1.Copyright Policy</h2>
          <p>
            The contents of this website may not be reproduced partially or
            fully, without due permission from Cyber Crime Solutions. If
            referred to as a part of another publication, the source must be
            appropriately acknowledged. The contents of this website can not be
            used in any misleading or objectionable context.
          </p>
          <h2>2.Hyperlinking Policy Links to external websites/portals</h2>
          <p>
            At many places in this Website, you shall find links to other
            websites/portals. This links have been placed for your convenience.
            [Department] is not responsible for the contents and reliability of
            the linked websites and does not necessarily endorse the views
            expressed in them. Mere presence of the link or its listing on this
            website should not be assumed as endorsement of any kind. We can not
            guarantee that these links will work all the time and we have no
            control over availability of linked pages.
          </p>
          <h2>3.Privacy Policy</h2>
          <p>
            As a general rule, this website does not collect Personal
            Information about you when you visit the site. You can generally
            visit the site without revealing Personal Information, unless you
            choose to provide such information.
          </p>
          <h2>4.Cookies</h2>
          <p>
            A cookie is a piece of software code that an internet web site sends
            to your browser when you access information at that site. This site
            does not use cookies.
          </p>
          <h2>5.Email management</h2>
          <p>
            Your email address will only be recorded if you choose to send a
            message. It will only be used for the purpose for which you have
            provided it and will not be added to a mailing list. Your email
            address will not be used for any other purpose, and will not be
            disclosed, without your consent.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};
