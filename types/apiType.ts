export type EarthquakeIndoors = {
  arcd: string;
  acmdfclty_sn: number;
  ctprvn_nm: string;
  sgg_nm: string;
  vt_acmdfclty_nm: string;
  rdnmadr_cd: string;
  bdong_cd: string;
  hdong_cd: string;
  dtl_adres: string;
  fclty_ar: number;
  xcord: number;
  ycord: number;
  mngps_nm: string;
  mngps_telno: string;
};

export type TemporaryHousing = {
  arcd: string;
  acmdfclty_sn: number;
  ctprvn_nm: string;
  sgg_nm: string;
  acmdfclty_se_cd: string;
  acmdfclty_se_nm: string;
  vt_acmdfclty_nm: string;
  rdnmadr_cd: string;
  bdong_cd: string;
  hdong_cd: string;
  dtl_adres: string;
  fclty_ar: number;
  vt_acmd_psbl_nmpr: number;
  xcord: number;
  ycord: number;
  mngps_nm: string;
  mngps_telno: string;
};

export type EarthquakeOutdoors = {
  arcd: string;
  acmdfclty_sn: number;
  ctprvn_nm: string;
  sgg_nm: string;
  vt_acmdfclty_nm: string;
  rdnmadr_cd: string;
  bdong_cd: string;
  hdong_cd: string;
  dtl_adres: string;
  fclty_ar: number;
  xcord: number;
  ycord: number;
};

export type TsunamiShelter = {
  ctprvn_nm: string;
  sgg_nm: string;
  vt_acmdfclty_nm: string;
  dtl_adres: string;
  xcord: number;
  ycord: number;
};

export type ApiTypes =
  | TemporaryHousing[]
  | TsunamiShelter[]
  | EarthquakeOutdoors[]
  | EarthquakeIndoors[];
