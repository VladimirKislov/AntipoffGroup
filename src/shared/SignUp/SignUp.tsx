import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye } from "../../icons";
import styles from "./signup.css";
import { useSelector } from "react-redux";
import { RootState } from "../../stor/stor";
import { ErrorPage } from "../ErrorPage";
import { useDispatch } from "react-redux";
import { addTokenAction } from "../../stor/tokenAction";
import { LoaderPage } from "../LoaderPage";

export function SignUp() {
  const token = useSelector<RootState, string>((state) => state.token);
  const refPassword = useRef<HTMLInputElement>(null);
  const refRepeatPassword = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState("");
  const [usernameMsg, setUsernameMsg] = useState("");
  const [usernameError, setUsernameError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [emailMsgChange, setEmailMsgChange] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordMsg, setRepeatPasswordMsg] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);

  const [loader, setLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [titleError, setTitleError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  async function onSubmit(e: any) {
    e.preventDefault();
    setLoader(true);

    if (username === "") {
      setUsernameError(true);
      setUsernameMsg("Ошибка: поле не может быть пустым");
    } else if (email === "") {
      setEmailError(true);
      setEmailMsg("Ошибка: поле не может быть пустым");
    } else if (password === "") {
      setPasswordError(true);
      setPasswordMsg("Ошибка: поле не может быть пустым");
    } else if (repeatPassword === "") {
      setRepeatPasswordError(true);
      setRepeatPasswordMsg("Ошибка: поле не может быть пустым");
    }
    if (
      !isErrorPassword &&
      !isErrorEmail &&
      username !== "" &&
      email !== "" &&
      password !== "" &&
      repeatPassword !== "" &&
      password === repeatPassword
    ) {
      await axios
        .post("https://back-api-bank.herokuapp.com/sign_up", {
          username,
          email,
          password,
        })
        .then((response) => {
          if (response.data.error === "Invalid user") {
            setLoader(false);
            setIsError(true);
            return setTitleError("Пользователь с таким Именем существует используйте другое имя");
          } else if (response.data.error === "Invalid email") {
            setLoader(false);
            setIsError(true);
            return setTitleError("Пользователь с таким Email существует используйте другой email");
          } else if (response.data.payload.token !== "") {
            setLoader(false);
            dispatch(addTokenAction(response.data.payload.token));
          }
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    } else {
      setLoader(false);
      return;
    }
  }

  const onChangeEmail = (el: any) => {
    if (EMAIL_REGEXP.test(el.target.value)) {
      setIsErrorEmail(false);
      setEmail(el.target.value.trim());
    } else if (el.target.value === "") {
      setEmail("");
      setIsErrorEmail(false);
    } else {
      setEmail("");
      setEmailMsgChange(el.target.value);
      setIsErrorEmail(true);
    }
  };

  const showPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const attr = refPassword.current?.getAttribute("type");
    if (attr === "password") {
      refPassword.current?.setAttribute("type", "text");
    } else if (attr === "text") {
      refPassword.current?.setAttribute("type", "password");
    }
  };

  const showRepeatPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const attr = refRepeatPassword.current?.getAttribute("type");
    if (attr === "password") {
      refRepeatPassword.current?.setAttribute("type", "text");
    } else if (attr === "text") {
      refRepeatPassword.current?.setAttribute("type", "password");
    }
  };

  useEffect(() => {
    if (password !== "" && repeatPassword !== "" && password !== repeatPassword) {
      setIsErrorPassword(true);
    } else {
      setIsErrorPassword(false);
    }
  }, [password, repeatPassword]);

  useEffect(() => {
    if (token !== "") {
      navigate("/team", { replace: true });
    }
  }, [token]);

  useEffect(() => {
    if (username !== "") {
      setUsernameMsg("");
      setUsernameError(false);
    }
    if (emailMsgChange !== "") {
      setEmailMsg("");
      setEmailError(false);
    }
    if (password !== "") {
      setPasswordMsg("");
      setPasswordError(false);
    }
    if (repeatPassword !== "") {
      setRepeatPasswordMsg("");
      setRepeatPasswordError(false);
    }
  }, [username, email, emailMsgChange, password, repeatPassword]);

  return (
    <div className={styles.wrapper}>
      <form className={styles.container}>
        <p className={styles.title}>Регистрация</p>
        <label className={styles.label} htmlFor="#">
          Имя
        </label>
        <label className={styles.labelName}>
          <input
            className={`${!usernameError ? styles.inputName : styles.activeErrName}`}
            type="text"
            name="username"
            placeholder="Артур"
            onChange={(el) => setUsername(el.target.value.trim())}
          />
          {usernameMsg !== "" && <p className={styles.errName}>{usernameMsg}</p>}
        </label>
        <label className={styles.label} htmlFor="#">
          Электронная почта
        </label>
        <label className={styles.labelEmail} htmlFor="#">
          <input
            className={`
            ${!emailError ? styles.inputEmail : styles.activeErrEmail},
            ${!isErrorEmail ? styles.inputEmail : styles.activeErrEmail}
          `}
            type="email"
            name="email"
            placeholder="example@mail.ru"
            onChange={(el) => onChangeEmail(el)}
          />
          {isErrorEmail && <p className={styles.errEmail}>{"Ошибка"}</p>}
          {emailMsg !== "" && <p className={styles.errEmail}>{emailMsg}</p>}
        </label>
        <label className={styles.label} htmlFor="#">
          Пароль
        </label>
        <label className={styles.labelWrapperPass}>
          <input
            ref={refPassword}
            className={`${!passwordError ? styles.inputPasswordMsg : styles.activeErrPasswordMsg}`}
            type="password"
            name="password"
            placeholder="******"
            onChange={(el) => setPassword(el.target.value.trim())}
          />
          <button className={styles.btnShow} onClick={(e) => showPassword(e)}>
            <Eye />
          </button>
          {passwordMsg !== "" && <p className={styles.errPasswordMsg}>{passwordMsg}</p>}
        </label>
        <label className={styles.label} htmlFor="#">
          Подтвердите пароль
        </label>
        <label className={styles.labelWrapper}>
          <input
            ref={refRepeatPassword}
            className={`
          ${!isErrorPassword ? styles.inputPassword : styles.activeErrPassword}
          ${!isErrorPassword ? styles.inputPassword : styles.activeErrPassword}
          `}
            type="password"
            placeholder="******"
            onChange={(el) => setRepeatPassword(el.target.value.trim())}
          />
          <button className={styles.btnShow} onClick={(e) => showRepeatPassword(e)}>
            <Eye />
          </button>
          {isErrorPassword && <p className={styles.errPassword}>{"Ошибка: пароли не совпадают"}</p>}
          {repeatPasswordMsg !== "" && <p className={styles.errPassword}>{repeatPasswordMsg}</p>}
        </label>
        <button className={styles.button} onClick={(el) => onSubmit(el)}>
          Зарегистрироваться
        </button>
        {isError && (
          <ErrorPage
            title={titleError}
            onClose={() => {
              setIsError(false);
            }}
          />
        )}
        {loader && <LoaderPage />}
      </form>
    </div>
  );
}
