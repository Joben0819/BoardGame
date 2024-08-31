import React, { useState } from "react";
import styles from "./index.module.scss";
import Announce from "../Announce";
import { useSelector } from "react-redux";
import ListSmallIcons from "./components/ListSmallIcons";
import ListLargeIcons from "./components/ListLargeIcons";
import CategoryListBar from "./components/CategoryListBar";
import SearchField from "./components/SearchField";

const MainContentList = () => {
  const { sideBar, activeSideBarItem } = useSelector((state) => state.gameData);
  const [activePlatformId, setActivePlatformId] = useState(-1);
  const [searchFieldData, setSearchFieldData] = useState("");
  const [platformsList, setPlatformsList] = useState();

  return (
    <div className={styles.mainListWrapper}>
      {activeSideBarItem.type === 4 ? (
        <div className={styles.categorySearchContainer}>
          <CategoryListBar
            setActivePlatformId={setActivePlatformId}
            activeSideBarItem={activeSideBarItem}
            setPlatformsList={setPlatformsList}
          />
          <div className={styles.searchWrapper}>
            <SearchField
              searchFieldData={searchFieldData}
              setSearchFieldData={setSearchFieldData}
            />
          </div>
        </div>
      ) : (
        <div className={styles.announceSearchContainer}>
          <Announce />
          <div className={styles.searchWrapper}>
            <SearchField
              searchFieldData={searchFieldData}
              setSearchFieldData={setSearchFieldData}
            />
          </div>
        </div>
      )}
      <div className={styles.listContainer}>
        {sideBar.map((item, idx) => {
          if (item.type !== 2 && item.type !== 3) {
            if (item.type === 4) {
              return (
                activeSideBarItem.id === item.id &&
                platformsList?.map((platform, idx) => {
                  return (
                    activePlatformId === platform.id && (
                      <ListSmallIcons
                        key={idx}
                        activePlatformId={activePlatformId}
                        activeSideBarItem={activeSideBarItem}
                        searchFieldData={searchFieldData}
                        setSearchFieldData={setSearchFieldData}
                      />
                    )
                  );
                })
              );
            } else {
              return (
                activeSideBarItem.id === item.id && (
                  <ListSmallIcons
                    key={idx}
                    activeSideBarItem={activeSideBarItem}
                    searchFieldData={searchFieldData}
                    setSearchFieldData={setSearchFieldData}
                  />
                )
              );
            }
          } else {
            return (
              activeSideBarItem.id === item.id && (
                <ListLargeIcons
                  key={idx}
                  activeSideBarItem={activeSideBarItem}
                  searchFieldData={searchFieldData}
                  setSearchFieldData={setSearchFieldData}
                />
              )
            );
          }
        })}
        {/* {activeSideBarItem.type !== 2 && activeSideBarItem.type !== 3 ? (
          <ListSmallIcons activeSideBarItem={activeSideBarItem} />
        ) : (
          <ListLargeIcons activeSideBarItem={activeSideBarItem} />
        )} */}
      </div>
    </div>
  );
};

export default MainContentList;
