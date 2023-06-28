import { RecoilState, atom } from "recoil";
export type TypeStoreCompany = {
  _id?: string;
  user?: string;
  name: string;
  nit: string;
  address: string;
  phone: string;
};
export const storeStatusCompanies: RecoilState<TypeStoreCompany[]> = atom<
  TypeStoreCompany[]
>({
  key: "company",
  default: [{ name: "", nit: "", address: "", phone: "" }],
});
