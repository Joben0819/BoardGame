import { useState, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
// import { url0, url1, url2, url3, url4 } from "src/variants/8801/server";
const { url0, url1, url2, url3, url4 } = require("../../server/" +
  process.env.REACT_APP_SITE);

// const useLineSwitch = () => {
//   const [urlDomains, setUrlDomains] = useState({});
//   const { showLoginModal, showSettings } = useSelector(
//     (state) => state.gameSettings
//   );
//   const url0 = "https://hangzhouchang.oss-cn-hangzhou.aliyuncs.com/error";
//   const url1 = "https://bceguang.gz.bcebos.com/error";
//   const url2 = "https://cloudt.oss-cn-quanzhou.kz.cc/error";
//   const url3 =
//     "http://alb-f4r15f877eejshperb.ap-northeast-1.alb.aliyuncs.com/801/error";
//   const url4 = "https://dbutdt.s3.ap-northeast-1.amazonaws.com/error";
//   const urls = [url0, url1, url2, url3, url4];
//   let urlsResponse = [];

//   const requestUrls = async () => {
//     const getEncryptedData = async (url, index) => {
//       try {
//         const response = await fetch(url, { mode: "cors" });
//         const data = await response.text();
//         urlsResponse.push(data);
//         if (urlsResponse?.length > 0) {
//           localStorage.setItem("domainNum" + index, data);
//           localStorage.getItem(localStorage.getItem("currDomain")) !== data &&
//             setUrlDomains((prev) => {
//               return { ...prev, [`domainNum` + index]: data };
//             });
//         }
//       } catch (error) {}
//     };

//     return urls.map(async (url, index) => {
//       getEncryptedData(url, index);
//     });
//   };

//   const switchLine = async () => {
//     if (urlDomains) {
//       if (Object?.keys(urlDomains).length > 1) {
//         const a =
//           Math.floor(
//             Math.random() * (Object?.keys(urlDomains).length - 1 - 0 + 1)
//           ) + 0;
//         localStorage.setItem("currDomain", Object?.keys(urlDomains)[a]);
//         window.location.reload();
//       } else if (Object?.keys(urlDomains).length === 1) {
//         localStorage.setItem("currDomain", Object?.keys(urlDomains)[0]);
//         window.location.reload();
//       } else {
//         // console.log("@@no other domains found");
//       }
//     }
//   };

//   useEffect(() => {
//     if (showLoginModal || showSettings) {
//       requestUrls();
//     }
//   }, [showLoginModal, showSettings]);

//   return { switchLine: switchLine, urlDomains: urlDomains };
// };

// export default useLineSwitch;

const useLineSwitch = () => {
  const { showLoginModal, showSettings } = useSelector(
    (state) => state.gameSettings
  );
  const urls = [url0, url1, url2, url3, url4];

  const [urlDomains, setUrlDomains] = useState(() => {
    const storedDomains = {};
    for (let i = 0; i < urls.length; i++) {
      const storedDomain = localStorage.getItem("domainNum" + i);
      if (storedDomain) {
        storedDomains[`domainNum${i}`] = storedDomain;
      }
    }
    return storedDomains;
  });

  const memoizedUrls = useMemo(() => {
    return urls;
  }, []);

  const requestUrlsRef = useRef(null);

  const requestUrls = async () => {
    const getEncryptedData = async (url, index) => {
      try {
        const response = await fetch(url, { mode: "cors" });
        const data = await response.text();
        localStorage.setItem("domainNum" + index, data);
        if (localStorage.getItem(localStorage.getItem("currDomain")) !== data) {
          setUrlDomains((prev) => {
            return { ...prev, [`domainNum` + index]: data };
          });
        }
      } catch (error) {}
    };

    requestUrlsRef.current = memoizedUrls.map(async (url, index) => {
      await getEncryptedData(url, index);
    });

    await Promise.all(requestUrlsRef.current);
  };

  const switchLine = async () => {
    if (urlDomains) {
      const keys = Object.keys(urlDomains);
      const length = keys.length;
      if (length > 1) {
        const randomIndex = Math.floor(Math.random() * length);
        const selectedKey = keys[randomIndex];
        localStorage.setItem("currDomain", selectedKey);
        window.location.reload();
      } else if (length === 1) {
        const selectedKey = keys[0];
        localStorage.setItem("currDomain", selectedKey);
        window.location.reload();
      } else {
        // console.log("@@no other domains found");
      }
    }
  };

  useEffect(() => {
    if (showLoginModal || showSettings) {
      if (requestUrlsRef.current === null) {
        //disabled for now, using a static domain instead
        // requestUrls();
      }
    }
  }, [showLoginModal, showSettings]);

  return { switchLine, urlDomains };
};

export default useLineSwitch;
