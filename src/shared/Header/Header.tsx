import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Back } from "../../icons";
import { Exit } from "../../icons/Exit";
import { RootState } from "../../stor/stor";
import { deleteTokenAction } from "../../stor/tokenAction";
import styles from "./header.css";


export function Header() {
  const user = useSelector<RootState, any>(state => state.data.data);
  const [dataUser, setDataUser] = useState<any>();
  const navigate = useNavigate();
  const { userId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const HandleClickExit = () => {
    dispatch(deleteTokenAction(""));
  };

  const HandleClickBack = () => {
    navigate('/');
  };

  useEffect(() => {
    if (userId === undefined) return;
    const id = user.find((item: any) => item.id === Number(userId));
    setDataUser(id)
  }, [location]);

  return (
    <div className={`${userId === undefined ? styles.containerTeam : styles.containerUser}`}>
      {userId !== undefined && (
        <>
          <button className={styles.btnPrev} onClick={HandleClickBack}>
            Назад
          </button>
          <button className={styles.btnBack} onClick={HandleClickBack}>
            <Back />
          </button>
        </>
      )}
      {userId !== undefined ? (
        <div className={styles.contentUser}>
          <img className={styles.avatarUser} src={dataUser?.avatar} alt="avatar" />
          <div className={styles.descContainer}>
            <h1 className={styles.fullNameUser}>{`${dataUser?.first_name} ${dataUser?.last_name}`}</h1>
            <h2 className={styles.infoUser}>Партнер</h2>
          </div>
        </div>
      ) : (
        <div className={styles.contentTeam}>
          <h1 className={styles.title1}>Наша команда</h1>
          <h2 className={styles.title2}>
            Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и
            умеющие находить выход из любых, даже самых сложных ситуаций.
          </h2>
        </div>
      )}
      <button className={styles.btnNext} onClick={() => HandleClickExit()}>
        Выход
      </button>
      <button className={styles.btnExit} onClick={() => HandleClickExit()}>
        <Exit />
      </button>
    </div>
  );
}
