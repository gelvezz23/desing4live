/* eslint-disable @typescript-eslint/no-explicit-any */
import { MouseEvent, useState } from "react";
import {
  createImage,
  deleteImage,
  getOneImage,
} from "../../core/appwrite/Storage";
import { storeStatusResponse } from "../../core/recoil/atoms/storeResponseStatus";
import { useRecoilState } from "recoil";
import { Loading } from "../Loading";
import { Alerts } from "../Alerts";

const UploadImage = () => {
  const [image, setImage] = useState(null);

  const [imageId, setImageId] = useState(null);
  const [infoImage, setInfoImage] = useState<any>();
  const [status, setStatus] = useRecoilState(storeStatusResponse);

  const handleChange = (event: any) => {
    setImage(event.target.files[0]);
    console.log(image);
  };

  const handleUpload = async (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    setStatus({ loading: true });
    event.preventDefault();
    event.stopPropagation();
    const response = await createImage(image);
    const imageInfo = await getOneImage(response.$id);
    setInfoImage(imageInfo);
    setImageId(response.$id);
    imageInfo && setStatus({ loading: false, error: response.message });
  };

  const handleDeleteImage = async (event: any) => {
    setStatus({ loading: true });
    event.preventDefault();
    event.stopPropagation();
    const response = await deleteImage(imageId);
    response && setInfoImage(null);
    response && setStatus({ loading: false, error: response.message });
  };

  return (
    <div className=" border my-5 p-3">
      <h2 className="text-center my-2">1. Sube la imagen del producto</h2>
      {status.loading && <Loading />}
      {status.error && <Alerts message={status.error} type={"error"} />}
      {status.success && <Alerts message={status.success} type={"success"} />}
      <div className="border p-3 my-3">
        <form>
          <div className="form-group">
            <label htmlFor="exampleFormControlFile1">
              <b>Imagen de producto</b> :
            </label>
            <input
              onChange={(event) => handleChange(event)}
              type="file"
              className="btn form-control-file"
              id="exampleFormControlFile1"
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={(event) => handleUpload(event)}
          >
            subir imagen
          </button>
          {status.loading && <Loading />}
        </form>
      </div>
      <div className="d-flex flex-wrap justify-content-start">
        {infoImage && (
          <div className="card col-sm-6 col-xl-6">
            <img className="card-img-top" src={infoImage.href} alt="imagen" />
            <div className="card-body">
              <button
                className="btn btn-danger"
                onClick={(event) => handleDeleteImage(event)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
