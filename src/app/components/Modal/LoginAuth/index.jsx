// This imports the things we'll be needing from react
import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBindCardList } from 'src/api/game/gamelist';
import { resetUserInfoState, setMails, updateBalance } from 'src/reducers/userInfo';

const AuthContext = createContext(null);

// This thing will be exported and be used in another one
export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  // this useState variable is declared and set the initial value to null
  const [user, setUser] = useState(''); //

  // this what gets the user login username

  // this login function sets the user login credentials
  const login = (user) => {
    setUser(user);
  };

  // This logout function sets the user free from logging in
  const logout = () => {
    dispatch(updateBalance());
    dispatch(resetUserInfoState());
    dispatch(setMails([]));
    localStorage.removeItem('loginNow');
    setUser(null);
  };

  // this sets the api of selected Member card Initially
  // get the data from the api
  useEffect(() => {
    let requestBindCardDelay = setTimeout(() => {
      if (localStorage.getItem('domain') === 'hasDomain') {
        getBindCardList()
          .then((res) => {
            setMySelectCard(res.data.data.memberCardList[0]);
          })
          .catch((err) => {
            // console.log(err);
          });
      } else {
        //perform fallback function if noDomain
      }
    }, 2000);

    return () => {
      clearTimeout(requestBindCardDelay);
    };
  }, []);
  // container for the selected card
  const [mySelectCard, setMySelectCard] = useState('');

  const pickCard = (card) => {
    setMySelectCard(card);
  };

  // This what will be returned
  return (
    <AuthContext.Provider value={{ user, mySelectCard, login, logout, pickCard }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
