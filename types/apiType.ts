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

export type TemporaryHousingFacility = {
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

export type EarthquakeOutdoorsShelter = {
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
  id: 9;
  sido_name: string;
  sigungu_name: string;
  remarks: string;
  shel_nm: string;
  address: string;
  lon: number;
  lat: number;
  shel_av: number;
  lenth: number;
  shel_div_type: string;
  seismic: string;
  height: number;
};
