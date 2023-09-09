import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";


const apiKey = "KtFE4ewsuHJ80Ab3bhbX9w";
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",

    ns: ["default"],
    defaultNS: "default",

    supportedLngs: ["en","hi","pa","fr","bn"],
    
    backend: {
      loadPath: loadPath
    }
  })
  i18n.loadNamespaces('Navbar',(err,t)=>{console.log(err)});

  export default i18n;