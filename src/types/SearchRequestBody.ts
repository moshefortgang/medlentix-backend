export type SearchRequestBody = {
  ActiveQuickSearch: boolean;
  KodYeshuv: number;
  ActiveMichraz: boolean;
  FromVaadaDate: string;
  KodSugMichraz: Array<number>;
  KodYeud: Array<number>;
}