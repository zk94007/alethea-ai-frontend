import React from 'react';
import './styles.scss';
import {Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core';
import {Hidden} from '@material-ui/core';
import HoverItem from '../HoverItem';

export default function AIAvatarItem({index, src, title, description, onClick, isActive, isDisable}) {
  return (
    <>
      <Hidden smUp>
        <Accordion
          key={index}
          onClick={() => onClick()}
          className="ai-card-container mb-4"
          expanded={isActive === undefined ? true : isActive}
          style={
            isActive && !isDisable
              ? {
                  background: 'linear-gradient(89.02deg, #6226D9 0.89%, #8C52FF 100%), #3B4148'
                }
              : {background: '#2D333A'}
          }>
          <AccordionSummary>
            <div className=" d-flex flex-column w-100">
              {isDisable && (
                <div
                  className="d-flex justify-content-center py-1 px-3 top-round-border"
                  style={
                    isActive
                      ? {
                          background: 'linear-gradient(89.02deg, #6226D9 0.89%, #8C52FF 100%), #3B4148'
                        }
                      : {background: '#2D333A'}
                  }>
                  <label className="font-sm text-center">Enterprise Only - Click Here to Request Access.</label>
                </div>
              )}
              <img
                src={src ?? require('../../assets/6.jpg')}
                alt="img-inventory-1"
                className={
                  'bottom-round-border ai-card-image w-100 object-fit ' + (isDisable ? '' : 'top-round-border')
                }
                style={isDisable ? {opacity: 0.6} : null}
              />
              <h4 style={isDisable ? {opacity: 0.6} : null} className="mx-3 font-weight-semi-bold">
                {title}
              </h4>
            </div>
          </AccordionSummary>

          <AccordionDetails>
            <label style={isDisable ? {opacity: 0.6} : null}>{description}</label>
          </AccordionDetails>
        </Accordion>
      </Hidden>
      <Hidden xsDown>
        <HoverItem
          key={index}
          onClick={() => onClick(2)}
          className="ai-card-container d-flex flex-column mb-4"
          style={
            isActive && !isDisable
              ? {
                  background: 'linear-gradient(89.02deg, #6226D9 0.89%, #8C52FF 100%), #3B4148'
                }
              : {background: '#2D333A'}
          }>
          {isDisable && (
            <div
              onClick={() => window.open('https://aletheacreate.typeform.com/to/MTyZRP')}
              className="d-flex justify-content-center py-1 px-3 top-round-border"
              style={
                isActive
                  ? {
                      background: 'linear-gradient(89.02deg, #6226D9 0.89%, #8C52FF 100%), #3B4148'
                    }
                  : {background: '#2D333A'}
              }>
              <label className="font-sm text-center">Enterprise Only - Click Here to Request Access.</label>
            </div>
          )}
          <img
            src={src ?? require('../../assets/6.jpg')}
            alt="img-inventory-1"
            className={'bottom-round-border ai-card-image w-100 object-fit ' + (isDisable ? '' : 'top-round-border')}
            style={isDisable ? {opacity: 0.6} : null}
          />
          <h4 className="mx-3 font-weight-semi-bold" style={isDisable ? {opacity: 0.6} : null}>
            {title}
          </h4>
          <label className="mx-3 mt-2 mb-3" style={isDisable ? {opacity: 0.6} : null}>
            {description}
          </label>
        </HoverItem>
      </Hidden>
    </>
  );
}
