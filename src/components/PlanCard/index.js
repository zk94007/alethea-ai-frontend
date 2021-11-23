import React from 'react';
import './styles.scss';
import CheckIcon from '@material-ui/icons/Check';
import {Divider} from '@material-ui/core';
import Button from '@material-ui/core/Button';

export default function PlanCard({data, onClick}) {
  return (
    <div className="plan-card splitter plan-one" style={{borderTopColor: data.color}}>
      <div className="w-100 d-flex flex-column h-100">
        <div className="plan-header" style={{backgroundColor: data.backgroundColor}}>
          <div className="ratio-container d-flex flex-column align-items-center justify-content-center">
            <h3 className="font-weight-semi-bold mb-3">{data.name}</h3>
            <label className="text-center">{data.text}</label>
          </div>
        </div>
        <div className="w-100 flex-fill d-flex flex-column p-3">
          {data.description.map(e => (
            <>
              <div className="d-flex flex-row my-2">
                <CheckIcon className="mr-2" style={{color: data.color}} />
                <label>{e}</label>
              </div>{' '}
              <Divider />
            </>
          ))}
          <div className="py-2" />
          <Button
            className="mt-auto plan-button"
            variant="contained"
            color="primary"
            style={{background: data.color}}
            onClick={() => onClick(data.mode)}>
            {data.buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
