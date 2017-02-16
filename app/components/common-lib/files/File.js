/**
 * Created by amattis on 12/24/2015.
 */
import React, { Component, PropTypes } from 'react';
import {
  APISETTINGS
}  from '../../../constants';
import { xPathHelper } from '../../../utilities/helpers/index';
import { fileUploadTypes } from '../../../enums/enums.js';

export default class File extends Component {

  static propTypes = {
    file: PropTypes.object,
    onDeleteEvt: PropTypes.func,
    onDoubleClickEvt: PropTypes.func,
    onBlurEvt: PropTypes.func,
    disableAttachmentEdit: PropTypes.func,
    canDelete: PropTypes.bool
  };

  componentDidUpdate () {
    if (this.props.file.isEditMode === true) {
      this.refs[this.props.file.fileId].focus();
    }
  }

  constructor (props) {
    super(props);
  }

  onBlurEvt (file) {
    let newName = this.refs[file.fileId].value.trim();

    if (newName === file.displayName) { // no change just turn off edit mode
      this.props.disableAttachmentEdit(file);
    }

    let currentFileExt =
      file.displayName.substring(file.displayName.lastIndexOf('.'));

    if (newName === '') {  //if empty put original name back
      this.refs[file.fileId].value = file.displayName;
    } else {
      let periodIndex = newName.lastIndexOf('.');
      if (periodIndex === -1) {
        newName = newName + currentFileExt;
      }

      //file name ends in (.)
      if (periodIndex !== -1 && (periodIndex === newName.length -1)) {
        //remove . and add old extention
        newName = newName.substring(0, newName.length - 1) + currentFileExt;
      }

      file.displayName = newName;
      this.props.onBlurEvt(file);
    }
  }

  render () {

    let file = this.props.file;

    //mq move from FileUploadType for now
    let fileUploadType = file.fileUploadType;

    if (fileUploadType === fileUploadTypes.BULK_UPLOAD) {
      fileUploadType = 'via Bulk Upload';
    } else  if (fileUploadType === fileUploadTypes.EVALUATOR) {
      fileUploadType = 'via Evaluator';
    } else  if (fileUploadType === fileUploadTypes.LMS_LTI) {
      fileUploadType= 'via LMS/LTI';
    } else  if (fileUploadType === fileUploadTypes.MANUAL_UPLOAD) {
      fileUploadType = 'via Manual Upload';
    } else  if (fileUploadType === fileUploadTypes.EMAIL) {
      fileUploadType = 'via Email';
    } else {
      fileUploadType = '';
    }

    let display = null;

    if (file.fileId) {

      let downloadPath = APISETTINGS.baseFileDownload + '/AltFile?encPath='
        + file.encFilePath + '&filename=' + file.displayName;

      display = (
        <div className="uploaded-file">
          <svg className="file-icon">
            <use xlinkHref={`${xPathHelper()}#file`} />
          </svg>
          <div className="uploaded-complete">
            {file.isEditMode ?
              <div className="edit-filename">
                <input ref={file.fileId}
                       type="text" onBlur={() =>this.onBlurEvt(file)}
                       defaultValue={file.displayName}/>
              </div>
              :
              <div onDoubleClick={() => this.props.onDoubleClickEvt(file)}>
                {file.displayName}
              </div>
            }

            {
            this.props.canDelete &&
            <a
              className="delete-file"
              onClick={() => this.props.onDeleteEvt(this.props.file)}>
              <svg><use xlinkHref={`${xPathHelper()}#x-icon`} /></svg>
            </a>
            }
          </div>
          <a href={ downloadPath } className="download-file">
            <svg>
              <use xlinkHref={`${xPathHelper()}#download`} />
            </svg>
          </a>
          { fileUploadType &&
          <div>
                { fileUploadType }
          </div>
          }
        </div>
      );
    } else {
      display = (
        <div className="uploaded-file">
          <svg className="file-icon">
            <use xlinkHref={`${xPathHelper()}#file`} />
          </svg>
          <div className="file-progress">
            <progress
              value={file.value ? file.value : 0}
              max={100} />
            <p className="progress-filename">{file.displayName}</p>
          </div>
        </div>
      );
    }

    return (
      <div>
        {display}
      </div>
    );
  }
}


File.defaultProps = {
  isEditMode: false,
  canDelete: true
};
