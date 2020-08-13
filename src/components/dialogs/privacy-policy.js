import React from 'react';
import { Dialog } from '@material-ui/core';
import { ImageContainer } from '../atoms/image-container';
import { ReactComponent as CloseIcon } from '../../assets/img/closex.svg'

const PrivacyPolicy = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} className="dialog-privacy-policy">
            <div className="container-privacy-policy">
                <div className="close">
                    <CloseIcon className="icon-size" onClick={onClose} />
                </div>
                <div className="custom-scroll">
                    <div className="header-dialog">
                        <div className="container-image">

                            <ImageContainer path="/img/astech-logo.png" alt="logo-astech" />
                        </div>
                        <div className="link">
                            <a href="https://astech.com/" target="_blank">https://astech.com/</a>
                        </div>
                    </div>
                    <p className="paragraph">The privacy practices set forth on this page are for this web site only. If you link to other web sites, please review the privacy policies posted at those sites.</p>
                    <p className="paragraph">Thank you for visiting www.astech.com, the website for asTech®. This privacy policy tells you how we use personal information collected at this site. Please read this privacy policy before using our site or submitting any personal information. By using the site, you are accepting the practices described herein. These practices may be changed.  Changes will be posted and only apply to activities and information on a going forward, not retroactive basis. You are encouraged to review the privacy policy whenever you visit the site to make sure that you understand how any personal information will be used.</p>

                    <h4 >Collection and Distribution of Information</h4>
                    <p className="paragraph">We collect personally identifiable information when voluntarily submitted by visitors to the site. This information is only used to fulfill your specific request, unless you give us permission to use it in another manner. We may share information with governmental agencies or other companies assisting us in fraud prevention or investigation. We may do so when: (1) permitted or required by law; or, (2) trying to protect against or prevent actual or potential fraud or unauthorized transactions; or, (3) investigating fraud which has already taken place. The information is not provided to these companies for marketing purposes.</p>

                    <h4>Cookie/Tracking Technology</h4>
                    <p className="paragraph">asTech® may use cookie and tracking technology on this site. Cookies are useful for gathering information related to browser type and operating system, or in order to track the number of visitors and understand how visitors use the site. Cookies can also help customize the site for your browser. Personal information cannot be collected via cookies; however, if you previously provided personally identifiable information, cookies may be tied to such information. Aggregate cookie and tracking information may be shared with third parties.</p>

                    <h4>Commitment to Data Security</h4>
                    <p className="paragraph">Your personally identifiable information is kept secure. Only authorized employees, agents and contractors (who have agreed to keep information secure and confidential) have access to this information. All emails and newsletters from this site allow you to opt out of further mailings.</p>
                    <p className="paragraph">We reserve the right to make changes to this policy.</p>
                </div>
            </div>
        </Dialog>
    )
}

export default PrivacyPolicy;