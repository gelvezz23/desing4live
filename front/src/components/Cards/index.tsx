import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import {
  TypeStoreCompany,
  storeStatusCompanies,
} from "../../core/recoil/atoms/storeCompanies";
import { FC } from "react";
import { Drawers } from "../Drawer";
import { useRecoilState } from "recoil";
import { storeStatusResponse } from "../../core/recoil/atoms/storeResponseStatus";
import { fetchData } from "../../utils/helpers/fetchingData";
import { Link } from "react-router-dom";

export const Cards: FC<{
  item: TypeStoreCompany;
}> = (item) => {
  const { name, nit, _id } = item["item"];
  const [, setStatus] = useRecoilState(storeStatusResponse);
  const [company, setCompany] = useRecoilState(storeStatusCompanies);

  const handleRemove = async () => {
    setStatus({ loading: true });
    try {
      const response = await fetchData("DELETE", `/company/${_id}`, null);
      if (response.error) {
        setStatus({ loading: false, error: response.message });
      } else {
        const newCompanies = company.filter((item) => item._id !== _id);
        setCompany(newCompanies);
        setStatus({ loading: false, success: response.message });
      }
    } catch (error) {
      setStatus({ loading: false, error: "An error occurred" });
    }
    setTimeout(() => {
      setStatus({ loading: false, success: "", error: "" });
    }, 3000);
  };
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <Link to={{ pathname: "/company", search: `?id=${_id}` }} state={_id}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`nit: ${nit}`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions>
          <Drawers data={item["item"]} />
          <Button onClick={handleRemove} size="small" color="secondary">
            eliminar
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
