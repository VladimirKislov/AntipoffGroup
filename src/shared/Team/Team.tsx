import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./team.css";
import { RootState } from "../../stor/stor";
import { useSelector, useDispatch } from "react-redux";
import {
  UserData,
  UserPage,
  UserRequestError,
  UserRequestSuccess,
  UserTotalPage,
} from "../../stor/userData/userDataAction";
import { Btn, Like, LikeActive } from "../../icons";
import { LoaderPage } from "../LoaderPage";
import { ErrorPage } from "../ErrorPage";
import { useNavigate } from "react-router-dom";
import { TeamCard } from "./TeamCard";

export function Team() {
  const token = useSelector<RootState>((state) => state.token);
  const dataUsers = useSelector<RootState, any>((state) => state.data.data);
  const page = useSelector<RootState, number>((state) => state.data.page);
  const totalPage = useSelector<RootState, number>((state) => state.data.totalPage);
  const loading = useSelector<RootState, boolean>((state) => state.data.loading);
  const err = useSelector<RootState, string>((state) => state.data.error);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getUsersData();
  }, []);

  useEffect(() => {
    if (dataUsers.length > 0) {
      setData((prevChildren) => prevChildren.concat(...dataUsers));
    }
  }, [page]);

  function getUsersData(page = 1) {
    if (token === "") return;
    dispatch(UserData());
    axios
      .get(`https://reqres.in/api/users?per_page=8&page=${page}`)
      .then((response) => {
        dispatch(UserRequestSuccess(response.data.data));
        dispatch(UserPage(response.data.page));
        dispatch(UserTotalPage(response.data.total_pages));
      })
      .catch((err) => {
        console.log(err);
        dispatch(UserRequestError(err.message));
      });
  }

  const handleClick = () => {
    getUsersData(page + 1);
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <LoaderPage />
      ) : (
        <div className={styles.cardContainer}>
          {dataUsers.length > 0 &&
            data.map((item: any) => (
              <TeamCard
                avatar={item.avatar}
                first={item.first_name}
                last={item.last_name}
                id={item.id}
                email={item.email}
                key={item.id}
              />
            ))}
        </div>
      )}
      {page !== totalPage && (
        <button className={styles.btn} onClick={() => handleClick()}>
          Показать еще
          <span className={styles.btnMore}>
            <Btn />
          </span>
        </button>
      )}
      {err !== "" && (
        <ErrorPage
          title={err}
          onClose={() => {
            setIsError(false);
          }}
        />
      )}
    </div>
  );
}
