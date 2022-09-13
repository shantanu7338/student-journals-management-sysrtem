import React from "react";
import FileViewer from "react-file-viewer";
const FileView=()=>
{
    const filepath="./resume.pdf";
    const filetype="pdf";
    const onError = (e) => {
        console.log(e,"error in file-viewer");
      };
    return (
        <FileViewer fileType={filetype} filePath={filepath} onError={onError} />
    );
}

export default FileView;