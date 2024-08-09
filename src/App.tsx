import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { z } from "zod";

export default function App() {
  const { t } = useTranslation("common");
  const changeLanguage = () => {
    void i18n.changeLanguage(i18n.language === "en-US" ? "zh-CN" : "en-US");
  };

  try {
    const mySchema = z.string();
    mySchema.parse(123);
  } catch (e: any) {
    console.log(e.message);
  }

  return (
    <>
      {t("home.hello")}
      <button onClick={changeLanguage}>{t("button")}</button>
    </>
  );
}
