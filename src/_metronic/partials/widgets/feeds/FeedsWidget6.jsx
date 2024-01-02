/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import { Base_url } from '../../../../app/Config/BaseUrl'



const FeedsWidget6 = ({className,Data}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body pb-0'>
        {/* begin::Header */}
        <div className='d-flex align-items-center mb-5'>
          {/* begin::User */}
          <div className='d-flex align-items-center flex-grow-1'>
            {/* begin::Avatar */}
            <div className='symbol symbol-45px me-5'>
              
              {Data && Data.teacher.images.length === 0 ? (
                  <span
                    className={`symbol-label bg-light-primary text-primary fs-5 fw-bolder`}
                  >
                    {Data.teacher.name.charAt(0)}
                  </span>
                ) : (
                  Data.teacher &&  Data.teacher.images && (
                    <img
                      src={`${Base_url}api/${Data.teacher.images[0].path}`}
                      alt="trainer image"
                    />
                  )
                )}
            </div>
            {/* end::Avatar */}

            {/* begin::Info */}
            <div className='d-flex flex-column'>
              <a href='#' className='text-gray-800 text-hover-primary fs-6 fw-bold'>
              {Data.title}  By {Data.teacher ? Data.teacher.name : ""}
              </a>
              <span className='text-gray-400 fw-semibold'>{Data.createdAt}</span>
            </div>
            {/* end::Info */}
          </div>
          {/* end::User */}

          {/* begin::Menu */}
          <div className='my-0'>
            {/* <button
              type='button'
              className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
              data-kt-menu-trigger='click'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='top-end'
            >
              <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
            </button> */}
            {/* <Dropdown1 /> */}
          </div>
          {/* end::Menu */}
        </div>
        {/* end::Header */}

        {/* begin::Post */}
        <div className='mb-6'>
          {/* begin::Text */}
          <div className='text-gray-800 fs-6 fw-normal mb-5'>
            {Data.description}
          </div>
          {/* end::Text */}

          {/* begin::Video */}
          <div className='mb-5'>
            <iframe
              title='widget11-video'
              className='embed-responsive-item rounded h-300px w-100'
              src={Data.classRecordingLink}
              allowFullScreen={true}
            />
          </div>
        
          {/* <div className='d-flex align-items-center mb-5'>
            <a
              href='#'
              className='btn btn-sm btn-light btn-color-muted btn-active-light-success px-4 py-2 me-4'
            >
              <KTSVG path='/media/icons/duotune/communication/com012.svg' className='svg-icon-3' />
              189
            </a>

            <a
              href='#'
              className='btn btn-sm btn-light btn-color-muted btn-active-light-danger px-4 py-2'
            >
              <KTSVG path='/media/icons/duotune/general/gen030.svg' className='svg-icon-2' />
              229
            </a>
          </div> */}
       
        </div>
    
        {/* <div className='separator mb-4'></div> */}

        {/* <form className='position-relative mb-6'>
          <textarea
            className='form-control border-0 p-0 pe-10 resize-none min-h-25px'
            data-kt-autosize='true'
            rows={1}
            placeholder='Reply..'
          ></textarea>

          <div className='position-absolute top-0 end-0 me-n5'>
            <span className='btn btn-icon btn-sm btn-active-color-primary pe-0 me-2'>
              <KTSVG
                path='/media/icons/duotune/communication/com008.svg'
                className='svg-icon-3 mb-3'
              />
            </span>

            <span className='btn btn-icon btn-sm btn-active-color-primary ps-0'>
              <KTSVG path='/media/icons/duotune/general/gen018.svg' className='svg-icon-2 mb-3' />
            </span>
          </div>
        </form> */}
     
      </div>

    </div>
  )
}

export {FeedsWidget6}
