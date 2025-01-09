import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useAtom } from "jotai";
import {leaderEmployeeCodeAtom, orgCdAtom} from "./atom.ts";
import {useSetAtom} from "jotai/index";

export default function LoginPage() {
  const [, setOrgCd] = useAtom(orgCdAtom);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [, setCompanyCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const setleaderEmployeeCode = useSetAtom(leaderEmployeeCodeAtom)

  const URL = process.env.VITE_URL;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    //get   /loginUserInfo/:id
    try {
      setErrorMessage(""); // エラーメッセージをリセット
      const apiUrl = `${URL}/loginUserInfo/${userId}`;
      console.log("apiUrl",apiUrl)
      const response = await fetch(apiUrl);
      if (response.ok) {
        const Data = await response.json();
        console.log("Data.group_code", Data,Data[0].group_code);
        if(Data[0].group_code){
          setOrgCd(Data[0].group_code);
          setleaderEmployeeCode(Data[0].employee_code);
          localStorage.setItem("orgCd", Data[0].group_code);
          localStorage.setItem("leaderEmployeeCode", Data[0].employee_code);
          navigate("/overtime-list"); // ログイン成功時にリダイレクト
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "エラーが発生しました");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("エラー:", error.message); // 安全にアクセス
      } else {
        console.error("未知のエラー:", error); // その他の型の場合
      }
    }
  };

  return (
    <>
      <form id="loginForm" onSubmit={submit}>
        <div className="title">
          <h2>トヨタ認証システム(BTC)</h2>
        </div>
        <div className="header">
          <h2>- Login -</h2>
        </div>
        <div className="login-container">
          <button className="language-button">ENGLISH</button>

          <div className="form-group">
            <input
              type="text"
              id="userId"
              name="userId"
              value={userId}
              placeholder="ユーザーID："
              onChange={(e) => setUserId(e.target.value)}
            />
            <span>@</span>
            <input
              type="text"
              value="10101"
              id="companyCode"
              className="companyCode"
              onChange={(e) => setCompanyCode(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="パスワード："
              onChange={(e) => setPassword(e.target.value)}
            />

            <input type="checkbox" id="saveCompanyCode" />
            <label htmlFor="saveCompanyCode">会社コードを保存する</label>
          </div>
          <div className="button-group">
            <button type="submit" className="login-button">
              ログイン
            </button>
            <button type="reset" className="clear-button">
              クリア
            </button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </form>
    </>
  );
}