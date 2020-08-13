import React from 'react';
import { Dialog } from '@material-ui/core';
import { ImageContainer } from '../atoms/image-container';
import { ReactComponent as CloseIcon } from '../../assets/img/closex.svg'
import { aboutUs } from '../../config/defaultText';

const AboutUs = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} className="dialog-about">
            <div className="container-about">
                <div className="close" style={{
                    display: "flex",
                    justifyContent: "flex-end"
                }}>
                    <CloseIcon className="icon-size" onClick={onClose} />
                </div>
                <div className="header-about">
                    <ImageContainer path="/img/astech-logo.png" alt="logo-astech" />
                </div>
                {/* <p className="paragraph">At asTech, we have a Transformative Massive Purpose, we are in the business of protecting people’s lives by ensuring proper repair of vehicle electric systems!</p>
                <p className="paragraph">Our vision is to be recognized as the automotive industry’s leading service provider for vehicle electronics. At asTech, we strive every day to deliver the highest quality service through our patented asTech remote process, the asTech employee service program which features asTech ASE Certified Master Technicians placed inside high volume repair facilities, and our In shop asTech Mobile repair service.</p>
                <p className="paragraph">Headquartered in Plano, TX, asTech focuses on providing OEM vehicle electronics diagnostic repair services to repair shops. Our service enables shops who may not have expert level electronics technicians to work on any vehicle, no matter how complex, and receive advice from a master technician.</p> */}
                {aboutUs.map((paragraph, i) => (<p key={i.toString()} className="paragraph">{paragraph}</p>))}

            </div>
        </Dialog>
    )
}

export default AboutUs;