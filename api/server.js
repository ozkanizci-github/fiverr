import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import morgan from "morgan";


// .env dosyasındaki verilere erişmek için kurulum.
dotenv.config();

//Veri tabanı ile bağlantı kur
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Veri tabanı ile bağlantı kuruldu."))
  .catch((err) => console.log("Veri tabanına bağlanamadık."));

// experss uygulaması oluştur.
const app = express();
//Middlewares ara yazılım

//a) body/query  alanlarını json içerisinin işlenmesini sağlari
app.use(express.json());

app.use(morgan("dev"));

//b) CORS hataların önüne geçmek için header'lar ekler
app.use(cors({origin: "http://localhost:5173", credentials:true}));

//c) konsola istek bilgilerini yazan mv


//Kontrol routu
app.route("/health").get((req, res) => {
  res.json("Server calisiyor.");
});

//Router tanımlama
app.use("/api/auth", authRouter);

//Hata yönetimi için middelview 
//Controller'da yapılacak tüm yönledirmelerde bu mv çalışacaktır.
app.use((err, req, res, next) =>{
  console.log("**Hata Meydana geldi**");
  console.log(err);

  const errStatus = err.status || 500;
  const errMessage = err.message || "Üzgünüz birşeyler ters gitti.";

  return  res.status(errStatus).json({
    message:errMessage,
  });

});

//Hangi portun dinleneceğini belirleyelim.
app.listen(process.env.PORT, () => {
  console.log(`API ${process.env.PORT} Portunu dinlemeye başladı...`);
});
