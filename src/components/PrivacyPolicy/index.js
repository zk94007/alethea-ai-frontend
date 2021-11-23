import React from 'react';
import './styles.scss';
import {Close as CloseIcon} from '@material-ui/icons';

export default function PrivacyPolicy({onClose}) {
  return (
    <div className="container">
      <div className="d-flex flex-column mx-md-3">
        <h2 className="font-weight-semi-bold mb-2 mb-md-4 mt-4 text-center text-md-left">
          Privacy Policy
          <div className="float-right cursor-pointer" onClick={onClose}>
            <CloseIcon />
          </div>
        </h2>
        <label className="my-2">
          This privacy policy is designed to serve those who are interested in how their information is used online.
          Read the privacy policy carefully to get a clear picture of how we collect, use, protect, or otherwise process
          your personal information in accordance with our website.
        </label>
        <label className="my-2">
          When you visit our website, you may be asked to enter your name, email address, or other information in order
          to provide the requested services. In addition, information is collected if you post a comment, sign up for
          the newsletter, participate in a research, or fill in a form. This is usually also information such as your
          name and email address.
        </label>
        <label className="my-2">This information is used in the following ways:</label>
        <li>to answer you when you ask a question;</li>
        <li>to personalize your experience and to understand what works best on our website for visitors;</li>
        <li>to offer a promotion, research, or other feature.</li>
        <label className="my-2">
          Your information that you provide through the website will be taken care of. Your data will not be sold to
          third parties. We also scan our website regularly for malware and we take care of security. We process all
          information and data according to legal standards.
        </label>
        <h3 className="my-2">Do we use ‘cookies’?</h3>
        <label className="my-2">
          Yes. We use functional, performance, analytical and profiling cookies. Cookies are small files transferred by
          a website or service provider to your computer’s hard drive through your web browser (if you allow this),
          allowing the website or service provider to recognize your browser and capture and remember certain
          information. For example, cookies may be used to help remind and process the items in your shopping cart. They
          are also used to help us understand your preferences based on past or current site activities, enabling us to
          provide you with enhanced services. We also use cookies to help us aggregate data traffic and site interaction
          data so that we can provide better site experiences and tools in the future. In addition, we use cookies to
          track our ads and marketing efforts.
        </label>
        <label className="my-2">
          You can choose to set a notification that warns you every time a cookie is sent, or you can choose to disable
          all cookies. You do this through your browser settings. As each browser works differently, check the browser’s
          help menu to find the right way to change your cookie preferences. If you turn off cookies in your browser,
          some features that make your site experience more efficient may not work properly. Some features make your
          site experience more efficient and may not work well if you turn them off.
        </label>
        <h3 className="my-2">Disclaimer third parties</h3>
        <label className="my-2">
          We will never sell, trade and transfer your personally identifiable information to third parties unless you
          have been explicitly informed about this. This is excluding third parties that support business operations as
          long as they have agreed that this information is kept confidential (e.g. hosting or newsletter). We can,
          however, release information when it is appropriate to comply with the law or to protect the safety of others.
        </label>
        <h3 className="my-2">Third party links</h3>
        <label className="my-2">
          Occasionally we can place links to third party partners, products or services on our website. These
          third-party sites have their own and independent privacy policy. We therefore have no responsibility or
          liability for the content and activities of these linked sites. Nevertheless, we strive to protect the
          integrity of our site and welcome all feedback on these sites.
        </label>
        <h3 className="my-2">Google</h3>
        <label className="my-2">
          We use Google Analytics to track website activity on Alethea.AI. We also use Google’s invisible reCAPTCHA
          technology to prevent bots from spamming our website. In order to make this possible, Google collects data and
          stores cookies to verify that you are not a bot. The use of the invisible reCAPTCHA technology is subject to
          Google’s privacy policy and terms of use.
        </label>
        <h3 className="my-2">Changes to Company’s Privacy Policy:</h3>
        <label className="my-2">
          The Services and our business may change from time to time. As a result, at times it may be necessary for
          Company to make changes to this Privacy Policy. Company reserves the right to update or modify this Privacy
          Policy at any time and from time to time without prior notice. Please review this policy periodically, and
          especially before you provide any Personal Data. Your continued use of the Services after any changes or
          revisions to this Privacy Policy shall indicate your agreement with the terms of such revised Privacy Policy.
        </label>
        <h3 className="my-2">Access to Information; Contacting Company:</h3>
        <label className="my-2">
          To keep your Personal Data accurate, current, and complete, please contact us as specified below. We will take
          reasonable steps to update or correct Personal Data in our possession that you have previously submitted via
          the Services.
        </label>
        <label className="my-2">
          Please also feel free to contact us if you have any questions about the Company’s Privacy Policy or the
          information practices of the Services.
        </label>
        <label className="my-2">You may contact us at: info@alethea.ai.</label>
        <h3 className="my-2">Disclaimer</h3>
        <label className="my-2">
          The materials on this website are provided on an “as is” basis. Alethea.AI makes no representations or
          warranties, expressed or implied, and hereby denies any other liability, including and without limitation,
          implied warranties or terms of merchantability, fitness for a particular purpose or non-infringement of
          intellectual property or other infringement of rights.
        </label>
        <h3 className="my-2">Access to Information; Contacting Company:</h3>
        <label className="my-2">
          To keep your Personal Data accurate, current, and complete, please contact us as specified below. We will take
          reasonable steps to update or correct Personal Data in our possession that you have previously submitted via
          the Services.
        </label>
        <label className="mt-2 mb-5 pb-5">
          Furthermore, Alethea.AI does not warrant the accuracy, likely results or reliability of the use of the
          materials on her website or other sites related to this site or other sites related to this site.
        </label>
      </div>
    </div>
  );
}
