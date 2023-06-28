import { RecoilState, atom } from "recoil";
type TypeStoreStatus = {
  loading: boolean;
  error?: string;
  success?: string;
};
export const storeStatusResponse: RecoilState<TypeStoreStatus> =
  atom<TypeStoreStatus>({
    key: "statusResponse",
    default: { loading: false, error: "", success: "" },
  });
