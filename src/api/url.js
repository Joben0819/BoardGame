import { BrowseInit } from "./game/gamelist";
import { JSEncrypt } from "jsencrypt";
import { useState } from "react";
import { useEffect } from "react";

const privateSusi = `-----BEGIN PRIVATE KEY-----
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
AT8S76BusNI/L8oOEIBAJW25GcoQ+ks=
-----END PRIVATE KEY-----`;

const decryptIt = (encrypted) => {
  var decrypt = new JSEncrypt();
  decrypt.setPrivateKey(privateSusi);
  const Urls = sessionStorage.getItem("domainUrl");
  return decrypt.decrypt(encrypted);
};

export default function Url() {
  const [decryptedObject, setDecryptedObject] = useState([]);

  const url0 = "https://hangzhouchang.oss-cn-hangzhou.aliyuncs.com/error";
  const url1 = "https://bceguang.gz.bcebos.com/error";
  const url2 = "https://cloudt.oss-cn-quanzhou.kz.cc/error";
  const url3 =
    "http://alb-f4r15f877eejshperb.ap-northeast-1.alb.aliyuncs.com/801/error";
  const url4 = "https://dbutdt.s3.ap-northeast-1.amazonaws.com/error";
  const urls = [url0, url1, url2, url3, url4];

  useEffect(() => {
    urls.map((url, index) => {
      console.log("@@index", index);
      getEncryptedData(url);
    });
  }, []);

  useEffect(() => {
    console.log("@@reponse", decryptedObject);
  }, [decryptedObject]);

  const getEncryptedData = async (url) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      const data = await response.text();
      console.log("@@got a success data");
      setDecryptedObject((prevState) => [
        ...prevState,
        JSON.parse(decryptIt(data)),
      ]);
    } catch (error) {
      // console.log("@@error occured");
    }
  };
  console.log("hello 2");
  //   function getData(data) {
  //     // console.log(data);
  //     const myRequest = new Request(data);
  //     fetch(myRequest, { mode: "cors" })
  //       .then((response) => response.text())
  //       .then((data) => {
  //         let decrypted = decryptIt(data);
  //         setDecryptedObject(decrypted);
  //         return;
  //       })
  //       .catch((err) => {
  //         return err;
  //       });
  //     // try {
  //     //   var b = a;
  //     // } catch {
  //     //   var b = null;
  //     // }
  //     // return b;
  //   }

  return null;
}
