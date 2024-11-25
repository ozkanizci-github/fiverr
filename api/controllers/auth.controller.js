import bcrypt from "bcrypt";
import User from "../models/user.modal.js";
import error from "../utils/error.js";
import jwt from "jsonwebtoken";

//Kaydol : yeni hesap oluştur
export const register = async (req, res, next) => {
  try {
    //Şifreyi hashle ve saltla
    const hashedPass = bcrypt.hashSync(req.body.password, 12);

     //Todo foto bulluta yükle
     req.body.photo = "defult.jpg";

    //Veritabanına kaydedilecek kullanıcıyı oluştur.
    const newUser = await User.create({ ...req.body, password: hashedPass, });

    //Şifrre alanı kaldır
    newUser.password = null;

    //Veri tabanına kaydet


    //Client a cevap gönder
    res.status(200).json({
      message: "Kullanıcı hesabı oluşturuldu",
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    // Cliente hata detaylarını gönder.
    next(error(400, "Hesaop oluşturulurken bir hata meydana geldi."));
 
  }
};

//Giriş yap:  oturum aç
export const login = (req, res, next) => {
  try {
    //1) ismine göre kullanıcı ara
    const user = User.findOne({ username: req.body.username });

    //2) Kullanıcı bulamassa hata gönder.
    if (!user) return next(error(404, "Giriş bilgileriniz yanlış"));

    //3) Kullanıcı bulunursa şifresi doğrumu kontrol et(Veri tanabında hashlanmiş şifre ile isteğin bbody'sinden gelen normal şifre ile karşlaşır.);
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    //4) Şifre yanlış ise hata gönder.
    if (!isCorrect) return next(error(404, "Giriş bilgileriniz yanlış"));

    //5) Şifre doğru ise jwt tokeni oluştur.
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "7d",
      }
    );

    //Şifrre alanı kaldır
    user.password = null;

    //6) Tokeni clienta gönder.
    res.cookie("token", token).status(200).json({
      message: "Hesaba giriş yapıldı.",
      user,
    });
  } catch (err) {
    next(error(400, "Giriş yaparken sorun oluştu"));
  }
};

//Çıkış Yap : oturum kapat
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({
    message: "Kullanıcı hesabında çıkış yapıldı",
  });
};
