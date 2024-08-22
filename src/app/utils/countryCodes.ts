// utils/countryCodes.ts

export interface CountryCode {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

export const countryCodes: CountryCode[] = [
    { name: "United States", code: "US", dialCode: "1", flag: "🇺🇸" },
    { name: "United Kingdom", code: "GB", dialCode: "44", flag: "🇬🇧" },
    { name: "Canada", code: "CA", dialCode: "1", flag: "🇨🇦" },
    { name: "Australia", code: "AU", dialCode: "61", flag: "🇦🇺" },
    { name: "Germany", code: "DE", dialCode: "49", flag: "🇩🇪" },
    { name: "France", code: "FR", dialCode: "33", flag: "🇫🇷" },
    { name: "Japan", code: "JP", dialCode: "81", flag: "🇯🇵" },
    { name: "China", code: "CN", dialCode: "86", flag: "🇨🇳" },
    { name: "India", code: "IN", dialCode: "91", flag: "🇮🇳" },
    { name: "Brazil", code: "BR", dialCode: "55", flag: "🇧🇷" },
  ];

  export default countryCodes;