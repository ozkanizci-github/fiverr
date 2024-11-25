import { Schema, model} from "mongoose";
  
//Kullanıcı şeması  oluşturma 
const userSchema =  new Schema({
    username:{
        type:String,
        required:[true, "Lütfen username alanını belirleyin"],
        unique:[ true, "Bu isimde bir kulanıcı mevcut. Lütfen farklı bir nickname belirleyiniz",
        ],
    },
    email:{
        type:String,
        required:[true, "Lütfen e mail alanını belirleyiniz."],
        unique:[true, "Bu mail adresinde bir kullanıcı mevcut. Lütfen farklı bir mail giriniz."],
    },
    password:{
        type:String,
        required:[true, "Lütfen sifre alanını belirleyiniz."],
    },
    photo:{
        type:String,
        default: "https://picsum.photos/200/300/?blur",
    },
    country:{
        type:String,
        required:[true, "Lütfen ülke alanını belirleyiniz."],
    },
    phone:{
        type:Number,
    },
    desc:{
        type:String,
        
    },
    isSeller:{
        type:Boolean,
        default:false,
    },
},
//ayarlar
//timestamps saysesinde oluşturduğumuz bütün belgeler oto olarak createAt & updateAt eklenir
{
timestamps:true,
}
);

export default model("User", userSchema);