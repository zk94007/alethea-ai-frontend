import React from 'react';
import './styles.scss';
import {Close as CloseIcon} from '@material-ui/icons';

export default function TermsService({onClose}) {
  return (
    <div className="container">
      <div className="d-flex flex-column mx-md-3">
        <h2 className="font-weight-semi-bold mb-2 mb-md-4 mt-4 text-center text-md-left">
          Terms of Service and Disclaimers
          <div className="float-right cursor-pointer" onClick={onClose}>
            <CloseIcon />
          </div>
        </h2>
        <label className="gray-color w-100 text-right">Last amended: Feb, 29th, 2020</label>
        <h5 className="mt-2 mt-md-3">
          Welcome to Alethea.ai, a website of Alethea AI. (“Alethea AI”, “we”, “our”, or “us”).
        </h5>
        <label className="my-2">
          This page explains the terms by which you may use our website (the “Site”) and lists the disclaimers (the
          “Disclaimers”). By accessing or using the Site, you signify that you have read, understood, and agree to be
          bound by this Terms of Service Agreement (“Agreement”), and that you acknowledge the Disclaimers, whether or
          not you are a registered user of our Site. Alethea AI reserves the right to make unilateral modifications to
          these terms and will provide notice of these changes as described below. This Agreement applies to all
          visitors, users, and others who access the Site (“Users”).
        </label>
        <label className="my-2">
          Please read this Agreement carefully to ensure that you understand each provision. This agreement contains a
          mandatory individual arbitration and class action/jury trial waiver provision that requires the use of
          arbitration on an individual basis to resolve disputes, rather than jury trials or class actions.
        </label>
        <h3 className="my-2">Alethea AI Site.</h3>
        <label className="my-2">
          As part of the Site, Alethea AI provides access to a decentralized staking and reward tool (“Protocol”) on the
          Ethereum blockchain, that allows participants to use Ethereum assets (“Assets”) to transact using smart
          contracts (“Smart Contracts”).
        </label>
        <h3 className="my-2">Use of Our Site.</h3>
        <h4 className="my-2">Eligibility</h4>
        <label className="my-2">
          This is a contract between you and Alethea AI. You must read and agree to these terms before using the Site.
          If you do not agree, you may not use the Site. You may use the Site only if you can form a binding contract
          with Alethea AI, and only in compliance with this Agreement and all applicable local, state, national, and
          international laws, rules and regulations. Any use or access to the Site by anyone under eighteen (18) years
          of age is strictly prohibited and in violation of this Agreement. The Site is not available to any Users
          previously removed from the Site by Alethea AI.
        </label>
        <h4 className="my-2">Access and Use of the Site and Smart Contracts</h4>
        <label className="my-2">
          Subject to the terms and conditions of this Agreement, you are hereby granted a non-exclusive, limited,
          non-transferable, freely revocable license to use the Site as permitted by the features of the Site. Alethea
          AI reserves all rights not expressly granted herein in the Site and the Alethea AI Content (as defined below).
          Alethea AI may terminate this license, in whole or in part, at any time for any reason or no reason.
        </label>
        <h4 className="my-2">Site Rules</h4>
        <h5 className="my-2">You agree not to engage in any of the following prohibited activities:</h5>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(i)</label>
          <label>
            copying, distributing, or disclosing any part of the Site in any medium, including without limitation by any
            automated or non-automated “scraping”;
          </label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(ii)</label>
          <label>
            using any automated system, including without limitation “robots,” “spiders,” “offline readers,” etc., to
            access the Site in a manner that sends more request messages to the Alethea AI servers than a human can
            reasonably produce in the same period of time by using a conventional on-line web browser (except that
            Alethea AI grants the operators of public search engines revocable permission to use spiders to copy
            publicly available materials from Alethea.ai for the sole purpose of and solely to the extent necessary for
            creating publicly available searchable indices of the materials, but not caches or archives of such
            materials);
          </label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(iii)</label>
          <label>transmitting spam, chain letters, or other unsolicited email;</label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(iv)</label>
          <label>
            attempting to interfere with, compromise the system integrity or security or decipher any transmissions to
            or from the servers running the Site;
          </label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(v)</label>
          <label>
            taking any action that imposes, or may impose at our sole discretion an unreasonable or disproportionately
            large load on our infrastructure;
          </label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(vi)</label>
          <label>uploading invalid data, viruses, worms, or other software agents through the Site;</label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(vii)</label>
          <label>
            collecting or harvesting any personally identifiable information, including account names, from the Site;
          </label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(viii)</label>
          <label>using the Site for any commercial solicitation purposes;</label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(ix)</label>
          <label>
            impersonating another person or otherwise misrepresenting your affiliation with a person or entity,
            conducting fraud, hiding or attempting to hide your identity;
          </label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(x)</label>
          <label>interfering with the proper working of the Site;</label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(xi)</label>
          <label>
            accessing any content on the Site through any technology or means other than those provided or authorized by
            the Site; or
          </label>
        </div>
        <div className="mt-1 mb-2 d-flex flex-row">
          <label className="font-weight-medium sub-index">(xii)</label>
          <label>
            bypassing the measures we may use to prevent or restrict access to the Site, including without limitation
            features that prevent or restrict use or copying of any content or enforce limitations on use of the Site or
            the content therein.
          </label>
        </div>
        <label className="my-2">
          We may, without prior notice, change the Site; stop providing the Site or features of the Site, to you or to
          Users generally; or create usage limits for the Site. We may permanently or temporarily terminate or suspend
          your access to the Site without notice and liability for any reason, including if in our sole determination
          you violate any provision of this Agreement, or for no reason. Upon termination for any reason or no reason,
          you continue to be bound by this Agreement.
        </label>
        <label className="my-2">
          You are solely responsible for your interactions with other Alethea AI Users and Protocol Users. We reserve
          the right, but have no obligation, to monitor disputes between you and other Users. Alethea AI shall have no
          liability for your interactions with other Users, or for any User’s action or inaction.
        </label>
        <h4 className="my-2">Description of Services</h4>
        <label className="my-2">
          Our Site uses artificial intelligence algorithms to generate unique content (Services). You may use Site
          immediately with no registration form being submitted.
        </label>
        <label className="my-2">
          <b>Uploaded Content:</b> Any content uploaded by the users from their devices, or other sources.
        </label>
        <label className="my-2">
          <b>Generated Content:</b> Any content created by using Alethea AI algorithms.
        </label>
        <label className="my-2">
          <b> Subscription. </b>Alethea AI retains a right to introduce some Services, which will be available only for
          paid subscribers. The subscription begins after the initial payment is processed. The payment should be
          performed via the method and in the amount indicated at the time of the purchase. You are responsible for
          payment of all fees, charges and taxes (if required by law) related to the transaction.
        </label>
        <label className="my-2">
          Please note that subscriptions would be non-returnable and non-transferable. You might cancel your
          subscription at any time, but no refunds would be paid on any remaining subscription period.
        </label>
        <label className="my-2">
          Scope of the Services. Alethea AI reserves the right to change the Services scope listed herein and
          change/introduce prices and fees applicable to the Services at any time for any reason in its sole discretion
          and without notice. Alethea AI is entitled to stop or restrict provision of the Services in full or in part
          toward a certain user. Alethea AI retains powers to discontinue provision and/or support of the Services
          without any prior notice.
        </label>
        <h4 className="my-2">User Content</h4>
        <label className="my-2">
          Our services may allow you to use the services with the Uploaded content, as well as to create, post, store
          and share the Generated content. The Uploaded and the Generated content is your intellectual property. Except
          for the license you grant below, you retain all rights in and to your content. Alethea AI does not claim
          ownership of any user content.
        </label>
        <label className="my-2">
          You hereby grant Alethea AI a non-exclusive, worldwide, royalty-free, sublicensable, and transferable license
          to host, store, use in any way, display, reproduce, modify, adapt, edit, publish, and distribute Uploaded and
          Generated content. This license is for the limited purpose of operating, developing, providing, and improving
          the Services, and displaying Uploaded content in the library for the User’s repeated use.
        </label>
        <label className="my-2">
          The Generated content may be public, so the license you grant us for this content is broader. In addition to
          granting us the rights mentioned in the previous paragraph, you also grant us a perpetual license to create
          derivative works from, exhibit, broadcast, publicly perform, and publicly display the Generated content in any
          form and in any and all media or distribution methods.
        </label>
        <label className="my-2">
          You acknowledge and agree that we may generate revenues, increase goodwill or otherwise increase our value
          from your use of the Site, including, but not limited to, through the sale of advertising, sponsorships,
          promotions, usage data. You further acknowledge that, except as specifically permitted by us in these Terms or
          in another agreement you enter into with us, you
        </label>
        <div className="mt-1 mb-2 d-flex flex-row">
          <label className="font-weight-medium sub-index">(i)</label>
          <label className="font-sm">
            have no right to receive any income or other consideration from any user content or your use of any
            materials made available to you on or through the Site, including in any user content created by you, and
          </label>
        </div>
        <div className="mt-1 mb-2 d-flex flex-row">
          <label className="font-weight-medium sub-index">(ii)</label>
          <label className="font-sm">
            are prohibited from exercising any rights to monetize or obtain consideration from any User Content within
            the Services or on any third party service.
          </label>
        </div>
        <label className="my-2">
          You warrant that your content does not and will not violate third-party rights of any kind, including without
          limitation any intellectual property rights or rights of privacy or publicity. You hereby represent that you
          are the owner of the copyright with respect to all your content and have the power to grant the license to
          Alethea AI as set forth herein.
        </label>
        <label className="my-2">
          You hereby acknowledge that you are entitled to delete any of the Uploaded content from your profile gallery,
          but it shall not cause revoking of the license granted to Alethea AI.
        </label>
        <label className="my-2">
          If you share the Generated content publicly through the Services or in any other way, you acknowledge that
          such content will be accessible to others. Any content will be considered non-confidential and
          non-proprietary. You must not post any content on or through the Site or transmit to us any content that you
          consider to be confidential or proprietary. Please do not publicly post or submit any user content that you do
          not want to be publicly accessible or viewable, or that you do not have rights to post.
        </label>
        <h3 className="my-2">Our Proprietary Rights.</h3>
        <label className="my-2">
          The Site and all materials therein or transferred thereby, including, without limitation, software, images,
          text, graphics, illustrations, logos, patents, trademarks, service marks, copyrights, photographs, audio,
          videos, music, and User Content belonging to other Users (the “Alethea AI Content”), and all Intellectual
          Property Rights related thereto, are the exclusive property of Alethea AI and its licensors. Except as
          explicitly provided herein, nothing in this Agreement shall be deemed to create a license in or under any such
          Intellectual Property Rights, and you agree not to sell, license, rent, modify, distribute, copy, reproduce,
          transmit, publicly display, publicly perform, publish, adapt, edit or create derivative works from any Alethea
          AI Content. Use of the Alethea AI Content for any purpose not expressly permitted by this Agreement is
          strictly prohibited.
        </label>
        <label className="my-2">
          You may choose to or we may invite you to submit comments or ideas about the Site, including without
          limitation about how to improve the Site or our products (“Ideas”). By submitting any Idea, you agree that
          your disclosure is gratuitous, unsolicited and without restriction and will not place Alethea AI under any
          fiduciary or other obligation, and that we are free to use the Idea without any additional compensation to
          you, and/or to disclose the Idea on a non-confidential basis or otherwise to anyone. You further acknowledge
          that, by acceptance of your submission, Alethea AI does not waive any rights to use similar or related ideas
          previously known to Alethea AI, or developed by its employees, or obtained from sources other than you.
        </label>
        <h4 className="my-2">Prohibited Conduct and Content</h4>
        <label className="my-2">
          You may only use the Site and its contents for lawful purposes. You will not violate any applicable law,
          contract, intellectual property or other third-party rights. You are solely responsible for your conduct while
          accessing or using our Site, as well as for all content you upload, share or otherwise transmit to or via the
          Site.
        </label>
        <h5 className="my-2">
          While using the Site you may not, and may not encourage, authorize, or assist others to:
        </h5>
        <div className="my-2 d-flex flex-row">
          <label className="font-weight-semi-bold mx-2">(a)</label>
          <label>engage in any harassing, threatening, intimidating, predatory or stalking conduct;</label>
        </div>
        <div className="my-2 d-flex flex-row">
          <label className="font-weight-semi-bold mx-2">(b)</label>
          <label>
            use our Site in any manner that could interfere with, disrupt, negatively affect or inhibit other users from
            fully enjoying our Site or that could damage, disable, overburden or impair the functioning of our Site in
            any manner, including by submitting a virus, worm, or Trojan horse;
          </label>
        </div>
        <div className="my-2 d-flex flex-row">
          <label className="font-weight-semi-bold mx-2">(c)</label>
          <label>
            reverse engineer, decompile, disassemble, or in any way access or attempt to access the source code of the
            Services or attempt to study or test the vulnerability of the Services or to breach any security measures,
            regardless of your motives and/or intent;
          </label>
        </div>
        <div className="my-2 d-flex flex-row">
          <label className="font-weight-semi-bold mx-2">(d)</label>
          <label>
            attempt to circumvent any measures employed to limit access to any part of our Site, or attempt to access
            any feature or area of our Site that you are not authorized to access;
          </label>
        </div>
        <div className="my-2 d-flex flex-row">
          <label className="font-weight-semi-bold mx-2">(e)</label>
          <label>
            develop or use any third-party applications that interact with our Site without our prior written consent,
            including any scripts designed to scrape or extract data from our Site, or intercept any system data,
            personal information, or other data relating to the Site,
          </label>
        </div>
        <div className="my-2 d-flex flex-row">
          <label className="font-weight-semi-bold mx-2">(f)</label>
          <label>
            use our Site for any illegal or unauthorized purpose, or engage in, encourage or promote any activity that
            violates these Terms.
          </label>
        </div>
        <h5 className="my-2">
          You may not upload, share or otherwise transmit to or via the Services any content that:
        </h5>
        <div className="my-2 d-flex flex-row">
          <label className="font-weight-semi-bold mx-2">(a)</label>
          <label>
            is unlawful, harmful, libelous, defamatory, obscene, abusive, racially or ethnically offensive,
            pornographic, indecent, lewd, harassing, threatening, invasive of personal privacy or publicity rights, or
            otherwise objectionable;
          </label>
        </div>
        <div className="my-2 d-flex flex-row">
          <label className="font-weight-semi-bold mx-2">(b)</label>
          <label>
            would constitute, encourage or provide instructions for a criminal offense, violate the rights of any party
            or otherwise create liability or violate any local, state, national or international law;
          </label>
        </div>
        <div className="my-2 d-flex flex-row">
          <label className="font-weight-semi-bold mx-2">(c)</label>
          <label>
            may infringe any patent, trademark, trade secret, copyright or other intellectual or proprietary right of
            any party;
          </label>
        </div>
        <div className="my-2 d-flex flex-row">
          <label className="font-weight-semi-bold mx-2">(d)</label>
          <label>contains any unsolicited promotions, political campaigning, advertising or solicitations;</label>
        </div>
        <div className="my-2 d-flex flex-row">
          <label className="font-weight-semi-bold mx-2">(e)</label>
          <label>
            contains any private or personal information of a third party without such third party’s consent;
          </label>
        </div>
        <div className="my-2 d-flex flex-row">
          <label className="font-weight-semi-bold mx-2">(f)</label>
          <label>
            may harm or exploit children by exposing them to inappropriate content, asking for personally identifiable
            details or otherwise;
          </label>
        </div>
        <div className="my-2 d-flex flex-row">
          <label className="font-weight-semi-bold mx-2">(g)</label>
          <label>
            contains any viruses, corrupted data or other harmful, disruptive or destructive files or content, designed
            to interrupt, destroy or limit the functionality of the Site;
          </label>
        </div>
        <div className="my-2 d-flex flex-row">
          <label className="font-weight-semi-bold mx-2">(h)</label>
          <label>
            contains any information or content that you do not have a right to make available under any law or under
            contractual or fiduciary relationships (e.g., inside information, confidential information received in the
            context of an employment or a non-disclosure agreement); or
          </label>
        </div>
        <div className="my-2 d-flex flex-row">
          <label className="font-weight-semi-bold mx-2">(i)</label>
          <label>
            is, in our sole judgment, objectionable or that restricts or inhibits any other person from using or
            enjoying our Site, or that may expose Alethea AI or others to any harm or liability of any type.
          </label>
        </div>
        <label className="my-2">
          Alethea AI reserves the right, but is not obligated, to reject and/or remove any user content that Alethea AI
          believes, in its sole discretion, violates these provisions.
        </label>
        <h3 className="my-2">No Professional Advice.</h3>
        <label className="my-2">
          If the Site provides professional information (for example, medical, legal, or financial), such information is
          for informational purposes only and should not be construed as professional advice. No action should be taken
          based upon any information contained in the Site. You should seek independent professional advice from a
          person who is licensed and/or qualified in the applicable area.
        </label>
        <h3 className="my-2">Security.</h3>
        <label className="my-2">
          We care about the privacy of our Users. You can read our full privacy policy here.
        </label>
        <h3 className="my-2">Privacy.</h3>
        <label className="my-2">
          Alethea AI uses commercially reasonable physical, managerial, and technical safeguards to preserve the
          integrity and security of your personal information and implement your privacy settings. However, we cannot
          guarantee that unauthorized third parties will never be able to defeat our security measures or use your
          personal information for improper purposes. You acknowledge that you provide your personal information at your
          own risk.
        </label>
        <h3 className="my-2">Third-Party Links and Information.</h3>
        <label className="my-2">
          The Site may contain links to third-party materials that are not owned or controlled by Alethea AI. Alethea AI
          does not endorse or assume any responsibility for any such third-party sites, information, materials,
          products, or services. If you access a third-party website or service from the Site on or through any
          third-party website or service, you do so at your own risk, and you understand that this Agreement and Alethea
          AI Privacy Policy do not apply to your use of such sites. You expressly relieve Alethea AI from any and all
          liability arising from your use of any third-party website, service, or content. Additionally, your dealings
          with or participation in promotions of advertisers found on the Site, including payment and delivery of goods,
          and any other terms (such as warranties) are solely between you and such advertisers. You agree that Alethea
          AI shall not be responsible for any loss or damage of any sort relating to your dealings with such
          advertisers.
        </label>
        <h4 className="my-2">Copyright Complaints</h4>
        <label className="my-2">
          Alethea AI respects the intellectual property rights of others and expects its Users/Community Members to do
          the same. Alethea AI will respond expeditiously to claims of copyright infringement committed using the
          Services if such claims are reported to Alethea AI.
        </label>
        <label className="my-2">
          If you are a copyright owner, authorized to act on behalf of one, or authorized to act under any exclusive
          right under copyright, please report alleged copyright infringements by submitting a copyright infringement
          notification to the e-mail: info@alethea.ai
        </label>
        <h5 className="my-2">The notification must include the following:</h5>
        <div className="my-2 d-flex flex-row">
          <label className="font-weight-semi-bold mx-2">(a)</label>
          <label>an email address, physical address or phone number so that we can contact you;</label>
        </div>
        <div className="my-2 d-flex flex-row">
          <label className="font-weight-semi-bold mx-2">(b)</label>
          <label>a clear and complete description of your work that you believe has been infringed;</label>
        </div>
        <div className="my-2 d-flex flex-row">
          <label className="font-weight-semi-bold mx-2">(c)</label>
          <label>the URL or other identifying location of the allegedly infringing work;</label>
        </div>
        <div className="my-2 d-flex flex-row">
          <label className="font-weight-semi-bold mx-2">(d)</label>
          <label>
            a statement that you have a good faith belief that use of the material in the manner complained of is not
            authorized by the copyright owner, its agent, or law;
          </label>
        </div>
        <div className="my-2 d-flex flex-row">
          <label className="font-weight-semi-bold mx-2">(e)</label>
          <label>
            a statement, made under penalty of perjury, that the above information is accurate, and that you are the
            copyright owner or are authorized to act on behalf of the owner.
          </label>
        </div>
        <h3 className="my-2">Indemnity.</h3>
        <label className="my-2">
          You agree to defend, indemnify and hold harmless Alethea AI and its subsidiaries, agents, licensors, managers,
          and other affiliated companies, and their employees, contractors, agents, officers and directors, from and
          against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including
          but not limited to attorney’s fees) arising from:
        </label>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(i)</label>
          <label>
            your use of and access to the Site, including any data or content transmitted or received by you;
          </label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(ii)</label>
          <label>
            your violation of any term of this Agreement, including without limitation your breach of any of the
            representations and warranties above;
          </label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(iii)</label>
          <label>
            your violation of any third-party right, including without limitation any right of privacy or Intellectual
            Property Rights;
          </label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(iv)</label>
          <label>your violation of any applicable law, rule or regulation;</label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(v)</label>
          <label>
            any content that you submit to the Site including without limitation misleading, false, or inaccurate
            information;
          </label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(vi)</label>
          <label>your willful misconduct; or</label>
        </div>
        <div className="mt-1 mb-2 d-flex flex-row">
          <label className="font-weight-medium sub-index">(vii)</label>
          <label>
            any other party’s access and use of the Site with your unique username, password or other appropriate
            security code.
          </label>
        </div>
        <h3 className="my-2">
          <b>Assumption of Risk;</b> Release of Claims.
        </h3>
        <label className="my-2">
          You acknowledge that the Site (including without limitation the Protocol and the Smart Contracts) and your use
          of the Site contain certain risks, including without limitation the following risks: That any Smart Contracts
          you interact with are entirely your own responsibility / liability, and Alethea AI is not a party to the Smart
          Contracts; At any time, your access to your Assets may be suspended or terminated or there may be a delay in
          your access or use of your Assets which may result in the Assets diminishing in value or you being unable to
          complete a Smart Contract and the Protocol may be suspended or terminated for any or no reason, which may
          limit your access to your Assets.
        </label>
        <label className="my-2">
          Accordingly, you expressly agree that: (A) you assume all risk in connection with your access and use of the
          Site, the Protocol and the Smart Contracts; and (B) that you expressly waive and release Alethea AI from any
          and all liability, claims, causes of action, or damages arising from or in any way related to your use of the
          Site, the Protocol or the Smart Contracts.
        </label>
        <h3 className="my-2">Disclaimer of Warranties.</h3>
        <label className="my-2">
          The Site is provided on an “as is” and “as available” basis. Use of the Site is at your own risk. To the
          maximum extent permitted by applicable law, the Site is provided without warranties of any kind, whether
          express or implied, including, but not limited to, implied warranties of merchantability, fitness for a
          particular purpose, or non-infringement. No advice or information, whether oral or written, obtained by you
          from Alethea AI or through the Site will create any warranty not expressly stated herein. Without limiting the
          foregoing, Alethea AI, its subsidiaries, its affiliates, and its licensors do not warrant that the content is
          accurate, reliable or correct; that the Site will meet your requirements; that the Site will be available at
          any particular time or location, uninterrupted or secure; that any defects or errors will be corrected; or
          that the Site is free of viruses or other harmful components. Any content downloaded or otherwise obtained
          through the use of the Site is downloaded at your own risk and you will be solely responsible for any damage
          to your computer system or mobile device or loss of data that results from such download or your use of the
          Site.
        </label>
        <label className="my-2">
          Alethea AI does not warrant, endorse, guarantee, or assume responsibility for any product or site advertised
          or offered by a third party through the Site or any hyperlinked website or site, and Alethea AI will not be a
          party to or in any way monitor any transaction between you and third-party providers of products or services.
        </label>
        <h3 className="my-2">Limitation of Liability.</h3>
        <label className="my-2">
          To the maximum extent permitted by applicable law, in no event shall Alethea AI, its affiliates, agents,
          directors, employees, suppliers or licensors be liable for any indirect, punitive, incidental, special,
          consequential or exemplary damages, including without limitation damages for loss of profits, goodwill, use,
          data or other intangible losses, arising out of or relating to the use of, or inability to use, this Site.
          Under no circumstances will Alethea AI be responsible for any damage, loss or injury resulting from hacking,
          tampering or other unauthorized access or use of the Site or the information contained therein.
        </label>
        <label className="my-2">
          To the maximum extent permitted by applicable law, Alethea AI assumes no liability or responsibility for any
        </label>
        <div className="mt-2 mb-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(i)</label>
          <label>errors, mistakes, or inaccuracies of content;</label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(ii)</label>
          <label>
            personal injury or property damage, of any nature whatsoever, resulting from your access to or use of our
            site;
          </label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(iii)</label>
          <label>
            personal injury or property damage, of any nature whatsoever, resulting from your access to or use of our
            site;
          </label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(iv)</label>
          <label>
            any unauthorized access to or use of our secure servers and/or any and all personal information stored
            therein;
          </label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(iv)</label>
          <label>any interruption or cessation of transmission to or from the Site;</label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(v)</label>
          <label>
            any bugs, viruses, trojan horses, or the like that may be transmitted to or through our site by any third
            party;
          </label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(vi)</label>
          <label>
            any errors or omissions in any content or for any loss or damage incurred as a result of the use of any
            content posted, emailed, transmitted, or otherwise made available through the Site; and/or
          </label>
        </div>
        <div className="my-1 d-flex flex-row">
          <label className="font-weight-medium sub-index">(vii)</label>
          <label>User Content or the defamatory, offensive, or illegal conduct of any third party.</label>
        </div>
        <label className="my-2">
          In no event shall Alethea AI, its affiliates, agents, directors, employees, suppliers, or licensors be liable
          to you for any claims, proceedings, liabilities, obligations, damages, losses or costs in an amount exceeding
          the amount you paid to Alethea AI hereunder or $100.00, whichever is greater.
        </label>
        <label className="my-2">
          This limitation of liability section applies whether the alleged liability is based on contract, tort,
          negligence, strict liability, or any other basis, even if Alethea AI has been advised of the possibility of
          such damage. The foregoing limitation of liability shall apply to the fullest extent permitted by law in the
          applicable jurisdiction.
        </label>
        <h3 className="my-2">Limitations as Allowed by Law.</h3>
        <label className="my-2">
          Some jurisdictions do not allow the exclusion and limitations of certain implied warranties, or the exclusion
          or limitation of incidental or consequential damages, so the above limitations or exclusions may not apply to
          you. This agreement gives you specific legal rights, and you may also have other rights which vary from state
          to state. The disclaimers, exclusions, and limitations of liability under this agreement will not apply to the
          extent prohibited by applicable law.
        </label>
        <h4 className="my-2">Third-Party Content</h4>
        <label className="my-2">
          In order to provide you with the best experience using our technology, Alethea AI may use third-party GIFs or
          videos and offer you a library of such content.
        </label>
        <label className="my-2">
          In addition, Alethea AI reserves the right to use the content (pictures, icons, photos, GIFs or videos) from
          Google Video, Bing Video or other publicly available sources. Alethea AI may use such content only in
          compliance with their respective Terms of Use, in good faith and conforming to the Fair Use/Fair Dealing
          Doctrine under the applicable laws. In particular, the purpose of the content’ use is transformative. The
          original materials are used in a new unanticipated way, namely, the visual results of the materials’ use
          create the completely new media (Gifs, Pictures, Memes, Icons, Videos), which are inherently of parodic or
          satiric nature. The results of the materials’ use differ significantly from the original by the character,
          mostly parodic or satiric, and alter the originals with the new meaning, expression, and message, creating the
          object of ridicule. The extent of use is strictly limited by the purpose of transformation.
        </label>
        <label className="my-2">
          Alethea AI does not claim any rights whatsoever to the original pictures, logos, GIFs, videos or other
          intellectual property displayed on our Site or other digital properties and/or used by Alethea AI in
          accordance with the Fair Use/Fair Dealing Doctrine, as prescribed herein or under the applicable laws. The
          contents of the Site are used solely for the purposes of creation of transformative works ( including parodies
          ) on the terms set out herein. You shall not use such content otherwise than as allowed by the Fair
          Use/FairDealing Doctrine.
        </label>
        <h4>Governing Law, Arbitration, and Class Action/Jury Trial Waiver.</h4>
        <div className="my-2 d-flex flex-column">
          <h5>Governing Law.</h5>
          <label className="ml-4">This contract is governed by the laws of Singapore.</label>
        </div>
        <div className="my-2 d-flex flex-column">
          <h5>Arbitration.</h5>
          <label className="ml-4">
            Read this section carefully because it requires the parties to arbitrate their disputes and limits the
            manner in which you can seek relief from Alethea AI. For any dispute with Alethea AI, you agree to first
            contact us at info@alethea.ai and attempt to resolve the dispute with us informally.
          </label>
        </div>
        <label className="my-2 font-sm">
          In the unlikely event that Alethea AI has not been able to resolve a dispute it has with you after sixty (60)
          days, we each agree to resolve any claim, dispute, or controversy (excluding any claims for injunctive or
          other equitable relief as provided below) arising out of or in connection with or relating to this Agreement,
          or the breach or alleged breach thereof (collectively, “Claims”), by binding arbitration administered by the
          Singapore International Arbitration Centre in accordance with the Arbitration Rules of the Singapore
          International Arbitration Centre for the time being in force, which rules are deemed to be incorporated by
          reference in this clause. The arbitration will be conducted in Singapore, unless you and Alethea AI agree
          otherwise. The Tribunal shall consist of one arbitrator. The language of the arbitration shall be English. Any
          judgment on the award rendered by the arbitrator may be entered in any court of competent jurisdiction.
          Nothing in this Section shall be deemed as preventing Alethea AI from seeking injunctive or other equitable
          relief from the courts as necessary to prevent the actual or threatened infringement, misappropriation, or
          violation of our data security, Intellectual Property Rights or other proprietary rights.
        </label>
        <div className="my-2 d-flex flex-column">
          <h5>Class Action/Jury Trial Waiver.</h5>
          <label className="ml-4">
            With respect to all persons and entities, regardless of whether they have obtained or used the site for
            personal, commercial or other purposes, all Claims must be brought in the parties’ individual capacity, and
            not as a plaintiff or class member in any purported class action, collective action, private attorney
            general action or other representative proceeding. This waiver applies to class arbitration, and, unless we
            agree otherwise, the arbitrator may not consolidate more than one person’s claims. You agree that, by
            entering into this agreement, you and Alethea AI are each waiving the right to a trial by jury or to
            participate in a class action, collective action, private attorney general action, or other representative
            proceeding of any kind.
          </label>
        </div>
      </div>
    </div>
  );
}
